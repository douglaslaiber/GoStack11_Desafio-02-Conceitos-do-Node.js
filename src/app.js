const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const repositoryId = request.params.id;
  const { title, url, techs } = request.body;

  if (!isUuid(repositoryId)) {
    return response.status(400).json({ "error": "Repository id is not valid" });
  }

  let repositoryFound = repositories.find(repo => repo.id === repositoryId);
  repositoryFound.title = title;
  repositoryFound.url = url;
  repositoryFound.techs = techs;

  return response.json(repositoryFound);
});

app.delete("/repositories/:id", (request, response) => {
  const repositoryId = request.params.id;

  if (!isUuid(repositoryId)) {
    return response.status(400).json({ "error": "Repository id is not valid" });
  }

  let repositoryIndex = repositories.findIndex(repo => repo.id === repositoryId);
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const repositoryId = request.params.id;

  if (!isUuid(repositoryId)) {
    return response.status(400).json({ "error": "Repository id is not valid" });
  }

  let repositoryFound = repositories.find(repo => repo.id === repositoryId);
  repositoryFound.likes++;

  return response.json(repositoryFound);
});

module.exports = app;
