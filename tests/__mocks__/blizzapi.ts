class BlizzAPI {
  constructor() {}

  getAccessToken(): Promise<string> {
    return Promise.resolve('sample access token');
  }

  query({}): Promise<any> {
    return Promise.resolve({
      _links: {
        self: {
          href: 'Test passed',
        },
      },
    });
  }
}

export {
  BlizzAPI,
}