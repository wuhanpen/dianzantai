import staff_rep from "../src/rep/staff_rep";

const express = require('express');
const router = express.Router();

import mainService from '../src/service/main_service'

/**
 * 用户首次登陆激活
 */
router.get('/staff/active', (req, res, next) => {

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
    mainService
})


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
