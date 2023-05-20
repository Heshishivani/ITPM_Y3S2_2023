import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/dashboard/DashboardRoutes'
import itemRoutes from './views/items/ItemRoutes'
import commonRoutes from './views/common/CommonRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...commonRoutes,
    ...itemRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
