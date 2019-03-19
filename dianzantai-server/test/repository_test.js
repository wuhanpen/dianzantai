/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/19 15:26
 \* Description: 数据库访问接口单元测试集合
 \*/
require('babel-register');
// import 'babel-polyfill'; // mocha 支持es6的需要的设置
const logger = require('../src/lib/logger');
import departmentRep from '../src/rep/department_rep';

describe('数据库部门表接口相关测试', () => {
    it('department save', function (done) {
        departmentRep.save({id: '1234', name: '信息咨询研究院'}).then(function (department) {
            logger.info(department.dataValues);
            done();
        }).catch(function (error) {
            logger.error(error);
            done(error);
        })
    });
})
