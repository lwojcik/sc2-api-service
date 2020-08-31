import fp from 'fastify-plugin';
import schema from './schema';
import { FastifyPlugin } from 'fastify';
import { RouteQueryString } from '../../../@types/fastify';

interface RouteParams {
  regionId: string;
}

const route: FastifyPlugin = (server, {}, next) => {
  server.route<{
    Params: RouteParams,
    Querystring: RouteQueryString,
  }>({
    schema,
    url: '/ladder/season/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const { regionId } = request.params;
      const data = await server.sc2api.getSeason(regionId, refresh);
      reply.code(data.status).send(data);
    },
  });
  next();
};

export default fp(route);
