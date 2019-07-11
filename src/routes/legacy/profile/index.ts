import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/legacy/profile/:regionId/:realmId/:profileId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId, realmId, profileId } = request.params;
      const data = await server.sc2api.getLegacyProfile(
        regionId,
        realmId,
        profileId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
