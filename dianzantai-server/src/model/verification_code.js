/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/21 14:21
 \* Description:
 \*/

import {sequelize, Sequelize} from "./sequelize_helper";

const moment = require('moment');

const VerificationCode = sequelize.define('verification_code', {
    phoneNum: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    content: Sequelize.STRING,
    code: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    validTime: {
        type: Sequelize.DATE,
        get() {
            let str = this.getDataValue('validTime');
            if (str) {
                str = moment(str).format('YYYY-MM-DD HH:mm:ss');
            }
            return str;
        }
    },
    // 验证码状态 0 失效 1 有效
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    riseTime: {
        type: Sequelize.DATE,
        get() {
            let str = this.getDataValue('riseTime');
            if (str) {
                str = moment(str).format('YYYY-MM-DD HH:mm:ss');
            }
            return str;
        }
    },
    dayCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    dayMax: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    }
});

export default VerificationCode;