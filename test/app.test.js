"use strict";

const assert = require("assert");
const supertest = require("supertest");

const app = require("../src/app");

describe("Restful demo application test", () => {
  it("get should response 404 correctly", async () => {
    await supertest(app.callback())
      .get("/user/60323aaa5c1b804588bf086f")
      .expect(404);
  });

  it("post should response 201 correctly", async () => {
    const user = { name: "TestName", age: 22 };
    let res = await supertest(app.callback())
      .post("/user/")
      .send(user)
      .expect(201);
    const { _id } = res.body;
    res = await supertest(app.callback()).get(`/user/${_id}`).expect(200);
    assert(user.name === res.body.name);
    assert(user.age === res.body.age);
  });
});
