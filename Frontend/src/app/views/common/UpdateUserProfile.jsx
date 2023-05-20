import React, { useEffect, useState } from 'react'
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
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Swal from 'sweetalert2'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'
import Axios from 'axios'

const UpdateUserProfile = () => {
    const [loading, setLoading] = useState(true)
    const { user, logout } = useAuth()

    //data
    const [customerInfo, setCustomerInfo] = useState({})
    const [attachmentData, setAttachmentData] = useState([])

    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        let temp = { ...customerInfo }
        temp[name] = value
        setCustomerInfo(temp)
    }

    const handleFileUpload = (event) => {
        event.persist()
        var files = []
        if (event.target.files[0] !== undefined) {
            if (event.target.files.length < 2) {
                for (let j = 0; j < event.target.files.length; j++) {
                    let file = event.target.files[j]
                    if (file.size > 10000000) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'For each file size must be less than 10MB.',
                        })
                        files = []
                        break
                    } else if (
                        file.type == 'image/jpeg' ||
                        file.type == 'image/jpg' ||
                        file.type == 'image/png'
                    ) {
                        files.push(file)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Please Upload Only jpeg/png Type Images.',
                        })

                        files = []
                        break
                    }
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: "Error: Can't Upload More Than 1 Files.",
                })
                files = []
            }
        }

        covertImagesToBase64(files)
    }

    const covertImagesToBase64 = (files) => {
        // Convert images to base 64
        let promises = []
        files.forEach((imageFile) => {
            const promise = new Promise((resolve, reject) => {
                let base64String = null
                var reader = new FileReader()
                reader.readAsDataURL(imageFile)
                reader.onload = function () {
                    base64String = reader.result.split('base64,')[1]
                    resolve(base64String)
                    // images_arr.push(base64String.toString())
                }
                reader.onerror = function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Error Image Conversion.',
                    })
                    reject('')
                }
            })
            promises.push(promise)
        })

        Promise.all(promises).then((values) => {
            setAttachmentData(values)
        })
    }

    const handleFormSubmit = async (id) => {
        setLoading(true)
        if (attachmentData.length > 0) {
            customerInfo['image'] = attachmentData
        }

        await Axios.put(BACKEND_API_ENDPOINT + 'users/edit/' + user._id, customerInfo)
            .then((res) => {
                setLoading(false)
                if (res.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Profile Updated Successfully!',
                    }).then((d1) => {
                        window.location.reload(false)
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
                setLoading(false)
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error',
                })
            })
    }

    useEffect(() => {
        setCustomerInfo(user)
    }, [])

    return (
        <div className="analytics m-sm-30">
            <SimpleCard>
                <Typography className="text-center" variant="h4">
                    Update User Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <img
                            src="/assets/images/editUser.jpg"
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
                        <ValidatorForm
                            onSubmit={() => handleFormSubmit(customerInfo._id)}
                        >
                            <Grid
                                container
                                alignContent="center"
                                justifyContent="center"
                                direction="column"
                                className="m-5"
                                style={{ maxWidth: '1200px' }}
                            >
                                <Card elevation={3}>
                                    <Grid
                                        item
                                        lg={12}
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        style={{
                                            padding: '20px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={2}
                                            alignContent="center"
                                        >
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                    }}
                                                    src={`data:image/jpeg;base64,${customerInfo.image}`}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <TextValidator
                                                    className="w-full mt-5"
                                                    variant="outlined"
                                                    size="small"
                                                    helperText="Username"
                                                    onChange={handleChange}
                                                    value={customerInfo.name}
                                                    type="text"
                                                    name="name"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <TextValidator
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    helperText="First Name"
                                                    onChange={handleChange}
                                                    value={customerInfo.fname}
                                                    type="text"
                                                    name="fname"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <TextValidator
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    helperText="Last Name"
                                                    onChange={handleChange}
                                                    value={customerInfo.lname}
                                                    type="text"
                                                    name="lname"
                                                    validators={['required']}
                                                    errorMessages={[
                                                        'This field is required',
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <TextValidator
                                                    className="w-full"
                                                    variant="outlined"
                                                    size="small"
                                                    helperText="Email"
                                                    onChange={handleChange}
                                                    value={customerInfo.email}
                                                    type="text"
                                                    name="email"
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                lg={12}
                                                md={12}
                                                sm={12}
                                                xs={12}
                                            >
                                                <Typography variant="p">
                                                    User Avatar
                                                </Typography>
                                                <input
                                                    className="mb-t w-full"
                                                    id="upload-multiple-file"
                                                    type="file"
                                                    onChange={handleFileUpload}
                                                    value={
                                                        customerInfo.attachment
                                                    }
                                                    name="attachment"
                                                />

                                                <div className="text-right">
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        type="submit"
                                                    >
                                                        Update User
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </SimpleCard>
        </div>
    )
}

export default UpdateUserProfile
