/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/19 15:22
 \* Description:
 \*/

import entities from '../model/entities';

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

export default {
    save: save,
}