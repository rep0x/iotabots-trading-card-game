import { toast } from "react-hot-toast";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const gamesRouter = createTRPCRouter({
  /*  Join Game 
      When a player hits play hes either
        
        1. If a game with a missing player is waiting
          -> Join game and startGame right after
        2. If no game can be found
          -> Create new game and start checkGameStatus every 10s
  */
  joinGame: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.currentUser;

    const games = await ctx.prisma.game.findMany({
      where: {
        status: "waiting",
        createdBy: {
          not: userId,
        },
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    // Join Game with prisma.game.update and enter my user to player 2
    if (games.length > 0) {
      const game = await ctx.prisma.game.update({
        where: {
          id: games[0].id,
        },
        data: {
          player2: {
            id: userId,
          },
          status: "active",
        },
      });

      return {
        id: game.id,
        status: game.status,
      };

      // Create Game with prisma.game.create and enter my user to player 1
    } else {
      const game = await ctx.prisma.game.create({
        data: {
          createdBy: userId,
          player1: {
            id: userId,
          },
        },
      });

      return {
        id: game.id,
        status: game.status,
      };
    }
  }),

  /*  Check Game Status
      Required for player opening a game to be called every 10s
      until an oppenend has joined the game. Once found this will 
      trigger startGame 
  */
  checkGameStatus: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!game)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No game found.",
        });

      return {
        id: game.id,
        status: game.status,
      };
    }),

  /*  Delete Game
      Required for player cancels queue 
  */
  deleteGame: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.delete({
        where: {
          id: input.id,
        },
      });

      if (!game)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No game found to delete.",
        });

      return game;
    }),
});
