import React from 'react'
import { Link } from 'react-router-dom'
// import LazyLoad from 'react-lazyload'

function RecentlySold({ styles, data, loading }) {
    return (
        <section className={styles['recently-sold-section']}>
            <h3 className={styles['recently-sold-header']}>最新出售</h3>

            <div className={styles['recently-sold-container']}>
                {
                    data.map(item => {
                        const { id, image, brand, brand_en, kind, kind_en, model, model_en, price, year_type } = item
                        const itemTitle = `${ brand !== '' ? brand : brand_en  } ${ kind !== '' ? kind : kind_en } ${model_en} ${year_type !== '' ? year_type + '款' : ''}`
                        return (
                            <Link to="/" className={styles['recently-sold-item']} key={id}>
                                <div className={styles['recently-sold-image']}>
                                    <img src={image} />
                                </div>
                                <p className={styles['recently-sold-name']}>{itemTitle}</p>
                                <p className={styles['recently-sold-price']}>{ !isNaN(price) ? `${price}萬` : price}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className={styles['section-more-link']}><a>更多中古車 ></a></div>
        </section>
    )
}

export default RecentlySold
