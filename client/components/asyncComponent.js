import React from 'react'

export default function asyncComponent({ component: Component, path }) {

    if (typeof window === 'undefined') return Component

    if (window.RENDERING_INFO && window.RENDERING_INFO.pathname === path) {
        delete window.RENDERING_INFO
        return Component
    }

    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                component: null,
                nextProps: {}
            }
        }
        async componentDidMount() {
            // const { default: component } = await importComponent()
            const routeGetInitialProps = Component.getInitialProps
            let nextProps = {}
            if (typeof routeGetInitialProps === 'function') {
                nextProps = await routeGetInitialProps()
            }
            this.setState({
                component: Component,
                nextProps
            })
        }
        render() {
            const { component: C, component, nextProps } = this.state
            return component ? <C {...nextProps} /> : null
        }
    }

    return AsyncComponent
}
