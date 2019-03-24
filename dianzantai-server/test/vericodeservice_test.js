/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/22 9:24
 \* Description:
 \*/
require('babel-register');
// import 'babel-polyfill'; // mocha 支持es6的需要的设置
const logger = require('../src/lib/logger');

import mainService from '../src/service/main_service'

describe('手机短信验证码相关测试', () => {
    it('send msg', function (done) {
        mainService.createSMSCode('18986180066').then(code =>{
            //mainService.sendVerifyCode('18768890710', code);
            console.log(code);
            done();
        }).catch(error =>{
            logger.info(error);
            done();
        })
    });

    it('verify code', function (done) {
        mainService.verifyCode('18986180066', '3836').then(data=>{
            console.log(data);
            done();
        }).catch(error =>{
            console.log(error);
            done();
        })
    });
});