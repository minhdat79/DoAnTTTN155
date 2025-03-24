"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/success.response");
const ReviewService = require("../services/review.service");

class ReviewController {
  createNewReview = async (req, res, next) => {
    new CREATED({
      data: await ReviewService.createNewReview(req.body, req.user),
    }).send(res);
  };
  deleteReview = async (req, res, next) => {
    const { id } = req.params.id;
    new SuccessResponse({
      data: await ReviewService.deleteReview(id),
    }).send(res);
  };
}
module.exports = new ReviewController();
