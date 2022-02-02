import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import bas, { BasOptions } from "./plugins/bas";
import sc2api, { Sc2ApiOptions } from "./plugins/sc2api";
import routes from "./routes";

interface ServerOptions extends Sc2ApiOptions {
  bas: BasOptions;
}

const api = fp(
  // eslint-disable-next-line @typescript-eslint/ban-types
  (fastify: FastifyInstance, opts: ServerOptions, next: Function) => {
    fastify.register(bas, opts.bas);
    fastify.register(sc2api, { bnet: opts.bnet, redis: opts.redis });
    fastify.register(routes.status);
    fastify.register(routes.profile.profile);
    fastify.register(routes.profile.staticData);
    fastify.register(routes.profile.metadata);
    fastify.register(routes.profile.ladderSummary);
    fastify.register(routes.profile.ladder);
    fastify.register(routes.ladder.grandmaster);
    fastify.register(routes.ladder.season);
    fastify.register(routes.legacy.profile);
    fastify.register(routes.legacy.ladders);
    fastify.register(routes.legacy.matches);
    fastify.register(routes.legacy.ladder);
    fastify.register(routes.legacy.achievements);
    fastify.register(routes.legacy.rewards);
    fastify.register(routes.data.league);
    next();
  }
);

export = api;
