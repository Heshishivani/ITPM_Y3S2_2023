import React from 'react'
import { authRoles } from '../../auth/authRoles'

const itemRoutes = [
    {
        path: '/items/all',
        component: React.lazy(() => import('./ViewAllItems')),
        auth: authRoles.admin,
    },
    {
        path: '/items/add',
        component: React.lazy(() => import('./AddNewItem')),
        auth: authRoles.admin,
    },
    {
        path: '/items/view/:id',
        component: React.lazy(() => import('./ViewItem')),
        auth: authRoles.customer,
    },
    {
        path: '/items/edit/:id',
        component: React.lazy(() => import('./EditItem')),
        auth: authRoles.admin,
    },
   
]

export default itemRoutes
