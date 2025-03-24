"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const BrandService = require("../services/brand.service");
const ReportService = require("../services/report.service");

class ReportController {
  createNewReport = async (req, res, next) => {
    new CREATED({
      data: await ReportService.createNewReport(req.body),
    }).send(res);
  };
  getAllReport = async (req, res, next) => {
    const query = req.query;
    new SuccessResponse({
      data: await ReportService.getAllReport(query),
    }).send(res);
  };
  replyReport = async (req, res, next) => {
    const { reportId } = req.params;
    new SuccessResponse({
      data: await ReportService.replyReport(reportId, req.body),
    }).send(res);
  };
}
module.exports = new ReportController();
