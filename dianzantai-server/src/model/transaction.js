/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/27 17:55
 \* Description:
 \*/

import {sequelize, Sequelize} from "./sequelize_helper";

const {STRING, INTEGER, DATE, BOOLEAN} = Sequelize;
const moment = require('moment');

const Transaction = sequelize.define("transaction", {
    initiator: {
        type: STRING,
        allowNull: false
    },
    receiver: {
        type: STRING,
        allowNull: false
    },
    transactionTime: {
        type: DATE,
        allowNull: false,
        get() {
            let str = this.getDataValue('transactionTime');
            if (str) {
                str = moment(str).format('YYYY-MM-DD HH:mm:ss');
            }
            return str;
        }
    },
    transaction_amount: {
        type: INTEGER,
        defaultValue: 0
    },
    transaction_description: {
        type: STRING
    },
    finish: {
        type: BOOLEAN,
        defaultValue: false
    }

});

export default Transaction;