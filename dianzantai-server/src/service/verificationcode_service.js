/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/21 11:06
 \* Description:
 \*/
import staffRep from '../rep/staff_rep'

const Utils = require('../utils/utils');
const SMSClient = require('@alicloud/sms-sdk');
const config = require('../lib/config');
const verificationCode = config.get('verificationCode');
let smsClient = null;
let verificationCode_Service = {};

/**
 * 根据手机号生成验证码
 * @param phoneNum
 * @constructor
 */
verificationCode_Service.CreateVerifyCode = function (phoneNum) {
    let result = staffRep.findById(phoneNum);
    let msgInfo = {};
    if (result) {

    }
};

/**
 * 发送短信
 * @param option
 */
verificationCode_Service.sendSMS = function (option) {
    if (smsClient === null) {
        let configVerificationCode = verificationCode;
        const accessKeyId = configVerificationCode.accessKeyId;
        const secretAccessKey = configVerificationCode.secretAccessKey;
        smsClient = new SMSClient({accessKeyId, secretAccessKey});
    }
    return new Promise((resolve, reject) => {
        smsClient.sendSMS(option).then(function (res) {
            let {Code} = res;
            if (Code === 'OK') {
                resolve(Code);
            } else {
                reject(Code);
            }
        }, function (err) {
            reject(err);
        });
    })
};

/**
 * 发送验证码
 * @param phoneNumber
 * @param code
 */
verificationCode_Service.sendVerifyCode = function (phoneNumber, code) {

};


module.exports = verificationCode_Service;