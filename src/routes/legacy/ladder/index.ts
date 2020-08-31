import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import { RouteQueryString } from '../../../@types/fastify';

interface RouteParams {
  regionId: string;
  ladderId: string;
}

const route: FastifyPlugin = (server, {}, next) => {
  server.route<{
    Params: RouteParams,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/legacy/ladder/:regionId/:ladderId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId, ladderId } = request.params;
      const { refresh } = request.query;
      const data = await server.sc2api.getLegacyLadder(
        regionId,
        ladderId,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
