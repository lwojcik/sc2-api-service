import fp from 'fastify-plugin';
import schema from './schema';
import { PlayerLadder } from '../../../@types/fastify';

export default fp((server, {}, next) => {
  server.route({
    schema,
    url: '/profile/ladder/:regionId/:realmId/:profileId/:ladderId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getLadder(
        request.params as PlayerLadder,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
