import fastify from "fastify";
import server from "../../../../src/index";
import getConfig from "../../../helper";

describe("/legacy/achievements/:regionId (Redis disabled)", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fastifyServer = fastify() as any;
  const url = "/legacy/achievements/1";

  beforeAll(async () => {
    await fastifyServer.register(server, getConfig(false));
  });

  afterEach(() => {
    fastifyServer.close();
  });

  it("returns 200", async () => {
    expect.assertions(1);
    const res = await fastifyServer.inject({ method: "GET", url });
    expect(res.statusCode).toBe(200);
  });

  it("returns correct response", async () => {
    expect.assertions(1);
    const res = await fastifyServer.inject({ method: "GET", url });
    expect(res.payload).toMatchSnapshot();
  });
});
