import React from 'react'

import styles from '../styles/Home.css'

function Home() {
    return (
        <div className={styles['page']}>
            Home, Hello World
        </div>
    )
}

function pause() {
    return new Promise((resolve, reject) => {
        console.log('start')
        setTimeout(() => {
            resolve('finish')
        }, 2000)
    })
}

Home.getInitialProps = async () => {
    const msg = await pause()
    return {
        msg
    }
}

export default Home