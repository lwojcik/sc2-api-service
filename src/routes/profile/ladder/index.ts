import fp from 'fastify-plugin';
import schema from './schema';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/profile/ladder/:regionId/:realmId/:profileId/:ladderId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId, realmId, profileId, ladderId } = request.params;
      const data = await server.sc2api.getLadder(
        regionId,
        realmId,
        profileId,
        ladderId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
