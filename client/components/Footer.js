import React from 'react'
import styles from '../styles/Footer.less'

function footer() {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-link']}>
                <a><i className={styles['desktop-icon']}></i>桌面版</a>
                <a><i className={styles['feedback-icon']}></i>意見反饋</a>
                <a><i className={styles['app-icon']}></i>APP下載</a>
            </div>
            <p className={styles['footer-slogan']}>找車 從 8891 開始</p>
            <p className={styles['footer-copy-right']}>copyright © 2009-2018 by Addcn Technology Co., Ltd. All Rights reserved.</p>
            <p className={styles['footer-tel']}>電話: 02-5572-2088 (週一至週日)</p>
        </footer>
    )
}

export default footer
