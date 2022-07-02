export const mainResponse = {
  name: 'sc2-api-service',
  endpoints: {
    status: {
      url: '/status',
      method: 'GET',
    },
    accesstoken: {
      url: '/accesstoken',
      method: 'GET',
    },
    accesstokenrefresh: {
      url: '/accesstoken?refresh=true',
      method: 'GET',
    },
  },
};
