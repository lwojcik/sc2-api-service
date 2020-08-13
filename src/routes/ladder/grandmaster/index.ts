import fp from 'fastify-plugin';
import schema from './schema';

interface RouteParams {
  regionId: string;
}

export default fp((server, {}, next) => {
  server.route<{
    Params: RouteParams,
  }>({
    schema,
    url: '/ladder/grandmaster/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getGrandmasterLeaderboard(
        request.params.regionId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
