const app = require("./src/app");

const PORT = 3000;

const users = [];

app.get("/", (request, response) => {
  response.send("Hello Im your Server.");
});

// CREATE USER
app.post("/createUser", (request, response) => {
  if (!request.body || Object.keys(request.body).length === 0) {
    return response.status(400).json({
      message: "Request body is missing or empty",
      error: "Bad Request",
    });
  }

  users.push(request.body);

  response.status(201).json({
    message: "user created successfully",
  });
});

// GET USERS
app.get("/users", (request, response) => {
  response.status(200).json({
    message: "users fetched successfully",
    users: users,
  });
});

// EDIT USER
app.patch("/editUser/:id", (request, response) => {
  if (!request.body || Object.keys(request.body).length === 0) {
    return response.status(400).json({
      message: "Request body is missing or empty",
      error: "Bad Request",
    });
  }

  const id = Number(request.params.id);
  const { name, age } = request.body;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].name = name;
      users[i].age = age; // BUG: PATCH request overwrites the whole object instead of updating partially.
    }
  }

  return response.status(200).json({
    message: "user updated successfully",
  });
});

// DELETE USER
app.delete("/deleteUser/:id", (request, response) => {
  const id = Number(request.params.id);

  const isUserExists = users.some((user) => user.id === id);

  if (!isUserExists) {
    return response.status(404).json({
      message: "user is not exists in database",
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
      break;
    }
  }

  response.status(200).json({
    message: "user deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
