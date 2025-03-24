"use strict";

const { createChecksum, sortObject } = require("../utils");
const moment = require("moment");
let crypto = require("crypto");
let querystring = require("qs");
const { createNewOrder } = require("./order.service");

class PaymentService {
  static payment = async (req) => {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");
    let expireDate = moment(date).add(15, "minutes").format("YYYYMMDDHHmmss");
    let ipAddr = "172.0.0.1";

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.vnp_ReturnUrl;
    let { _id: orderId } = await createNewOrder(req.body, req.user);

    let amount = req.body.totalAmount;
    let locale = req.body.language || "vn";
    let orderInfo = orderId;
    let orderType = req.body.orderType || "other";

    let currCode = "VND";
    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Amount: amount * 100,
      vnp_CreateDate: createDate,
      vnp_CurrCode: currCode,
      vnp_IpAddr: ipAddr,
      vnp_Locale: locale,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_ReturnUrl: returnUrl,
      vnp_TxnRef: orderId,
      vnp_ExpireDate: expireDate,
      vnp_BankCode: "VNBANK",
    };

    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;

    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl;
  };
}

module.exports = PaymentService;
