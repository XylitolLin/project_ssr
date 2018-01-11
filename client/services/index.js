import axios from 'axios'

let host = '' , newCarHost = '//c.8891.com.tw/m', apiHost = '', newCarApiHost = ''

console.log(process.env.SERVER_ENV)

switch (process.env.SERVER_ENV) {
    case 'development':
        host = '/'
        apiHost = 'http://www.dev.8891.com.tw'
        newCarApiHost = '//c.dev.8891.com.tw'
        break
    case 'production':
        apiHost = 'http://www.8891.com.tw'
        newCarApiHost = '//c.8891.com.tw'
        break
    case 'test':
        apiHost = '//www.test.8891.com.tw'
        newCarApiHost = '//c.test.8891.com.tw'
        break
}

const url = {
    host,
    newCarHost,
    apiHost,
    apiv3: `${apiHost}/api/v3`,
    apiv2: `${apiHost}/api/v2`,
    newCarApi: `${newCarApiHost}/api/v1`,
    homeDownloadLink: 'https://www.8891.com.tw/googleAnalyze-url.html?f=mobile&project=tcar&app=both&utm_source=8891H5&utm_medium=Bottom&utm_term=&utm_content=&utm_campaign=LinkAddress',
    appDownloadLink: 'https://www.8891.com.tw/googleAnalyze-url.html?f=mobile&project=tcar&app=both&utm_source=8891H5&utm_medium=SellCar&utm_term=&utm_content=&utm_campaign=LinkAddress',
    forumLink: 'http://bbs.8891.com.tw/forum.php?mod=forumdisplay&fid=50'
}

function get(url, params = {}) {
    return axios.get(url, {
        params,
        withCredentials: true,
    })
    .then(res => res.data)
}

export async function fetchIndexInfo() {
    return await get(`${url.apiv3}/home/touchIndex`)
}

export async function fetchRecentlySold() {
    return await get(`${url.apiv3}/home/newItems`)
}

export async function fetchNewCarFieldData(apiId) {
    return await get(`${url.newCarApi}/article`, { api: '2.9.5', t: apiId })
}

export async function fetchBrands() {
    return await get(`${url.apiv3}/touchBrands`)
}

export async function fetchAutos() {
    return await get(`${url.apiv3}/autos`)
}

export async function fetchModels(id) {
    return await get(`${url.apiv3}/models`, { id })
}

export { url }