import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

// eslint-disable-next-line no-empty-pattern
const route: FastifyPluginCallback<{}> = (server, {}, next) => {
  server.route({
    schema,
    url: '/status',
    method: 'GET',
    // eslint-disable-next-line no-empty-pattern
    handler: ({}, reply) => {
      reply.code(200).send({
        status: 200,
        message: 'ok',
        timestamp: new Date(),
      });
    },
  });
  next();
};

export default fp(route);
