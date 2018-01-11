import React from 'react'
import { Carousel } from 'antd-mobile'
import LazyLoad from 'react-lazyload'
import styles from '../styles/Home.less'
import Header from '../components/Header'
import HomeNav from '../components/home/HomeNav'
import HomeHotNav from '../components/home/HomeHotNav'
import RecentlySold from '../components/home/RecentlySold'
import NearByShop from '../components/home/NearByShop'
import NewCarNav from '../components/home/NewCarNav'
import NewCarTabList from '../components/home/NewCarTabList'
import Footer from '../components/Footer'
import * as Api from '../services/index'

import { connect } from 'react-redux'

function Home({ hot_search, onsale, recentlySold, newCarField, dispatch }) {
    return (
        <div className="page">
            <Header />
            <Carousel className={styles['ads-container']} autoplay>
                <a><img src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDrvvPGfxABGAEyCK_h40pg_msb" /></a>
            </Carousel>
            <HomeNav styles={styles} />
            <HomeHotNav styles={styles} hot_search={hot_search} onsale={onsale} />
            <RecentlySold styles={styles} data={recentlySold} />
            <NearByShop styles={styles} />
            <NewCarNav styles={styles} />
            <LazyLoad height={200}>
                <NewCarTabList styles={styles} dispatch={dispatch} data={newCarField} />
            </LazyLoad>
            <Footer />
        </div>
    )
}

Home.getInitialProps = async ({ dispatch }) => {
    const indexInfo = await Api.fetchIndexInfo()
    const recentlySold = await Api.fetchRecentlySold()
    dispatch({ type: 'home/saveIndexInfo', payload: indexInfo })
    dispatch({ type: 'home/saveRecentlySold', payload: recentlySold })
    return {
    }
}

function mapStateToProps(state) {
    console.log('pages/Home mapStateToProps: ', state)
    const { hot_search, onsale, recentlySold, newCarField } = state.home
    return {
        hot_search,
        onsale,
        recentlySold,
        newCarField,
    }
}

export default connect(mapStateToProps)(Home)