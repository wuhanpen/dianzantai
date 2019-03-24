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
        // let code = mainService.createSMSCode('18768890710');
        // mainService.sendVerifyCode('18768890710', code);
        mainService.createSMSCode('18768890710').then(code =>{
            mainService.sendVerifyCode('18768890710', code);
            done();
        }).catch(error =>{
            logger.info(error);
            done();
        })
    });
});