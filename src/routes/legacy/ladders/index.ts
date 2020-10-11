import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import {
  PlayerObject,
  RouteQueryString,
} from '../../../@types/fastify.d';

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback = (server, {}, next) => {
  server.route<{
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/legacy/ladders/:regionId/:realmId/:profileId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLegacyLadders(
        request.params as PlayerObject,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
