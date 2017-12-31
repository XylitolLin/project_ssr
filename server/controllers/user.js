async function getUserInfo(ctx) {
    ctx.body = {
        name: 'MR.Lin',
        gender: 'male',
        age: 20
    }
}

export default {
    getUserInfo
}
