const expect = require("chai").expect;
const request = require("supertest");
const app1 = require('../index.ts');

describe("api/users", () => {
  beforeEach(async () => {
    
  });

  describe("GET /calculus", () => {

    it("Should return error when query is empty", async () => {
      const res = await request(app1).get("/calculus?query=");
      expect(res.status).to.equal(400);
    });

    it("Should return error when calculus query contains invalid characters", async () => {
      // 2 + 2AB
      // MiArIDJBQg==
      const res = await request(app1).get("/calculus?query=MiArIDJBQg==");
      expect(res.status).to.equal(400);
    });

    it("Should return error when calculus query has invalid character order", async () => {
      // + 3 ) (5)
      // KyAzICkgKDUp
      const res = await request(app1).get("/calculus?query=KyAzICkgKDUp");
      expect(res.status).to.equal(400);
    });

    it("Should return result given a correct calculus query", async () => {
      // 2 * (23/(3*3))- 23 * (2*3)
      // MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
      const res = await request(app1).get("/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=");
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(-132.88888888888889)
    });
  });
});