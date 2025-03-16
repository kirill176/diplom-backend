class FileController {
  async addFile(req, res, next) {
    try {
      const file = req.file;
      const user = req.user;
      const result = await fileService.addFile(file, user);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeFile(req, res, next) {
    try {
      const { fileId } = req.body;
      const result = await fileService.removeFile(fileId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FileController();
