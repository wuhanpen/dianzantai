import staff_rep from "../src/rep/staff_rep";

const express = require('express');
const router = express.Router();

import mainService from '../src/service/main_service'

/**
 * 用户是否首次登陆
 */
router.get('/staff/login/first', (req, res, next) => {
    mainService.isPreLanding(req.query.openID).then(result => {
        res.json(result);
    }).catch(error => {
        res.json({error: error});
    })
});

/**
 * 用户首次登陆激活
 */
router.get('/staff/active', (req, res, next) => {
    mainService.userActive(req.query.phone, req.query.openID, req.query.password).then(result => {
        res.json(result);
    }).catch(error => {
        res.json({error: error});
    })
});

/**
 * 用户登陆
 */
router.get('/staff/login', (req, res) => {

});

/**
 * 发送短信验证码
 */
router.get('/staff/sms/code', (req, res) => {
    mainService.createSMSCode(req.query.phone).then(code => {
        console.log(code);
        mainService.sendVerifyCode(req.query.phone, code).then(sendStatus => {
            res.send(sendStatus);
        }).catch(error => {
            res.json({error: error});
        })
    }).catch(error => {
        res.json({error: error});
    })
});

/**
 * 检验验证码
 */
router.get('/staff/sms/code/verify', (req, res) => {
    mainService.verifyCode(req.query.phone, req.query.code).then(result => {
        res.send(result.message);
    }).catch(error => {
        res.json({error: error});
    })
});

/**
 * 查看通信录
 */
router.get('/staff/contact', (req, res) => {
    mainService.findAllStaffOrdbyFL().then(staff => {
        res.json(staff)
    }).catch(error => {
        res.json({error: error})
    })
});

module.exports = router;
