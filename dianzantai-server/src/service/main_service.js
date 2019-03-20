/**
 \* Created with IntelliJ IDEA.
 \* @author: 彭诗杰
 \* @time: 2019/3/20 19:57
 \* Description: 主服务service层
 \*/

import staffRep from '../rep/staff_rep';
import pingyinUtil from '../utils/pinyinUtil'

let mainService = {};

mainService.findAllStaffOrdbyFL = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let staff = await staffRep.findAll();
            let result = staff.map(item => {
                let firstLetter = pingyinUtil.chineseToPinYin(item.dataValues.name).substr(0, 1);
                switch (firstLetter) {
                    case 'A':
                        return {firstLetter: 'A', data: item.dataValues};
                    case 'B' :
                        return {firstLetter: 'B', data: item.dataValues};
                    case 'C' :
                        return {firstLetter: 'C', data: item.dataValues};
                    case 'D' :
                        return {firstLetter: 'D', data: item.dataValues};
                    case 'E' :
                        return {firstLetter: 'E', data: item.dataValues};
                    case 'F' :
                        return {firstLetter: 'F', data: item.dataValues};
                    case 'G' :
                        return {firstLetter: 'G', data: item.dataValues};
                    case 'H' :
                        return {firstLetter: 'H', data: item.dataValues};
                    case 'I' :
                        return {firstLetter: 'I', data: item.dataValues};
                    case 'J' :
                        return {firstLetter: 'J', data: item.dataValues};
                    case 'K' :
                        return {firstLetter: 'K', data: item.dataValues};
                    case 'L' :
                        return {firstLetter: 'L', data: item.dataValues};
                    case 'M' :
                        return {firstLetter: 'M', data: item.dataValues};
                    case 'N' :
                        return {firstLetter: 'N', data: item.dataValues};
                    case 'O' :
                        return {firstLetter: 'O', data: item.dataValues};
                    case 'P' :
                        return {firstLetter: 'P', data: item.dataValues};
                    case 'Q' :
                        return {firstLetter: 'Q', data: item.dataValues};
                    case 'R' :
                        return {firstLetter: 'R', data: item.dataValues};
                    case 'S' :
                        return {firstLetter: 'S', data: item.dataValues};
                    case 'T' :
                        return {firstLetter: 'T', data: item.dataValues};
                    case 'U' :
                        return {firstLetter: 'U', data: item.dataValues};
                    case 'V' :
                        return {firstLetter: 'V', data: item.dataValues};
                    case 'W' :
                        return {firstLetter: 'W', data: item.dataValues};
                    case 'X' :
                        return {firstLetter: 'X', data: item.dataValues};
                    case 'Y' :
                        return {firstLetter: 'Y', data: item.dataValues};
                    case 'Z' :
                        return {firstLetter: 'Z', data: item.dataValues};
                    default  :
                        return {firstLetter: '#', data: item.dataValues};
                }
            });
            resolve(result);
        } catch (e) {
            reject(e)
        }
    })
};

module.exports = mainService;