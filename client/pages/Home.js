import React from 'react'
import { Carousel, Button } from 'antd-mobile'
import styles from '../styles/Home.less'
import Header from '../components/Header'
import HomeNav from '../components/home/HomeNav'
import HomeHotNav from '../components/home/HomeHotNav'
import * as Api from '../services/index'

function Home({ hot_search, onsale }) {
    return (
        <div>
            <Header />
            <Carousel className={styles['ads-container']} autoplay>
                <a><img src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDrvvPGfxABGAEyCK_h40pg_msb" /></a>
            </Carousel>
            <HomeNav styles={styles} />
            <HomeHotNav styles={styles} hot_search={hot_search} onsale={onsale} />
        </div>
    )
}

Home.getInitialProps = async () => {
    const data = await Api.fetchIndexInfo()
    console.log(data)
    return {
        hot_search: data.hot_search,
        onsale: data.onsale
    }
}

export default Home