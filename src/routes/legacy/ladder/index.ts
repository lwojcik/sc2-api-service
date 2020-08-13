import fp from 'fastify-plugin';
import schema from './schema';

interface RouteParams {
  regionId: string;
  ladderId: string;
}

export default fp((server, {}, next) => {
  server.route<{
    Params: RouteParams,
  }>({
    schema,
    url: '/legacy/ladder/:regionId/:ladderId',
    method: 'GET',
    handler: async (request, reply) => {
      const { regionId, ladderId } = request.params;
      const data = await server.sc2api.getLegacyLadder(regionId, ladderId);
      reply.code(data.status).send(data);
    },
  });
  next();
});
