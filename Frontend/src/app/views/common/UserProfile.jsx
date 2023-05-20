import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core'
import useAuth from 'app/hooks/useAuth'
import { SimpleCard } from 'app/components'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'

const UserProfile = () => {
    const { user, logout } = useAuth()
    const [loading, setLoading] = useState(true)

    const deleteUserProfile = () => {
        Swal.fire({
            title: 'Are you sure you delete this account?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#FF3D57',
        }).then(async (result) => {
            setLoading(true)
            if (result.isConfirmed) {
                await Axios.delete(BACKEND_API_ENDPOINT + 'users/delete/' + user._id)
                    .then((res) => {
                        if (res.status == 200 && res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Deleted!.',
                            }).then(() => {
                                logout()
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error!',
                                text: 'Error',
                            })
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Error',
                        })
                    })
            }
        })
    }

    return (
        <div className="analytics m-sm-30">
            <SimpleCard>
                <Typography className="text-center" variant="h4">
                    User Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <img
                            src="/assets/images/manageUser.jpg"
                            alt="user Image"
                            width="100%"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        className="pt-5 mt-5"
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Avatar
                                className="cursor-pointer mb-5"
                                src={`data:image/jpeg;base64,${user.image}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                Username: {user.name}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                First Name: {user.fname}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                Last Name: {user.lname}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                Email: {user.email}
                            </Typography>
                            <Link to={'/customers/edit/' + user._id}>
                                <Button variant="contained" color="primary">
                                    Edit Profile
                                </Button>
                            </Link>
                            <Button
                                className="mt-4"
                                variant="contained"
                                color="secondary"
                                onClick={deleteUserProfile}
                            >
                                Delete Profile
                            </Button>
                            <Card elevation={2} className="p-3">
                                <Typography
                                    className="pt-10"
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    "The only Limit to our realization of
                                    tomorrow will be our doubts of today."
                                    <br />
                                    &nbsp; - Franklin D. Roosevelt
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </SimpleCard>
        </div>
    )
}

export default UserProfile
