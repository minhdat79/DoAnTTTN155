const { SuccessResponse } = require("../core/success.response");

class UploadController {
  uploadProduct = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const uploadedFiles = req.files.map((file) => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    }));
    new SuccessResponse({
      data: uploadedFiles,
    }).send(res);
  };
}
module.exports = new UploadController();
