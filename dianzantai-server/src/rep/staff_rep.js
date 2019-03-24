/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/19 15:46
 \* Description: 员工表访问接口
 \*/
import entities from '../model/entities';
import Department from '../model/department'
import Staff from '../model/staff'

const logger = require('../lib/logger');

function save(staff, department) {
    return new Promise(function (resolve, reject) {
        if (department) {
            entities.Staff.findOrCreate({
                where: {phoneNum: staff.phoneNum}, defaults: {
                    number: staff.number,
                    openID: staff.openID,
                    passwd: staff.passwd,
                    name: staff.name,
                    position: staff.position
                }
            }).spread((savedStaff, created) => {
                if (created) {
                    // 设置department和staff 一对多关系
                    Department.hasMany(Staff);
                    Staff.belongsTo(Department);
                    department.addStaff(savedStaff).then(() => {
                        logger.info('created staff!', savedStaff.dataValues);
                        resolve(savedStaff);
                    })
                } else {
                    logger.info('find staff!', savedStaff.dataValues);
                    resolve(savedStaff)
                }
            }).catch(error => {
                reject(error)
            })
        } else {
            reject('department 对象不能为空或undefined!')
        }
    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        entities.Staff.findAll().then(staff => {
            resolve(staff)
        }).catch(error => {
            reject(error)
        })
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        entities.Staff.findByPk(id).then(staff => {
            resolve(staff)
        }).catch(error => {
            reject(error)
        })
    })
}

function findByOpenId(openId) {
    return new Promise((resolve, reject) => {
        entities.Staff.findOne({
            where: {
                openID: openId
            }
        }).then(user => {
            resolve(user);
        }).catch(error => {
            reject(error);
        })
    })
}

function acitveUpdate(phone, openId, password) {
    return new Promise((resolve, reject) => {
        entities.Staff.update(
            {
                openID: openId,
                passwd: password
            },
            {
                where: {
                    content: phone
                }
            }).then(staff =>{
                resolve(staff);
        }).catch(error =>{
            reject(error);
        })
    })
}

export default {
    save: save,
    findAll: findAll,
    findById: findById,
    findByOpenId: findByOpenId,
    acitveUpdate:acitveUpdate
}