/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/19 15:14
 \* Description: 部门实体类
 \*/

import {sequelize, Sequelize} from "./sequelize_helper";

const Staff = sequelize.define("department", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: Sequelize.STRING, // 部门名称
});
export default Staff;

