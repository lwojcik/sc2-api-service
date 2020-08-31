import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import {
  RouteQueryString,
} from '../../../@types/fastify';

interface RouteParams {
  regionId: string;
}

const route: FastifyPlugin = (server, {}, next) => {
  server.route<{
    Params: RouteParams,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/legacy/rewards/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLegacyRewards(
        request.params.regionId,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
