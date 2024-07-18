// Kanbas/Assignments/routes.js
import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // Retrieve all assignments for a specific course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.json(assignments);
  });

  // Retrieve a specific assignment by ID
  app.get("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = db.assignments.find((a) => a._id === id);
    res.json(assignment);
  });

  // Create a new assignment for a specific course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  // Update an existing assignment by ID
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const updatedAssignment = req.body;
    db.assignments = db.assignments.map((a) =>
      a._id === id ? { ...a, ...updatedAssignment } : a
    );
    res.sendStatus(204);
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== id);
    res.sendStatus(204);
  });
}
