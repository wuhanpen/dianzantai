const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * 查询账户余额和交易记录
 */
router.get('/account_info', (req, res) => {

})

/**
 * 向指定账户发送点赞币
 *
 */
router.post('/send/dianzanbi', (req, res) => {

})

module.exports = router;
