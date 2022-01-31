const request = require("supertest");
const app = require("../../server");

describe("Trailer controller test", () => {
  it("Should respond with correct trailer url", async () => {
    const response = await request(app).post("/api/v1/trailers/").send({
      url: "https://content.viaplay.se/pcdash-se/film/focus-2015",
    });
    expect(response.text).toEqual(
      "https://www.youtube.com/watch?v=6vY9UPiI4eQ"
    );
  });
  it("Should return error if url is not present in request body", async () => {
    const response = await request(app).post("/api/v1/trailers/").send({});
    expect(response.text).toEqual('{"message":"invalid url"}');
  });
});
