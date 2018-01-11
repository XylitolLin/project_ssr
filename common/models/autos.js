import * as Api from '../../client/services'

export default {
    namespace: 'autos',
    state: {
        conditions: {
            sort: [{
                id: '',
                name: '綜合排序'
            }, {
                id: 'year-desc',
                name: '車齡從低到高'
            }, {
                id: 'year-asc',
                name: '車齡從高到低'
            }, {
                id: 'price-asc',
                name: '價格從低到高'
            }, {
                id: 'price-desc',
                name: '價格從高到低'
            }, {
                id: 'air-asc',
                name: '排量從低到高'
            }, {
                id: 'air-desc',
                name: '排量從高到低'
            }],
            hot_brands: [],
            brands: [],
            models: []
        },
        selectedConditions: [{ field: 'sort', value: '' }, { field: 'price', value: { min: 0, max: 20 } }]
    },
    subscriptions: {
        // setup({ history, dispatch }) {
        //     return history.listen(({ pathname }) => {
        //         if (pathname === '/autos') {
        //             dispatch({ type: 'fetchBrands' })
        //         }
        //     })
        // },
    },
    effects: {
        *fetchAutos(payload, { select, put, call }) {
            yield put({ type: 'saveFilterCondition', payload })
        },
        *fetchBrands(payload, { select, put, call }) {
            const result = yield call(Api.fetchBrands)
            yield put({ type: 'saveBrands', payload: result })
        },
        *fetchModels({ payload }, { select, put, call }) {
            const result = yield call(Api.fetchModels, payload.id)
            yield put({ type: 'saveModels', payload: result })
        }
    },
    reducers: {
        saveFilterCondition(state, { payload }) {
            const newState = state.selectedConditions.filter(item => item.field !== payload.field)
            newState.push(payload)
            return {...state, selectedConditions: newState}
        },
        saveBrands(state, { payload }) {
            const newState = { ...state.conditions, brands: payload.data, hot_brands: payload.hot_brand }
            return { ...state, conditions: newState }
        },
        saveModels(state, { payload }) {
            const models = payload.data.reduce((acc, cur, i) =>{
                return acc.concat(cur.list)
            }, [])
            const newState = { ...state.conditions, models }
            return { ...state, conditions: newState }
        }
    }
}