import request from "supertest";
import app from "../src/index";

describe("GET /", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/")
    .expect(200, done);
  });
});

describe("GET from DB test", () => {
  it("should return some data from db", (done) => {
    request(app).get("/db")
    .expect(200, done);
  });
});
