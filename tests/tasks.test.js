const request = require("supertest");
const app = require("../server");
const { resetTasks } = require("../src/tasks");

// Reset task list before each test so tests don't affect each other
beforeEach(() => {
  resetTasks();
});

describe("GET /api/tasks", () => {
  test("returns an empty array when no tasks exist", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("returns all tasks after adding some", async () => {
    await request(app).post("/api/tasks").send({ title: "Buy groceries" });
    await request(app).post("/api/tasks").send({ title: "Read a book" });
    const res = await request(app).get("/api/tasks");
    expect(res.body.length).toBe(2);
  });
});

describe("POST /api/tasks", () => {
  test("creates a new task with correct fields", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Write unit tests" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Write unit tests");
    expect(res.body.status).toBe("todo");
    expect(res.body.id).toBeDefined();
  });

  test("returns 400 if title is missing", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Task title is required.");
  });

  test("returns 400 if title is empty string", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "   " });
    expect(res.statusCode).toBe(400);
  });
});

describe("PATCH /api/tasks/:id", () => {
  test("updates task status to in-progress", async () => {
    const created = await request(app)
      .post("/api/tasks")
      .send({ title: "Deploy the app" });
    const id = created.body.id;
    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ status: "in-progress" });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("in-progress");
  });

  test("returns 404 for non-existent task", async () => {
    const res = await request(app)
      .patch("/api/tasks/999")
      .send({ status: "done" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /api/tasks/:id", () => {
  test("deletes an existing task", async () => {
    const created = await request(app)
      .post("/api/tasks")
      .send({ title: "Fix the bug" });
    const id = created.body.id;
    const res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully.");
  });

  test("returns 404 when deleting non-existent task", async () => {
    const res = await request(app).delete("/api/tasks/999");
    expect(res.statusCode).toBe(404);
  });
});