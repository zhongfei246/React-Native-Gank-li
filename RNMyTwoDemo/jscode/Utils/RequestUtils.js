import DateUtils from './DateUtils'
const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('timeout'))
        },ms)
    })
}

const fetchWithTimeOut = (timeout, ...args) => {
    return Promise.race([fetch(...args), delay(timeout)])
}

const RequestUtils = {
    API_DATE: 'http://gank.io/api/day/history',
    API_DAILY: 'http://gank.io/api/day/',

    getDataArray() {
        return fetchWithTimeOut(10000,this.API_DATE)
            .then(response => response.json())//返回Promise, await 表示拿到下一个then里resolve的参数值
    },

    async getContents (dateArray) {
        const proc = (date) => {
            const url = DateUtils.converDate(this.API_DAILY + date)

            return fetchWithTimeOut(10000,url).then(response => response.json()).then(responseData => {
                        responseData.date = date
                        return responseData
            })
        }

        return await Promise.all(dateArray.map(proc))// all，同时执行，全部成功才算ok，then里边的参数是每一个promise结果的有序集
    }
}

module.exports = RequestUtils