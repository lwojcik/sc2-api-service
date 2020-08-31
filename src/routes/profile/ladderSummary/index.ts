import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';
import {
  PlayerObject,
  RouteQueryString,
} from '../../../@types/fastify';

const route: FastifyPlugin = (server, {}, next) => {
  server.route<{
    Params: PlayerObject,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/profile/ladderSummary/:regionId/:realmId/:profileId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLadderSummary(
        request.params as PlayerObject,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
