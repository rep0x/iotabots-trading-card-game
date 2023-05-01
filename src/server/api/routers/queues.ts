import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Deck, Prisma } from "@prisma/client";
import { CountCard } from "@/mocks/deck";

const flatenDeck = (deck: CountCard[]) => {
  let flatDeck: string[] = [];
  deck.map((card) => {
    if (card.count === 1) return flatDeck.push(card.id);
    if (card.count >= 1) {
      for (let index = 0; index < card.count; index++) {
        flatDeck.push(card.id);
      }
    }
  });
  return flatDeck;
};

export const queuesRouter = createTRPCRouter({
  /*  Join Queue 
      When a player hits play hes either
        1. If a queue is already open -> Join queue and startGame right after
        2. If no queue can be found -> Create new queue and start checkQueueStatus every 10s
  */
  joinQueue: privateProcedure
    .input(
      z.object({
        deckId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;

      const queues = await ctx.prisma.queue.findMany({
        where: {
          opponent: null,
        },
        take: 1,
      });

      if (queues.length > 0) {
        const queue = queues[0];
        const updatedQueue = await ctx.prisma.queue.update({
          where: {
            id: queue.id,
          },
          data: {
            opponent: userId,
          },
        });

        const opponentsDeck = await ctx.prisma.deck.findUnique({
          where: {
            id: input.deckId,
          },
        });
        let opponentsCards = opponentsDeck
          ? (opponentsDeck.cards as unknown as CountCard[])
          : [];

        const creatorsDeck = await ctx.prisma.deck.findUnique({
          where: {
            id: queue.creatorDeckId,
          },
        });
        let creatorsCards = creatorsDeck
          ? (creatorsDeck.cards as unknown as CountCard[])
          : [];

        // CREATE GAME
        await ctx.prisma.game.create({
          data: {
            status: "active",
            player1Id: updatedQueue.creator,
            player1: {
              mana: 1,
              health: 20,
              deck: flatenDeck(creatorsCards),
            },
            player2Id: userId,
            player2: {
              mana: 1,
              health: 20,
              deck: flatenDeck(opponentsCards),
            },
          },
        });

        return updatedQueue;
      } else {
        const newQueue = await ctx.prisma.queue.create({
          data: {
            creator: userId,
            creatorDeckId: input.deckId,
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
