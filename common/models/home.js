import * as Api from '../../client/services'
export default {
    namespace: 'home',
    state: {
        hot_search: {
            price: [],
            brand: []
        },
        recentlySold: [],
        newCarTabs: [{
            id: 'latest',
            name: '最新',
            apiId: 0
        }, {
            id: 'testing',
            name: '試車',
            apiId: 1
        }, {
            id: 'hot',
            name: '熱門',
            apiId: 4
        }, {
            id: 'news',
            name: '趣聞',
            apiId: 18
        }, {
            id: 'rank',
            name: '排行',
            apiId: 7
        }],
        newCarField: {
            currentTab: 'latest',
            latest: [],
            testing: [],
            hot: [],
            news: [],
            rank: []
        }
    },
    reducers: {
        saveIndexInfo(state, { payload }) {
            return { ...state, ...payload }
        },
        saveRecentlySold(state, { payload }) {
            return {...state, recentlySold: payload.data }
        },
        handleTabChange(state, { payload }) {
            const newState = {...state.newCarField, currentTab: payload }
            return {...state, newCarField: newState}
        },
        saveNewCarField(state, { payload }) {
            console.log(payload)
            const newState = {...state.newCarField, [payload.id]: payload.data.data }
            return {...state, newCarField: newState}
        }
    },
    effects: {
        *fetchNewCarFieldData({ payload }, { select, put, call }) {
            try {
                const result = yield call(Api.fetchNewCarFieldData, payload.apiId)
                yield put({ type: 'saveNewCarField', payload: { id: payload.id, data: result } })
            } catch(e) {
                console.log(e)
            }
        }
    },
    subscriptions: {
    },
}