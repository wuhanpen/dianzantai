/**
 \* Created with WEBSTORM.
 \* User: 彭诗杰
 \* Date: 2019/3/17
 \* Time: 12:00
 \* Description: 数据库实体文件，定义为存放数据库中所有的实体表
 \*/
import {sequelize, Sequelize} from './sequelize_helper';
import Staff from './staff'
import Department from './department'
import VerificationCode from './verification_code'


Department.hasMany(Staff, {
    as: 'staff'
});

sequelize.sync();

const entities = {
    Staff,
    Department,
    VerificationCode,
    sequelize,
    Sequelize
};
export default entities;