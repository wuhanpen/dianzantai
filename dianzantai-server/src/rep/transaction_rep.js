/**
 \* Created with IntelliJ IDEA.
 \* User: ymhui
 \* Date: 2019/3/27 18:49
 \* Description:
 \*/

import entities from '../model/entities';

const logger = require('../lib/logger');

function save(transaction) {
    return new Promise((resolve, reject) => {
        entities.Transaction.create({
            initiator: transaction.initiator,
            receiver: transaction.receiver,
            transactionTime: transaction.transactionTime,
            transaction_amount: transaction.transaction_amount,
            transaction_description: transaction.transaction_description,
            finish: transaction.finish
        }).then(transaction => {
            logger(transaction);
            resolve(transaction);
        }).catch(error => {
            logger(error);
            reject(error);
        })
    })
}

function findByInitiator(initiator) {
    return new Promise((resolve, reject) => {
        entities.Transaction.findOne({
            where: {
                initiator: initiator
            }
        }).then(transaction => {
            resolve(transaction);
        }).catch(error => {
            reject(error);
        })
    })
}

function findByReceiver(receiver) {
    return new Promise((resolve, reject)=>{
        entities.Transaction.findOne({
            where: {
                receiver: receiver
            }
        }).then(transaction => {
            resolve(transaction);
        }).catch(error => {
            reject(error);
        })
    })
}

export default {
    save,
    findByInitiator,
    findByReceiver
}