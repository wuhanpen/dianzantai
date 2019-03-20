import departmentRep from "../src/rep/department_rep";

/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/19 14:42
 \* Description:
 \*/
require('babel-register');
// import 'babel-polyfill'; // mocha 支持es6的需要的设置
const logger = require('../src/lib/logger');
//import departmentRep from '../src/rep/department_rep';
import staffRep from '../src/rep/staff_rep';

var xlxs = require('node-xlsx');

var sheets = xlxs.parse('dianzantai-server/src/assert/部门2019年通讯录3.15v1.xlsx');//获取到所有sheets

//console.log(sheets[1]);
console.log(sheets[0]);

describe('excel导入部门数据相关测试', () => {
    it('department save', function (done) {
        this.timeout(0);
        for (let i = 2; i < sheets[1].data.length - 1; i++) {
            console.log(sheets[1].data);
            departmentRep.save({id: sheets[1].data[i][0], name: sheets[1].data[i][1]}).then(function (department) {
                logger.info(department.dataValues);
                done();
            }).catch(function (error) {
                logger.error(error);
                done(error);
            })
        }
    });
});


describe('excel导入成员数据测试', () => {
    it('staff save', function (done) {
        for (let i = 1; i < sheets[0].data.length; i++) {
            departmentRep.findByName(sheets[0].data[i][2]).then(department => {
                //console.log(department.dataValues);
                staffRep.save({
                        phoneNum: sheets[0].data[i][4],
                        name: sheets[0].data[i][1],
                        position: sheets[0].data[i][3],
                        number: sheets[0].data[i][5]
                    },
                    department).then(staff => {
                    logger.info(staff.dataValues);
                    done();
                }).catch(error => {
                    {
                        logger.info(error);
                        done(error);
                    }
                })
            }).catch(error => {
                logger.info(error);
                done(error);
            })
        }
    });
});
// sheets.forEach(function(sheet){
//     console.log(sheet['data']);
//     for(var rowId in sheet['data']){
//         console.log(rowId);
//         var row=sheet['data'][rowId];
//         console.log(row);
//     }
// });