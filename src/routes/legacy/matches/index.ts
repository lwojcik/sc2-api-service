import fp from 'fastify-plugin';
import schema from './schema';
import { PlayerObject } from '../../../@types/fastify';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/legacy/matches/:regionId/:realmId/:profileId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getLegacyMatchHistory(
        request.params as PlayerObject,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
