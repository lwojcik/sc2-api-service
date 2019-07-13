import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/ladder/grandmaster/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getGrandmasterLeaderboard(request.params.regionId);
      reply.code(data.status).send(data);
    },
  });
  next();
});
