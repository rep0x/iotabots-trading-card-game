import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

import { CARDS } from "../../../mocks/cards";
import { ethers } from "ethers";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const decksRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const decks = await ctx.prisma.deck.findMany({
      where: {
        userId: ctx.currentUser || "",
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        limit: 100,
      })
    ).map(filterUserForClient);

    return decks.map((deck) => {
      const user = users.find((user) => user.id === deck.userId);

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });

      return deck;
    });
  }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        cards: z.array(
          z.object({
            count: z.number().min(1).max(3),
            id: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;

      // Validate ownership of cards.
      console.log("input.cards", input.cards);

      input.cards.forEach((card) => {
        let foundCard = CARDS.find((_card) => card.id === _card.id);
        if (foundCard) {
          console.log("foundCard", foundCard);

          // balanceOf(foundCard.address)
          let url = "https://json-rpc.evm.testnet.shimmer.network/";
          let customHttpProvider = new ethers.JsonRpcProvider(url);
        }
      });

      const deck = await ctx.prisma.deck.create({
        data: {
          userId,
          cards: input.cards,
          name: input.name,
        },
      });

      return deck;
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        cards: z.array(
          z.object({
            count: z.number().min(1).max(3),
            id: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;

      const deck = await ctx.prisma.deck.update({
        where: {
          id: input.id,
        },
        data: {
          userId,
          cards: input.cards,
          name: input.name,
        },
      });

      return deck;
    }),
});
