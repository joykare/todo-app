const app = require("../index.js");
const expect = require("chai").expect;
const request = require("supertest");

describe("Server side methods", () => {
  it("tests find todos method", (done) => {
    request(app)
      .get("/api/todos")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.exist;
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("tests add todos method", (done) => {
    request(app)
      .post("/api/todos")
      .send({
        title: "Hey",
        description: "Throw away the trash",
        dueDate: new Date("9.01.2017")
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Todo saved successfully");
        done();
      })
  })
})