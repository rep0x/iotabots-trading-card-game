import { createTRPCRouter } from "./trpc";
import { postsRouter } from "./routers/posts";
import { decksRouter } from "./routers/decks";
import { gamesRouter } from "./routers/games";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  decks: decksRouter,
  games: gamesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
