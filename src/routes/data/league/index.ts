import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/data/league/:seasonId/:queueId/:teamType/:leagueId',
    method: 'GET',
    handler: async (request, reply) => {
      const { seasonId, queueId, teamType, leagueId } = request.params;
      const data = await server.sc2api.getLeague(
        seasonId,
        queueId,
        teamType,
        leagueId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
