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
var xlxs=require('node-xlsx');

var sheets = xlxs.parse('../assert/部门2019年通讯录3.15v1.xlsx');//获取到所有sheets

console.log(sheets[1]);

describe('excel导入部门数据相关测试', () => {
    it('department save', function (done) {
        this.timeout(0);
        for (let i = 2; i < sheets[1].data.length-1; i++) {
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


describe('excel导入成员数据测试',()=>{
    it('staff save', function (done) {

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