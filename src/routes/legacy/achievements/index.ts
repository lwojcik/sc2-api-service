import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import { RouteQueryString } from '../../../@types/fastify.d';

interface RouteParams {
  regionId: string;
}

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Params: RouteParams,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/legacy/achievements/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getLegacyAchievements(
        request.params.regionId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
