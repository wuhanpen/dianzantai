/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/21 14:19
 \* Description: 手机验证码表访问接口
 \*/

import entities from '../model/entities';
import VerificationCode from '../model/verification_code'
const logger = require('../lib/logger');


function findByPhoneNum(phone) {
    return new Promise((resolve, reject) => {
        entities.VerificationCode.findOne({where: {
                content: phone
            }}).then(verificationCode => {
                resolve(verificationCode)
        }).catch(error => {
            reject(error)
        })
    })
}

export default {
    findByPhoneNum
}