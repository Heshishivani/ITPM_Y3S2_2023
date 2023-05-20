import { authRoles } from 'app/auth/authRoles'
import UserProfile from './UserProfile'
import AllCustomers from './AllCustomers'
import ViewCustomer from './ViewCustomer'
import UpdateUserProfile from './UpdateUserProfile'

const commonRoutes = [
    {
        path: '/user-profile',
        auth: authRoles.customer,
        component: UserProfile,
    },
    {
        path: '/customers/all',
        auth: authRoles.admin,
        component: AllCustomers,
    },
    {
        path: '/customers/view/:id',
        auth: authRoles.admin,
        component: ViewCustomer,
    },
    {
        path: '/customers/edit/:id',
        auth: authRoles.customer,
        component: UpdateUserProfile,
    },
    
]

export default commonRoutes
