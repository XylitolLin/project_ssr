import React from 'react'

class Users extends React.Component {
    static getInitialProps() {
        console.log('in User getInitial')
        return {
            name: 'pure'
        }
    }

    render() {
        return (
            <div>Users</div>
        )
    }
}

export default Users