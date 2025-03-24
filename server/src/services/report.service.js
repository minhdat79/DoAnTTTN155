"use strict";

const { NotFoundError } = require("../core/error.response");
const sendEmail = require("../helpers/sendEmail");
const { Report } = require("../models/report.model");
const {
  replyReportEmailForm,
  receiveReportEmailForm,
} = require("../utils/emailExtension");
const { paginate } = require("../utils/paginate");

class ReportService {
  static createNewReport = async (data) => {
    const { name, email, title, content, phone } = data;
    const reecentReportEmail = receiveReportEmailForm(
      name,
      phone,
      title,
      content
    );
    console.log("process.env.YOUREMAIL",process.env.YOUREMAIL)
    console.log("run....")
    await sendEmail(
      process.env.YOUREMAIL,
      reecentReportEmail.title,
      reecentReportEmail.body
    );
    return await Report.create({
      content: content,
      name: name,
      title: title,
      email: email,
      phone: phone,
    });
  };
  static getAllReport = async ({
    limit = 10,
    page = 1,
    filters,
    sortBy,
    ...query
  }) => {
    const options = {};
    if (sortBy) {
      const [field, order] = sortBy.split("-");
      options.sort = { [field]: order === "asc" ? 1 : -1 };
    } else {
      options.sort = { createdAt: -1 };
    }
    let reports = await paginate({
      model: Report,
      limit: +limit,
      page: +page,
      filters,
      options,
    });
    return reports;
  };
  static replyReport = async (reportId, data) => {
    const foundReport = await Report.findById(reportId);
    if (!foundReport) throw new NotFoundError("Report not found");
    const replyReportEmail = replyReportEmailForm(
      foundReport.name,
      data.title,
      data.content
    );
    await sendEmail(
      foundReport.email,
      replyReportEmail.title,
      replyReportEmail.body
    );
    return await Report.findOneAndUpdate(
      { _id: reportId },
      { reply: data },
      { new: true }
    ).lean();
  };
}
module.exports = ReportService;
