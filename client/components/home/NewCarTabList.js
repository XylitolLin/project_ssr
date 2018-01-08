import React, { Component } from 'react'
import cx from 'classnames'
// import Spinner from '../Spinner'

const tabbar = [{
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
}]

function setClassName(styles, id, currentId) {
    return cx({
        [styles['new-car-nav-item']]: true,
        [styles['active']]: id === currentId
    })
}
class NewCarTabList extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({ type: 'home/fetchNewCarFieldData', payload: { id: 'latest', apiId: 0 } })
    }
    handleTabClick(id, apiId) {
        const { dispatch, data } = this.props
        dispatch({ type: 'home/handleTabChange', payload: id })
        if (data[id].length <= 0) {
            dispatch({ type: 'home/fetchNewCarFieldData', payload: { id, apiId } })
        }
    }
    render() {
        const { styles, data, loading, dispatch } = this.props
        return (
            <section className={styles['new-car-nav-container']}>
                <div>
                    {
                        tabbar.map(item => (
                            <a key={item.id} className={setClassName(styles, item.id, data.currentTab)} onClick={() => this.handleTabClick(item.id, item.apiId)}>
                                {item.name}
                            </a>
                        ))
                    }
                </div>
                <ul className={styles['new-car-content-list']}>
                    {
                        data[data.currentTab].slice(0, 5).map(item => (
                            <li className={styles['new-car-content-item']} key={item.id}>
                                <a href={item.fb_url} target="_blank">
                                    <div className={styles['new-car-item-left']}>
                                        <img src={item.thumb} />
                                    </div>
                                    <div className={styles['new-car-item-right']}>
                                        <p className={styles['new-car-item-title']}>{item.title}</p>
                                        <div className={styles['new-car-item-detail']}>
                                            <div>
                                                <span className={styles['new-car-item-tag']} style={{ color: item.color.color, borderColor: item.color.color }}>{item.color.tag}</span>
                                                <span className={styles['new-car-item-date']}>{item.time}</span>
                                            </div>
                                            <p>{item.visits} 閱讀</p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <div className={styles['section-more-link']}><a style={{ color: '#1d50a3' }}>更多最新資訊 ></a></div>
            </section>
        )
    }
}

export default NewCarTabList
