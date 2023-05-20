import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import history from 'history.js'
import Swal from 'sweetalert2'
import { Label } from '@material-ui/icons'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const [state, setState] = useState({})
    const [attachment, setAttachmentData] = useState(null)
    const classes = useStyles()
    const { register } = useAuth()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            let baseImg = attachment ? attachment : ''
            // console.log(baseImg);
            await register(
                state.name,
                state.email,
                state.password,
                'CUSTOMER',
                baseImg,
                state.fName,
                state.lName
            )
            history.push('/')
        } catch (e) {
            console.log(e)
            setMessage('Error!')
            setLoading(false)
        }
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
                    text: "Error: Can't Upload More Than 1 File.",
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
            setAttachmentData(values[0])
        })
    }

    let { name, email, password, agreement, fName, lName } = state

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography className="m-5 text-center" variant="h4">
                            TredEcho User Registration
                        </Typography>
                    </Grid>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                            <img className="w-full" src="/logo.png" alt="" />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Username"
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    value={name || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="fName"
                                    value={fName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Last Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lName"
                                    value={lName || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-4 w-full"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />

                                <Typography variant="p">
                                    Profile Picture
                                </Typography>
                                <input
                                    className="mb-4 w-full"
                                    id="upload-multiple-file"
                                    type="file"
                                    onChange={handleFileUpload}
                                    name="attachment"
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex items-center">
                                    <Button
                                        className="capitalize"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Sign up
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </Button>
                                    <span className="mx-2 ml-5">or</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
                                            Sign in
                                        </Button>
                                    </Link>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtRegister
