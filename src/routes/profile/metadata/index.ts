import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { PlayerObject } from "starcraft2-api";
import schema from "./schema";
import { RouteQueryString } from "../../../@types/fastify.d";

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Params: PlayerObject;
    Querystring: RouteQueryString;
  }>({
    schema,
    url: "/profile/metadata/:regionId/:realmId/:profileId",
    method: "GET",
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getProfileMetadata(
        request.params as PlayerObject,
        refresh
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
