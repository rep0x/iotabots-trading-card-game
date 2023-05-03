import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Player, ZoneCard } from "@/types";
import { CARDS } from "@/mocks/cards";

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

      const drawnCards = [];

      if (game.round === 1) {
        drawnCards.push(currentPlayer.deck[0]);
        drawnCards.push(currentPlayer.deck[1]);
        drawnCards.push(currentPlayer.deck[2]);
        drawnCards.push(currentPlayer.deck[3]);
        currentPlayer.deck.splice(0, 4);
      } else {
        drawnCards.push(currentPlayer.deck[0]);
        currentPlayer.deck.splice(0, 1);
      }

      const currentMana = currentPlayer.mana;
      const manaPerRound = game.round;
      const totalMana = currentMana + manaPerRound;
      const nextMana = totalMana > 6 ? 6 : totalMana;

      const nextGame = ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          step: 1,
          [playerKey]: {
            ...currentPlayer,
            mana: nextMana,
            hand: [...currentPlayer.hand, ...drawnCards],
            deck: [...currentPlayer.deck],
          },
        },
      });
      return nextGame;
    }),

  nextStep: privateProcedure
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

      const opponentKey =
        game.currentPlayer === "player1" ? "player2" : "player1";

      const opponent = game[opponentKey] as unknown as Player;

      if (game.step === 3) {
        const nextGame = ctx.prisma.game.update({
          where: {
            id: input.gameId,
          },
          data: {
            step: 0,
            round:
              game.currentPlayer === "player2" ? game.round + 1 : game.round,
            currentPlayer:
              game.currentPlayer === "player1" ? "player2" : "player1",
            [opponentKey]: {
              ...opponent,
              zone: opponent.zone.map((bot) => {
                return {
                  ...bot,
                  deployed: true,
                };
              }),
            },
          },
        });
        return nextGame;
      }

      const nextGame = ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          step: game.step + 1,
        },
      });
      return nextGame;
    }),

  playCard: privateProcedure
    .input(
      z.object({
        gameId: z.string(),
        cardIndex: z.number(),
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
      const currentMana = currentPlayer.mana;

      const cardId = currentPlayer.hand[input.cardIndex];
      const card = CARDS[Number(cardId) - 1];
      const manaCost = card.mana;

      if (currentMana < manaCost) {
        new TRPCError({ code: "BAD_REQUEST", message: "Not enough mana" });
      }

      let nextMana = currentMana;

      if (currentMana >= manaCost) {
        nextMana = currentMana - manaCost;
        currentPlayer.hand.splice(input.cardIndex, 1);
      }

      const zoneCard: ZoneCard = {
        id: Number(card.id),
        image: card.image,
        attack: card.attack,
        defense: card.defense,
        mana: card.mana,
        hits: card.hits,
        deployed: false,
      };

      const nextGame = ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          [playerKey]: {
            ...currentPlayer,
            mana: nextMana,
            hand: [...currentPlayer.hand],
            zone: [...currentPlayer.zone, zoneCard],
          },
        },
      });
      return nextGame;
    }),

  attack: privateProcedure
    .input(
      z.object({
        gameId: z.string(),
        attacker: z.number(),
        defender: z.number().nullable(),
        player: z.boolean(),
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

      const currentUser = ctx.currentUser;
      const attackerKey =
        game.player1Id === currentUser ? "player1" : "player2";
      const defenderKey = attackerKey === "player1" ? "player2" : "player1";

      const attacker = game[attackerKey] as unknown as Player;
      const defender = game[defenderKey] as unknown as Player;

      const attackingBot = attacker.zone[input.attacker];

      if (input.defender !== null) {
        const defendingBot = defender.zone[input.defender];

        // Attacker kills Defender
        if (attackingBot.attack >= defendingBot.defense) {
          defender.junk.push(String(input.defender)); // Add to junk
          defender.zone.splice(input.defender, 1); // Remove from zone
          defender.health += defendingBot.defense - attackingBot.attack; // Defender taking damage
        }

        // Defender kills Attacker
        if (defendingBot.attack >= attackingBot.defense) {
          attacker.junk.push(String(input.attacker)); // Add to junk
          attacker.zone.splice(input.defender, 1); // Remove from zone
          attacker.health += attackingBot.defense - defendingBot.attack; // Attacker taking Damage
        }
      }

      // If Defender has no bots on the field and gets directly attacked
      if (input.player) {
        defender.health -= attackingBot.attack;
      }

      let winner: "player1" | "player2" | null = null;

      if (attacker.health <= 0) {
        winner = defenderKey;
      }

      if (defender.health <= 0) {
        winner = attackerKey;
      }

      const updatedGame = await ctx.prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          [attackerKey]: attacker,
          [defenderKey]: defender,
          winner: winner,
          status: winner !== null ? "finished" : "active",
        },
      });

      return updatedGame;
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
