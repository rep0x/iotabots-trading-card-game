import { toast } from "react-hot-toast";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const gamesRouter = createTRPCRouter({
  joinGame: privateProcedure.mutation(async ({ ctx }) => {
    console.log("Joining Game");
    const games = await ctx.prisma.game.findMany({
      where: {
        status: "waiting",
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const userId = ctx.currentUser;

    // Join Game with prisma.game.update and enter my user to player 2
    if (games.length > 0) {
      await ctx.prisma.game.update({
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

      return "joined";

      // Create Game with prisma.game.create and enter my user to player 1
    } else {
      await ctx.prisma.game.create({
        data: {
          player1: {
            id: userId,
          },
        },
      });

      return "created";
    }
  }),
});
