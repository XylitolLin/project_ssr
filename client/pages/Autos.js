import React from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { connect } from 'react-redux'
import Header from '../components/Header'
import classNames from 'classnames'
import SortConditionsList from '../components/autos/SortConditionsList'
import BrandConditionsList from '../components/autos/BrandConditionsList'
import styles from '../styles/Autos.less'

import * as Api from '../services/index'

const filterTypes = [{
    id: 'sort',
    name: '排序'
}, {
    id: 'brand',
    name: '廠牌'
}, {
    id: 'price',
    name: '價格'
}, {
    id: 'more',
    name: '篩選'
}]

class Autos extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            getSectionHeaderData: (dataBlob, sectionID, rowID) => { return sectionID },
            getRowData: (dataBlob, sectionID, rowID) => { return dataBlob[sectionID][rowID] },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        })
        const brands = props.brandsConditions.reduce((acc, cur, i) =>{
            acc[cur.label] = cur.list
            return acc
        }, {})
        this.state = {
            refreshing: false,
            currentFilter: '',
            isDisplayList: true,
            dataSource: dataSource.cloneWithRowsAndSections(brands)
        }
        this.handleDisplayClick = this.handleDisplayClick.bind(this)
        this.hideFilterPopover = this.hideFilterPopover.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.brandsConditions)
        // const brands = nextProps.brandsConditions.reduce((acc, cur, i) =>{
        //     acc[cur.label] = cur.list
        //     return acc
        // }, {})
        // this.setState((prevState) => ({
        //     dataSource: prevState.dataSource.cloneWithRowsAndSections(brands)
        // }))
    }

    setFilterClassName(id, currentId) {
        return classNames({
            [styles['autos-filter-type']]: true,
            [styles['autos-filter-type-active']]: id === currentId
        })
    }

    handleFilterClick(id) {
        this.setState(prevState => ({
            currentFilter: prevState.currentFilter !== id ? id : ''
        }))
    }

    handleDisplayClick() {
        this.setState(prevState => ({
            isDisplayList: !prevState.isDisplayList
        }))
    }

    hideFilterPopover() {
        this.setState({
            currentFilter: ''
        })
    }

    render() {
        const { dataSource, currentFilter, isDisplayList } = this.state
        const { sortConditions, selectedConditions, hot_brands, models, dispatch } = this.props
        const pageCX = (currentFilter) => classNames({ [styles['page']]: true, [styles['show-filter-popover']]: currentFilter === 'brand' })
        return (
            <div className={pageCX(currentFilter)}>
                <Header />
                <div className={styles['autos-filter-contianer']}>
                    <div className={styles['autos-filter-types']}>
                        {
                            filterTypes.map(item => (
                                <a className={this.setFilterClassName(item.id, currentFilter)} key={item.id} onClick={() => this.handleFilterClick(item.id)}>{item.name}</a>
                            ))
                        }
                        <a className={classNames({ [styles['autos-display-type']]: true, [styles['autos-display-block']]: !isDisplayList })} onClick={this.handleDisplayClick}></a>
                    </div>
                    <div className={styles['filter-popover']}>
                        {
                            currentFilter === 'sort' ? (
                                <SortConditionsList styles={styles} data={sortConditions} selectedConditions={selectedConditions} hideFilterPopover={this.hideFilterPopover} dispatch={dispatch} />
                            ) : null
                        }
                        {
                            currentFilter === 'brand' ? (
                                <BrandConditionsList styles={styles} dataSource={dataSource} hot_brands={hot_brands} models={models} />
                            ) : null
                        }
                    </div>
                </div>
                <div className={styles['page-container']}>

                </div>
            </div>
        )
    }
}

Autos.getInitialProps = async ({ dispatch }) => {
    const brands = await Api.fetchBrands()
    dispatch({ type: 'autos/saveBrands', payload: brands })
    return {
    }
}

function mapStateToProps(state) {
    const { sort, hot_brands, brands, models } = state.autos.conditions, { selectedConditions } = state.autos
    return {
        sortConditions: sort,
        selectedConditions,
        hot_brands,
        brandsConditions: brands,
        models
    }
}

export default connect(mapStateToProps)(Autos)
