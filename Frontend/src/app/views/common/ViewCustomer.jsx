import React, { useEffect, useState } from 'react'
import {
    Card,
    Icon,
    Grid,
    Divider,
    Typography,
    Tooltip,
    Avatar,
} from '@material-ui/core'
import LoadingDialog from 'app/components/LoadingDialog/LoadingDialog'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'
import Axios from 'axios'
import Swal from 'sweetalert2'

function ViewCustomer() {
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState({})
    const params = useParams()

    const getCustomerData = async () => {
        setLoading(true)
        await Axios.get(BACKEND_API_ENDPOINT + 'users/view/' + params.id)
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data)
                    setCustomer(res.data)
                    setLoading(false)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Error',
                    })
                }
            })
            .catch((error) => {
                setLoading(false)
                console.log('error: ', error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Exp.Error',
                })
            })
    }

    useEffect(() => {
        getCustomerData()
    }, [])

    return (
        <div className="m-sm-30">
            {loading ? (
                <LoadingDialog size={24} />
            ) : (
                <>
                    <Card className="px-4 py-6" elevation={3}>
                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <Typography
                                    className="text-center mb-5"
                                    variant="h4"
                                >
                                    View Customer
                                </Typography>
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <Avatar
                                    className="cursor-pointer mb-5"
                                    src={`data:image/jpeg;base64,${customer.image}`}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <p className="text-muted mt-0 mb-2">
                                    Username: {customer.name}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    First Name: {customer.fname}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    Last Name: {customer.lname}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    Email: {customer.email}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    Role: {customer.role}
                                </p>
                            </Grid>
                        </Grid>
                    </Card>
                </>
            )}
        </div>
    )
}

export default ViewCustomer
