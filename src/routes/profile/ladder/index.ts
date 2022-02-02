import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import schema from "./schema";
import { PlayerLadder, RouteQueryString } from "../../../@types/fastify.d";

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Params: PlayerLadder;
    Querystring: RouteQueryString;
  }>({
    schema,
    url: "/profile/ladder/:regionId/:realmId/:profileId/:ladderId",
    method: "GET",
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLadder(
        request.params as PlayerLadder,
        refresh
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
