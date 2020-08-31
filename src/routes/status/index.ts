import { FastifyPlugin } from 'fastify';
import fp from 'fastify-plugin';
import schema from './schema';

const route: FastifyPlugin = (server, {}, next) => {
  server.route({
    schema,
    url: '/status',
    method: 'GET',
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
