import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import http from 'http';

export interface BasOptions {
  url: String;
  statusEndpoint: String;
  accessTokenEndpoint: String;
  accessTokenRefreshEndpoint: String;
}

interface BASReply {
  status: number;
  data: {
    accessToken: string;
  };
}

interface OKReply {
  status: 200;
  message: 'ok';
}

const bas = fp(
  async (fastify: FastifyInstance, opts: BasOptions, next: Function) => {
    let isUp = false;
    const statusUrl = `${opts.url}/${opts.statusEndpoint}`;
    const accessTokenUrl = `${opts.url}/${opts.accessTokenEndpoint}`;
    const accessTokenRefreshUrl = `${opts.url}/${opts.accessTokenRefreshEndpoint}`;

    const basDown = {
      status: 500,
      message: 'Bnet-auth-service is down!',
    };

    /* istanbul ignore next */
    const get = (url: string): object =>
      new Promise((resolve, reject) => {
        http
          .get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', chunk => (body += chunk));
            res.on('end', () => resolve(JSON.parse(body)));
          })
          .on('error', reject);
      });

    /* istanbul ignore next */
    const checkIfHostIsUp = async (url: string) => {
      try {
        const response = (await get(url)) as OKReply;
        if (response.status && response.status !== 200) return false;
        return true;
      } catch (error) {
        return false;
      }
    };

    /* istanbul ignore next */
    const checkOnStartup = async () => {
      const isBASup = await checkIfHostIsUp(statusUrl);
      isUp = isBASup;
      isBASup
        ? fastify.log.info(`Bnet-auth-service status: running`)
        : fastify.log.error(`Bnet-auth-service is down!`);
    };

    /* istanbul ignore next */
    const getAccessToken = async (refresh?: boolean) => {
      if (!isUp) return basDown;
      const basData = !refresh
        ? ((await get(accessTokenUrl)) as BASReply)
        : ((await get(accessTokenRefreshUrl)) as BASReply);
      const accessToken = basData.data.accessToken;
      return accessToken;
    };

    /* istanbul ignore next */
    const refreshAccessToken = () => getAccessToken(true);

    fastify.decorate('bas', {
      getAccessToken,
      refreshAccessToken,
    });

    checkOnStartup();

    next();
  },
);

export default bas;
