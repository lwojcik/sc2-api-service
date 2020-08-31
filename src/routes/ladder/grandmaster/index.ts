import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

interface RouteParams {
  regionId: string;
}

interface RouteQueryString {
  refresh?: boolean;
}

const route: FastifyPlugin = (server, {}, next) => {
  server.route<{
    Params: RouteParams,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/ladder/grandmaster/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getGrandmasterLeaderboard(
        request.params.regionId,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
