import fp from 'fastify-plugin';
import schema from './schema';

interface RouteParams {
  regionId: number;
}

export default fp((server, {}, next) => {
  server.route<{
    Params: RouteParams,
  }>({
    schema,
    url: '/profile/static/:regionId',
    method: 'GET',
    handler: async (request, reply) => {
      const data = await server.sc2api.getStaticProfileData(
        request.params.regionId,
      );
      reply.code(data.status).send(data);
    },
  });
  next();
});
