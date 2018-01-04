import React from 'react'
import { Carousel } from 'antd-mobile'
import styles from '../styles/Home.less'
import Header from '../components/Header'
import HomeNav from '../components/home/HomeNav'

function Home(props) {
    console.log(props)
    return (
        <div>
            <Header />
            <Carousel className={styles['ads-container']} autoplay>
                <a><img src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDrvvPGfxABGAEyCK_h40pg_msb" /></a>
            </Carousel>
            <HomeNav styles={styles} />
        </div>
    )
}

Home.getInitialProps = async () => {
    return {
    }
}

export default Home