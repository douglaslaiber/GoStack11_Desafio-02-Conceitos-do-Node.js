const { isUuid } = require("uuidv4");
module.exports = function checkRepositoryId(request, response, next) {
  const repositoryId = request.params.id;

  if (!isUuid(repositoryId)) {
    return response.status(400).json({ "error": "Repository id is not valid" });
  }

  next();
}