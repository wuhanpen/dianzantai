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
import staffRep from '../src/rep/staff_rep';

describe('数据库部门表接口相关测试', () => {
    it('department save', function (done) {
        departmentRep.save({id: '1234', name: '信息咨询研究院'}).then(function (department) {
            logger.info(department.dataValues);
            done();
        }).catch((error) => {
            logger.error(error);
            done(error);
        })
    });
})

describe('数据库员工表接口相关测试', () => {
    it('staff save', function (done) {
        departmentRep.findById('1234').then(department => {
            staffRep.save({phoneNum: '18907185157', name: '邓晓宇', position: '院长', number: '027-65666502'},
                department).then(staff => {
                logger.info(staff.dataValues);
                done();
            }).catch(error => {
                logger.error(error)
                done(error)
            })
        }).catch(error => {
            logger.error(error);
            done(error)
        })
    });
});
