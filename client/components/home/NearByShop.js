import React from 'react'
import { Link } from 'react-router-dom'

function NearbyShop({ styles }) {
    return (
        <section className={styles['nearby-shop-section']}>
            <h3 className={styles['nearby-shop-header']}>附近車行</h3>
            <ul className={styles['nearby-shop-content']}>
                <li>
                    <Link to="/" className={styles['nearby-shop-item']}>
                        <div className={styles['nearby-shop-left']}><img src="https://p1.8891.com.tw/2017/11/08/2/1510113166508741_320_240.jpg" /></div>
                        <div className={styles['nearby-shop-right']}>
                            <div>
                                <div className={styles['nearby-shop-info']}>
                                    <div className={styles['nearby-shop-info-title']}>不騙你車行</div>
                                    <div className={styles['nearby-shop-distance']}>距離300.0公里</div>
                                </div>
                                <p className={styles['nearby-shop-brand']}>主營：賓士 寶馬</p>
                            </div>
                            <p className={styles['nearby-shop-desp']}><span>300</span>輛在售</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/" className={styles['nearby-shop-item']}>
                        <div className={styles['nearby-shop-left']}><img src="https://p1.8891.com.tw/2017/11/08/2/1510113166508741_320_240.jpg" /></div>
                        <div className={styles['nearby-shop-right']}>
                            <div>
                                <div className={styles['nearby-shop-info']}>
                                    <div className={styles['nearby-shop-info-title']}>不騙你車行</div>
                                    <div className={styles['nearby-shop-distance']}>距離300.0公里</div>
                                </div>
                                <p className={styles['nearby-shop-brand']}>主營：賓士 寶馬</p>
                            </div>
                            <p className={styles['nearby-shop-desp']}><span>300</span>輛在售</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/" className={styles['nearby-shop-item']}>
                        <div className={styles['nearby-shop-left']}><img src="https://p1.8891.com.tw/2017/11/08/2/1510113166508741_320_240.jpg" /></div>
                        <div className={styles['nearby-shop-right']}>
                            <div>
                                <div className={styles['nearby-shop-info']}>
                                    <div className={styles['nearby-shop-info-title']}>不騙你車行</div>
                                    <div className={styles['nearby-shop-distance']}>距離300.0公里</div>
                                </div>
                                <p className={styles['nearby-shop-brand']}>主營：賓士 寶馬</p>
                            </div>
                            <p className={styles['nearby-shop-desp']}><span>300</span>輛在售</p>
                        </div>
                    </Link>
                </li>
            </ul>
            <div className={styles['section-more-link']}><a>更多中古車行 ></a></div>
        </section>
    )
}

export default NearbyShop
