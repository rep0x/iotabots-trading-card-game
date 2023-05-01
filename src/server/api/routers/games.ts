import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Player } from "@/types";

export const gamesRouter = createTRPCRouter({
  /*  Find Game 
      When a player is at /game he needs to check his active gam
      If no active Game can be found he should return to the Home
  */
  getGame: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser;

    const game = await ctx.prisma.game.findFirst({
      where: {
        status: "active",

        OR: [
          {
            player1Id: userId,
          },
          {
            player2Id: userId,
          },
        ],
      },
    });

    return game;
  }),

  draw: privateProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.findUniqueOrThrow({
        where: {
          id: input.gameId,
        },
      });

      const playerKey =
        ctx.currentUser === game.player1Id ? "player1" : "player2";
      const currentPlayer = game[playerKey] as unknown as Player;

      // Draw card function
      let drawnCard = currentPlayer.deck[0];
      currentPlayer.deck.splice(0, 1);

      const nextGame = ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          player1: {
            hand: [...currentPlayer.hand, drawnCard],
            deck: [...currentPlayer.deck],
          },
        },
      });
      return nextGame;
    }),

  surrender: privateProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.findUnique({
        where: {
          id: input.gameId,
        },
      });

      if (!game) {
        return new TRPCError({ code: "NOT_FOUND", message: "Game not found." });
      }

      const updatedGame = await ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          status: "finished",
          winner:
            game?.player1Id === ctx.currentUser
              ? game.player2Id
              : game.player1Id,
        },
      });

      return updatedGame;
    }),

  getGames: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser;

    const games = ctx.prisma.game.findMany({
      where: {
        OR: [
          {
            player1Id: userId,
          },
          {
            player2Id: userId,
          },
        ],
      },
    });

    return games;
  }),
});
