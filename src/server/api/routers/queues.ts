import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const queuesRouter = createTRPCRouter({
  /*  Join Queue 
      When a player hits play hes either
        1. If a queue is already open -> Join queue and startGame right after
        2. If no queue can be found -> Create new queue and start checkQueueStatus every 10s
  */
  joinQueue: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.currentUser;

    const queues = await ctx.prisma.queue.findMany({
      where: {
        opponent: null,
      },
      take: 1,
    });

    if (queues.length > 0) {
      const updatedQueue = await ctx.prisma.queue.update({
        where: {
          id: queues[0].id,
        },
        data: {
          opponent: userId,
        },
      });

      // CREATE GAME
      await ctx.prisma.game.create({
        data: {
          status: "active",
          player1: updatedQueue.createdBy,
          player2: userId,
        },
      });

      return updatedQueue;
    } else {
      const newQueue = await ctx.prisma.queue.create({
        data: {
          createdBy: userId,
        },
      });

      return newQueue;
    }
  }),

  /*  Check Game Status
      Required for player opening a game to be called every 10s
      until an oppenend has joined the game. Once found this will 
      trigger startGame 
  */
  checkQueueStatus: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const queue = await ctx.prisma.queue.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!queue)
        throw new TRPCError({ code: "NOT_FOUND", message: "Queue not found" });

      return queue;
    }),

  /*  Delete Game
      Required for player cancels queue 
  */
  deleteQueue: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const queue = await ctx.prisma.queue.delete({
        where: {
          id: input.id,
        },
      });

      if (!queue)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No game found to delete.",
        });

      return queue;
    }),
});
