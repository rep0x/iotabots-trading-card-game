import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
            player1: userId,
          },
          {
            player2: userId,
          },
        ],
      },
    });

    return game;
  }),

  surrender: privateProcedure
    .input(
      z.object({
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          status: "finished",
        },
      });

      return game;
    }),
});
