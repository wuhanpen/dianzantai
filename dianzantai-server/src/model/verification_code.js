/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/21 11:50
 \* Description: 手机验证码实体
 \*/

import {sequelize, Sequelize} from "./sequelize_helper";

const {STRING, INTEGER, DATE} = Sequelize;
const moment = require('moment');

const VerificationCode = sequelize.define("verification_code", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: STRING,
        primaryKey: true
    },
    code: {
        type: STRING,
        defaultValue: '',
    },
    validTime: {
        type: DATE,
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
        type: INTEGER,
        defaultValue: 0,
    },
    count: {
        type: INTEGER,
        defaultValue: 0,
    },
    riseTime: {
        type: DATE,
        get() {
            let str = this.getDataValue('riseTime');
            if (str) {
                str = moment(str).format('YYYY-MM-DD HH:mm:ss');
            }
            return str;
        }
    },
    dayCount: {
        type: INTEGER,
        defaultValue: 0,
    },
    dayMax: {
        type: INTEGER,
        defaultValue: 5,
    }
}, {
    timestamps: true,
});

export default VerificationCode;