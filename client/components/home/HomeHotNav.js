import React from 'react'

function HomeHotNav({ styles, hot_search, onsale }) {
    return (
        <section className={styles['used-cars-section']}>
            <div className={styles['used-cars-section-header']}>
                <div className={styles['used-cars-flag']}>中古車</div>
                <div className={styles['used-cars-info']}>
                    <span>{onsale}</span><span>輛車供您挑選！</span>
                </div>
            </div>
            <div className={styles['used-cars-section-content']}>
                <div className={styles['used-cars-section-row']}>
                    {
                        hot_search.price.map((item, index) => <a className={styles['used-cars-section-item']} key={index}>{item.name}</a>)
                    }
                </div>
                <div className={styles['used-cars-section-row']} style={{ justifyContent: 'start' }}>
                    {
                        hot_search.brand.map((item, index) => (
                            <a className={styles['used-cars-section-item']} key={index}>
                                <img src={item.icon} />
                                <p>{item.name}</p>
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className={styles['section-more-link']}><a>更多廠牌 ></a></div>
        </section>
    )
}

export default HomeHotNav
