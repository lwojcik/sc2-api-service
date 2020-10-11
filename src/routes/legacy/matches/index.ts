import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import { PlayerObject, RouteQueryString } from '../../../@types/fastify.d';

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Params: PlayerObject,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/legacy/matches/:regionId/:realmId/:profileId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getLegacyMatchHistory(
        request.params as PlayerObject,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
