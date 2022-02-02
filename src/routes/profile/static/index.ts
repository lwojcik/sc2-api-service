import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import schema from "./schema";
import { RouteQueryString } from "../../../@types/fastify.d";

interface RouteParams {
  regionId: number;
}

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Params: RouteParams;
    Querystring: RouteQueryString;
  }>({
    schema,
    url: "/profile/static/:regionId",
    method: "GET",
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getStaticProfileData(
        request.params.regionId,
        refresh
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
