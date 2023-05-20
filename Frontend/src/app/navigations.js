import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
        auth: authRoles.customer,
    },
    {
        name: 'Profile',
        path: '/user-profile',
        icon: 'account_circle_icon',
        auth: authRoles.customer,
    },
    {
        name: 'Items',
        icon: 'bar_chart_icon',
        path: '/items',
        auth: authRoles.admin,
        children: [
            {
                name: 'All Items',
                iconText: 'SI',
                path: '/items/all',
                auth: authRoles.admin,
            },
            {
                name: 'Add New Item',
                iconText: 'SI',
                path: '/items/add',
                auth: authRoles.admin,
            },
        ],
    },
    {
        name: 'Customers',
        icon: 'account_circle_icon',
        path: '/customers',
        auth: authRoles.admin,
        children: [
            {
                name: 'All Customers',
                iconText: 'SI',
                path: '/customers/all',
                auth: authRoles.admin,
            },
        ],
    },
  
]
