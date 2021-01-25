const supertest = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("server.js", () => {
  describe("GET /", () => {
    it("should return 200 status", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
          // console.log(supertest)
        });
    });

    it("should return json body {server: testing sprint}", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body).toEqual({ server: "testing sprint" });
        });
    });

    it("should return server & testing sprint", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body.server).toBe("testing sprint");
        });
    });
  });

  describe("POST /", () => {
    describe("POST /register", () => {
      it("should returns 500 cause there's an error", () => {
        return supertest(server)
          .post("/api/auth/register")
          .send({ username: "username", password: "pass" })
          .then((res) => {
            expect(res.status).toBe(500);
          });
      });
    });
  });
});
