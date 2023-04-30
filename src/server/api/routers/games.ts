import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const gamesRouter = createTRPCRouter({
  /*  Find Game 
      When a player is at /game he needs to check his active gam
      If no active Game can be found he should return to the Home
  */
});
