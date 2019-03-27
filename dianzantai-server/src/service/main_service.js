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
import transactionRep from '../rep/transaction_rep'

const SMSClient = require('@alicloud/sms-sdk');
const config = require('../lib/config');
const verificationCode = config.get('verificationCode');
const moment = require('moment');


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
    return new Promise((resolve, reject) => {
        staffRep.findById(phoneNum).then(user => {
            if (user) {
                vecricode_rep.findByPhoneNum(phoneNum).then(result => {
                    let msgInfo = {};
                    let code = utils.createRandomStr(4);
                    if (result) {
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
                        resolve(msgInfo);
                        //return msgInfo;
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
                        resolve(msgInfo);
                        //return msgInfo;
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            } else {
                reject("用户不存在！");
            }
        }).catch(error => {
            reject(error);
        });
    })


};

mainService.sentSMSCode = function (option) {
    return new Promise((resolve, reject) => {
        let configVerificationCode = verificationCode;
        const accessKeyId = configVerificationCode.accessKeyId;
        const secretAccessKey = configVerificationCode.secretAccessKey;
        let smsClient = new SMSClient({accessKeyId, secretAccessKey});

        smsClient.sendSMS(option).then(res => {
            let {Code} = res;
            if (Code === 'OK') {
                resolve(Code);
            } else {
                reject(Code);
            }
        }).catch(error => {
            reject(error);
        });
    });
};

mainService.sendVerifyCode = function (phoneNumber, code) {
    return new Promise((resolve, reject) => {
        let option = {};
        let templateParam = {code: code.data};
        option.PhoneNumbers = phoneNumber;
        option.SignName = verificationCode.signName;
        option.TemplateCode = 'SMS_148866200';
        option.TemplateParam = JSON.stringify(templateParam);
        mainService.sentSMSCode(option).then(sendStatus => {
            resolve(sendStatus);
        }).catch(error => {
            reject(error);
        })

    });
};

/**
 * 检验验证码
 * @param phoneNumber
 * @param code
 */
mainService.verifyCode = function (phoneNumber, code) {
    return new Promise((resolve, reject) => {
        vecricode_rep.findByPhoneNum(phoneNumber).then(result => {
            console.log(result.dataValues);
            let data = {};
            if (!result) {
                data.message = '验证码不正确！';
                data.success = false;
            } else if (code !== result.dataValues.code) {
                data.message = '验证码不正确！';
                data.success = false;
            } else if (result.dataValues.status === 0) {
                data.message = '验证码不正确！';
                data.success = false;
            } else if (moment().toDate().getTime() > moment(result.dataValues.validTime).toDate().getTime()) {
                data.message = '验证码已过期！';
                data.success = false;
            } else {
                data.message = '验证成功';
                data.success = true;
                let codeInfo = {};
                codeInfo.phoneNum = phoneNumber;
                codeInfo.code = code;
                codeInfo.status = 0;
                // codeInfo.riseTime = moment().toDate();
                // codeInfo.validTime = moment().add(verificationCode.validTime, 'seconds').toDate();
                codeInfo.count = 1;
                codeInfo.dayCount = 1;
                codeInfo.dayMax = verificationCode.dayMax;
                vecricode_rep.update(codeInfo);
            }
            resolve(data);
        }).catch(error => {
            reject(error);
        })
    });
};

/**
 * 用户是否是首次登陆
 * @param openid
 * @return {Promise<any>}
 */
mainService.isPreLanding = function (openid) {
    return new Promise((resolve, reject) => {
        staffRep.findByOpenId(openid).then(result => {
            if (!result) {
                let data = {};
                data.message = "首次登陆";
                data.result = true;
                resolve(data);
            } else {
                let data = {};
                data.message = "非首次登陆";
                data.result = false;
                resolve(data);
            }
        }).catch(error => {
            reject(error);
        })
    })
};

/**
 * 用户激活
 * @param phone
 * @param openid
 * @param password
 * @return {Promise<any>}
 */
mainService.userActive = function (phone, openid, password) {
    return new Promise((resolve, reject) => {
        staffRep.acitveUpdate(phone, openid, password).then(result => {
            if (result) {
                let data = {};
                data.message = "激活成功！";
                data.result = true;
                resolve(data);
            } else {
                let data = {};
                data.message = "激活失败！";
                data.result = false;
                resolve(data);
            }
        }).catch(error => {
            reject(error);
        })
    })
};

/**
 * 用户登录
 * @param openID
 */
mainService.loginIn = function (openID) {
    return new Promise((resolve, reject) => {
        staffRep.findByOpenId(openID).then(user => {
            if (user) {
                let data = {};
                data.message = '登录成功';
                data.result = true;
                resolve(data);
            } else {
                let data = {};
                data.message = '登录失败';
                data.result = false;
                resolve(data);
            }
        }).catch(error => {
            reject(error);
        })
    });

};

/**
 * 发送点赞币
 * @param transaction
 * @return {Promise<any>}
 */
mainService.sendBill = function (transaction) {
    return new Promise((resolve, reject) => {
        transactionRep.save(transaction).then(result => {
            if (result) {
                let data = {};
                data.message = '交易成功';
                data.result = true;
                resolve(data);
            } else {
                let data = {};
                data.message = '交易失败';
                data.result = false;
                resolve(data);
            }
        }).catch(error => {
            reject(error);
        })
    })
};

module.exports = mainService;