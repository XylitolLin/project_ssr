import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd-mobile'

function NewCarNav({ styles }) {
    return (
        <section className={styles['newcar-nav-section']}>
            <div className={styles['new-cars-section-header']}>
                <div className={styles['new-cars-flag']}>新車</div>
            </div>
            <div className={styles['new-cars-nav-container']}>
                <Link to="/" className={styles['new-cars-nav-item']}>找車</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>新聞</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>深度解析</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>比較</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>評價</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>圖片</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>預約試駕</Link>
                <Link to="/" className={styles['new-cars-nav-item']}>影音</Link>
            </div>
            <Carousel className={styles['ads-container']} autoplay>
                <a><img src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDrvvPGfxABGAEyCK_h40pg_msb" /></a>
            </Carousel>
        </section>
    )
}

export default NewCarNav
