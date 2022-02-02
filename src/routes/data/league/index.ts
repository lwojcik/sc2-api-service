import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { League } from "starcraft2-api";
import schema from "./schema";

interface RouteQueryString {
  refresh?: boolean;
}

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Querystring: RouteQueryString;
  }>({
    schema,
    url: "/data/league/:seasonId/:queueId/:teamType/:leagueId",
    method: "GET",
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLeague(
        request.params as League,
        refresh
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
