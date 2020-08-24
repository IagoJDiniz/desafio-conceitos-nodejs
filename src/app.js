const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repositore = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositore)

  return response.json(repositore)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repositoreIndex = repositories.findIndex(repositore => repositore.id == id)

  if (repositoreIndex < 0) {
    return response.status(400).json({ error: 'repositore not found.' })
  }

  let repositore = repositories[repositoreIndex]

  repositore.title = title
  repositore.url = url
  repositore.techs = techs


  repositories[repositoreIndex] = repositore

  return response.json(repositore)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params


  const repositoreIndex = repositories.findIndex(repositore => repositore.id == id)

  if (repositoreIndex < 0) {
    return response.status(400).json({ error: 'repositore not found.' })
  }

  repositories.splice(repositoreIndex, 1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoreIndex = repositories.findIndex(repositore => repositore.id == id)

  if (repositoreIndex < 0) {
    return response.status(400).json({ error: 'repositore not found.' })
  }

  let repositore = repositories[repositoreIndex]

  repositore.likes = repositore.likes + 1

  repositories[repositoreIndex] = repositore

  return response.json(repositore)

});

module.exports = app;
