import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const gamesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
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
      const joinGame = await ctx.prisma.game.update({
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

      return joinGame;

      // Create Game with prisma.game.create and enter my user to player 1
    } else {
      const createGame = await ctx.prisma.game.create({
        data: {
          player1: {
            id: userId,
          },
        },
      });
      return createGame;
    }
  }),
});
