import Home from './pages/Home'
import Users from './pages/Users'
import homeModel from '../common/models/home'

export default [{
    path: '/',
    component: Home,
    model: homeModel,
    exact: true
}, {
    path: '/users',
    component: Users
}]