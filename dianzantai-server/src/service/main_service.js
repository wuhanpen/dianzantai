/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/20 19:57
 \* Description: 主服务service层
 \*/

import staffRep from '../rep/staff_rep';
import pingyinUtil from '../utils/pinyinUtil'
import vecricode_rep from "../rep/vericode_rep";
import utils from "../utils/utils";

const SMSClient = require('@alicloud/sms-sdk');
const config = require('../lib/config');
const verificationCode = config.get('verificationCode');
const moment = require('moment');

let smsClient = null;
let mainService = {};

mainService.findAllStaffOrdbyFL = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await staffRep.findAll();
            let result = staff.map(item => {
                let firstLetter = pingyinUtil.chineseToPinYin(item.dataValues.name).substr(0, 1);
                switch (firstLetter) {
                    case 'A':
                        return {firstLetter: 'A', data: item.dataValues};
                    case 'B' :
                        return {firstLetter: 'B', data: item.dataValues};
                    case 'C' :
                        return {firstLetter: 'C', data: item.dataValues};
                    case 'D' :
                        return {firstLetter: 'D', data: item.dataValues};
                    case 'E' :
                        return {firstLetter: 'E', data: item.dataValues};
                    case 'F' :
                        return {firstLetter: 'F', data: item.dataValues};
                    case 'G' :
                        return {firstLetter: 'G', data: item.dataValues};
                    case 'H' :
                        return {firstLetter: 'H', data: item.dataValues};
                    case 'I' :
                        return {firstLetter: 'I', data: item.dataValues};
                    case 'J' :
                        return {firstLetter: 'J', data: item.dataValues};
                    case 'K' :
                        return {firstLetter: 'K', data: item.dataValues};
                    case 'L' :
                        return {firstLetter: 'L', data: item.dataValues};
                    case 'M' :
                        return {firstLetter: 'M', data: item.dataValues};
                    case 'N' :
                        return {firstLetter: 'N', data: item.dataValues};
                    case 'O' :
                        return {firstLetter: 'O', data: item.dataValues};
                    case 'P' :
                        return {firstLetter: 'P', data: item.dataValues};
                    case 'Q' :
                        return {firstLetter: 'Q', data: item.dataValues};
                    case 'R' :
                        return {firstLetter: 'R', data: item.dataValues};
                    case 'S' :
                        return {firstLetter: 'S', data: item.dataValues};
                    case 'T' :
                        return {firstLetter: 'T', data: item.dataValues};
                    case 'U' :
                        return {firstLetter: 'U', data: item.dataValues};
                    case 'V' :
                        return {firstLetter: 'V', data: item.dataValues};
                    case 'W' :
                        return {firstLetter: 'W', data: item.dataValues};
                    case 'X' :
                        return {firstLetter: 'X', data: item.dataValues};
                    case 'Y' :
                        return {firstLetter: 'Y', data: item.dataValues};
                    case 'Z' :
                        return {firstLetter: 'Z', data: item.dataValues};
                    default  :
                        return {firstLetter: '#', data: item.dataValues};
                }
            });
            resolve(result);
        } catch (e) {
            reject(e)
        }
    })
};

mainService.createSMSCode = function (phoneNum) {
    let user = staffRep.findById(phoneNum);
    if (user === null) {

    }
    const result = vecricode_rep.findByPhoneNum(phoneNum);
    console.log(result.dataValues);
    let msgInfo = {};
    let code = utils.createRandomStr(4);
    if (result.PromiseValue !== undefined) {
        let codeInfo = {};
        codeInfo.phoneNum = phoneNum;
        codeInfo.code = code;
        codeInfo.status = 1;
        codeInfo.riseTime = moment().toDate();
        codeInfo.validTime = moment().add(verificationCode.validTime, 'seconds').toDate();
        codeInfo.count = 1;
        codeInfo.dayCount = 1;
        codeInfo.dayMax = verificationCode.dayMax;
        vecricode_rep.update(codeInfo);
        msgInfo.data = code;
        return msgInfo;
    } else {
        let codeInfo = {};
        codeInfo.phoneNum = phoneNum;
        codeInfo.code = code;
        codeInfo.status = 1;
        codeInfo.riseTime = moment().toDate();
        codeInfo.validTime = moment().add(verificationCode.validTime, 'seconds').toDate();
        codeInfo.count = 1;
        codeInfo.dayCount = 1;
        codeInfo.dayMax = verificationCode.dayMax;
        vecricode_rep.save(codeInfo);
        msgInfo.data = code;
        return msgInfo;
    }
};

mainService.sentSMS=function(option) {
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

mainService.sendVerifyCode = function (phoneNumber, code) {
    let option = {};
    let templateParam = {code: code.data};
    option.PhoneNumbers = phoneNumber;
    option.SignName = verificationCode.signName;
    option.TemplateCode = 'SMS_148866200';
    option.TemplateParam = JSON.stringify(templateParam);
    //option.TemplateParam = code.data;
    let sendStatus = mainService.sendSMS(option);
    return sendStatus;
};

/**
 * 检验验证码
 * @param phoneNumber
 * @param code
 */
mainService.verifyCode = function (phoneNumber, code) {
    const result = vecricode_rep.findByPhoneNum(phoneNumber);
    let data = {};
    console.log(result.validTime)
    if (!result) {
        data.message = '验证码不正确！';
        data.success = false;
        return data;
    } else if (code !== result.code) {
        data.message = '验证码不正确！';
        data.success = false;
        return data;
    } else if (result.status === 0) {
        data.message = '验证码不正确！';
        data.success = false;
        return data;
    } else if (moment().toDate().getTime() > moment(result.validTime).toDate().getTime()) {
        data.message = '验证码已过期！';
        data.success = false;
        return data;
    } else {
        data.message = '验证成功';
        data.success = true;
        vecricode_rep.update();
        return data;
    }
};


module.exports = mainService;