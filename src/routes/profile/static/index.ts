import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/profile/static/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId } = request.params;
      const data = await server.sc2api.getStaticProfileData(regionId);
      reply.code(data.status).send(data);
    },
  });
  next();
});
