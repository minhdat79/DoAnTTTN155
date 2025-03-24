"use strict";

require("dotenv").config();
const { OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
const FineTuneModel = require("../models/FineTune.model");
const { NotFoundError } = require("../core/error.response");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class TrainService {
  // Khởi động quá trình training
  static startTraining = async () => {
    try {
      const filePath = "dataTraining.jsonl";

      console.log("📤 Uploading training file:", filePath);
      const uploadResponse = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "fine-tune",
      });

      console.log("✅ File uploaded:", uploadResponse.id);

      console.log("🚀 Creating fine-tune job...");
      const fineTuneResponse = await openai.fineTuning.jobs.create({
        training_file: uploadResponse.id,
        model: "gpt-3.5-turbo",
      });

      console.log("📌 Fine-tune job created:", fineTuneResponse.id);

      // Lưu thông tin training vào DB
      const fineTuneRecord = await FineTuneModel.create({
        objId: fineTuneResponse.id,
      });

      return { jobId: fineTuneResponse.id, objId: fineTuneRecord._id };
    } catch (error) {
      console.error("❌ Lỗi khi train model:", error);
      throw new Error("Lỗi khi training model.");
    }
  };
  // Kiểm tra trạng thái training từ bản ghi mới nhất
  static checkTrainingStatus = async () => {
    try {
      // Lấy jobId (objId) từ bản ghi mới nhất
      const latestFineTune = await FineTuneModel.findOne({
        objId: { $ne: null },
      }).sort({ createdAt: -1 });

      if (!latestFineTune) {
        throw new NotFoundError("Không tìm thấy jobId nào đang training.");
      }
      if (!latestFineTune.objId) {
        throw new NotFoundError(
          "Không tìm thấy modal mới nào đang được trainning"
        );
      }
      const jobId = latestFineTune.objId;
      console.log("🔍 Kiểm tra trạng thái training của jobId:", jobId);

      // Gửi request kiểm tra trạng thái từ OpenAI
      const response = await openai.fineTuning.jobs.retrieve(jobId);
      console.log("🔍 Training status:", response.status);

      if (response.status === "succeeded") {
        const modelId = response.fine_tuned_model;

        // Cập nhật modelId và xóa jobId trong DB
        await FineTuneModel.findOneAndUpdate(
          { objId: jobId },
          { modelId, objId: null }, // Xóa jobId sau khi hoàn thành
          { new: true }
        );

        console.log("✅ Model mới đã được lưu:", modelId);
        return { status: "succeeded", modelId };
      }

      return { status: response.status };
    } catch (error) {
      console.error("❌ Lỗi khi kiểm tra trạng thái training:", error);
      throw new Error("Lỗi kiểm tra trạng thái training.");
    }
  };

  // Lấy model mới nhất từ MongoDB
  static getLatestFineTunedModel = async () => {
    try {
      const latestModel = await FineTuneModel.findOne({
        modelId: { $ne: null },
      }).sort({ createdAt: -1 });
      return latestModel ? latestModel.modelId : null;
    } catch (error) {
      console.error("❌ Lỗi khi lấy model mới nhất:", error);
      throw new Error("Không tìm thấy model mới nhất.");
    }
  };

  // Gửi tin nhắn đến model đã train
  static chatWithModel = async (messageObj) => {
    try {
      console.log("📩 Tin nhắn nhận được:", messageObj);

      // Lấy nội dung tin nhắn từ object
      const userMessage = messageObj.message;
      if (!userMessage) throw new Error("Nội dung tin nhắn không hợp lệ.");

      const modelId = await this.getLatestFineTunedModel();
      if (!modelId) throw new Error("Không tìm thấy model đã train.");

      console.log(`💬 Chat với model: ${modelId}`);
      const response = await openai.chat.completions.create({
        model: modelId,
        messages: [{ role: "user", content: userMessage }],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("❌ Lỗi khi chat với model:", error);
      throw new Error("Lỗi khi gửi tin nhắn đến model.");
    }
  };
}

module.exports = TrainService;
