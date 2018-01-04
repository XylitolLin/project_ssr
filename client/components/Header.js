import React, { Component } from 'react'
import styles from '../styles/Header.less'

class header extends Component {
    render() {
        return (
            <header className={styles['header']}>
                <span className={styles['logo']}></span>
                <div className={styles['search-input']} >
                    <i className={styles['search-icon']}></i>
                    <span>請輸入您要找的車</span>
                </div>
            </header>
        )
    }
}

header.propTypes = {
}

export default header
