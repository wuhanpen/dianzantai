/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/19 15:22
 \* Description: 部门表访问接口
 \*/

import entities from '../model/entities';
import Staff from '../model/staff'

const logger = require('../lib/logger');

function save(department) {
    return new Promise(function (resolve, reject) {
        entities.Department.findOrCreate({
            where: {id: department.id},
            defaults: {
                name: department.name
            }
        }).spread(function (saved, created) {
            if (created) {
                logger.info('create department!', saved.dataValues);
                resolve(saved);
            } else {
                logger.info('find department!', saved.dataValues);
                resolve(saved);
            }
        }).catch(function (error) {
            reject(error);
        })
    })
}

/**
 * 通过部门名称查询
 * @param departmentName 部门名称
 * @return {Promise<any>}
 */
function findByName(departmentName) {
    return new Promise((resolve, reject) => {
        entities.Department.findOne({
            where: {
                name: departmentName
            }
        }).then(department => {
            resolve(department)
        }).catch(error => {
            reject(error)
        })
    })
}

/**
 * 通过id查询部门
 * @param departmentId 部门id
 * @return {Promise<any>}
 */
function findById(departmentId) {
    return new Promise(((resolve, reject) => {
        entities.Department.findById(departmentId, {
            include: [{
                model: Staff,
                as: 'staff'
            }]
        }).then((department) => {
            resolve(department);
        }).catch((error) => {
            reject(error);
        })
    }))
}

export default {
    save: save,
    findById: findById,
    findByName: findByName
}