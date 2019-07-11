import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/legacy/achievements/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId } = request.params;
      const data = await server.sc2api.getLegacyAchievements(regionId);
      reply.code(data.status).send(data);
    },
  });
  next();
});
