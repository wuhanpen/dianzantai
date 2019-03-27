/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/21 14:19
 \* Description: 手机验证码表访问接口
 \*/

import entities from '../model/entities';

const logger = require('../lib/logger');


function findByPhoneNum(phone) {
    return new Promise((resolve, reject) => {
        entities.VerificationCode.findOne({
            where: {
                content: phone
            }
        }).then(verificationCode => {
            resolve(verificationCode)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 *
 * @param vericode {content: 'content', code: 'code', ... ...}
 * @return {Promise<any>}
 */
function save(vericode) {
    return new Promise((resolve, reject) => {
        entities.VerificationCode.create({
            content: vericode.phoneNum,
            code: vericode.code,
            status: vericode.status,
            riseTime: vericode.riseTime,
            validTime: vericode.validTime,
            count: vericode.count,
            dayCount: vericode.dayCount,
            dayMax: vericode.dayMax
        }).then(vericode => {
            resolve(vericode)
        }).catch(error => {
            reject(error)
        })
    })
}

function update(vericode) {
    return new Promise((resolve, reject) => {
        entities.VerificationCode.update({
            code: vericode.code,
            status: vericode.status,
            riseTime: vericode.riseTime,
            validTime: vericode.validTime,
            count: vericode.count,
            dayCount: vericode.dayCount,
            dayMax: vericode.dayMax
        }, {
            where: {
                content: vericode.phoneNum
            }
        }).then(vericode => {
            resolve(vericode);
        }).catch(error => {
            reject(error);
        })
    })
}

export default {
    findByPhoneNum,
    save,
    update
}