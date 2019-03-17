/**
 \* Created with WEBSTORM.
 \* User: 彭诗杰
 \* Date: 2019/3/17
 \* Time: 11:59
 \* Description: 公司员工实体
 \*/

import {sequelize, Sequelize} from "./sequelize_helper";

const Staff = sequelize.define("staff", {
    phoneNum: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    openID: Sequelize.STRING, // 微信对外标识，OPENID
    passwd: Sequelize.STRING, // 支付密码
    name: Sequelize.STRING, // 姓名
    department: Sequelize.STRING, // 所在部门
    position: Sequelize.STRING // 职位
});
export default Staff;