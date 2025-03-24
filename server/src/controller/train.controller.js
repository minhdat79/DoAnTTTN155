"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/success.response");
const TrainService = require("../services/train.service");
const { generateTrainingData } = require("../utils/generateTrainingData");

class TrainController {
  trainNewData = async (req, res, next) => {
    new CREATED({
      data: await TrainService.startTraining(),
    }).send(res);
  };
  gerateData = async (req, res, next) => {
    new SuccessResponse({
      data: await generateTrainingData(),
    }).send(res);
  };
  checkModal = async (req, res, next) => {
    new SuccessResponse({
      data: await TrainService.checkTrainingStatus(),
    }).send(res);
  };
  chatWithAi = async (req, res, next) => {
    new SuccessResponse({
      data: await TrainService.chatWithModel(req.body),
    }).send(res);
  };
}
module.exports = new TrainController();
