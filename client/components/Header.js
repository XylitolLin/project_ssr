import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Header.less'

class header extends Component {
    render() {
        return (
            <header className={styles['header']}>
                <Link to="/"><span className={styles['logo']}></span></Link>
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
