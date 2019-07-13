import fp from 'fastify-plugin';
import schema from './schema';
import { LeagueObject } from '../../../@types/fastify';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/data/league/:seasonId/:queueId/:teamType/:leagueId',
    method: 'GET',
    handler: async (request, reply) => {
      const { refresh } = request.query;
      const data = await server.sc2api.getLeague(
        request.params as LeagueObject,
        refresh,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
