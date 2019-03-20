/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/20 20:30
 \* Description: mainservice 测试套件
 \*/
import mainService from '../src/service/main_service'
const logger = require('../src/lib/logger');

describe('mainservice层接口相关测试', () => {
    it('findAllStaffOrdbyFL函数测试', function (done) {
       mainService.findAllStaffOrdbyFL().then(staff => {
           logger.info(staff);
           done()
       }).catch(error => {
           logger.error(error)
           done()
       })
    });
});