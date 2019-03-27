const express = require('express');
const _ = require('lodash')
const router = express.Router();
let env = process.env.NODE_ENV || 'development';

import mainService from '../src/service/main_service'

/* 服务端主页 */
router.get('/(|item)', function (req, res) {
    if (_.trim(env) === 'production') {
        res.render('dist/index');
        return res;
    }
    res.render('views/index');
});

/**
 * 查询账户余额和交易记录
 */
router.get('/account_info', (req, res) => {

});

/**
 * 向指定账户发送点赞币
 *
 */
router.post('/send/dianzanbi', (req, res) => {
    mainService.sendBill(req.query.transaction).then(result => {
        res.json(result);
    }).catch(error => {
        res.json({error: error});
    })

});

module.exports = router;
