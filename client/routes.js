import Home from './pages/Home'
import Users from './pages/Users'

export default [{
    path: '/',
    component: Home,
    exact: true
}, {
    path: '/users',
    component: Users
}]