import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function HomeNav({ styles }) {
    return (
        <div className={styles['top-nav']}>
            <Link to="/autos" className={styles['nav-item']}>
                <i className={styles['nav-buy-icon']}></i>
                <p>買中古車</p>
            </Link>
            <a className={styles['nav-item']}>
                <i className={styles['nav-sell-icon']}></i>
                <p>賣中古車</p>
            </a>
            <a className={styles['nav-item']}>
                <i className={styles['nav-desc-icon']}></i>
                <p>中古車特色</p>
            </a>
            <a className={styles['nav-item']}>
                <i className={styles['nav-new-icon']}></i>
                <p>找新車</p>
            </a>
        </div>
    )
}

HomeNav.propsType = {
    styles: PropTypes.object.isRequired
}

export default HomeNav
