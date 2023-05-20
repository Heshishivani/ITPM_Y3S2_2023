import { Button, Card, Grid, Snackbar, Typography } from '@material-ui/core'

import { Alert, Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import React, { useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { BACKEND_API_ENDPOINT } from '../../services/AppConst'
import LoadingDialog from '../../components/LoadingDialog/LoadingDialog'
import Swal from 'sweetalert2'
import useAuth from 'app/hooks/useAuth'

function AddNewItem() {
    const [loading, setLoading] = useState(false)
    const [formKey, setFormKey] = useState(false)
    const { user } = useAuth()

    //data
    const [itemInfo, setItemInfo] = useState({})
    const [attachmentData, setAttachmentData] = useState([])

    const handleChange = (e) => {
        var name = e.target.name
        var value = e.target.value
        let temp = { ...itemInfo }
        temp[name] = value
        setItemInfo(temp)
    }

    const handleFormSubmit = async () => {
        if (attachmentData.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please Add Images.',
            })
        } else {
            itemInfo['images'] = attachmentData
            setLoading(true)
            await axios
                .post(BACKEND_API_ENDPOINT + 'items', itemInfo)
                .then((res) => {
                    setLoading(false)
                    if (res.status == 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Item Saved Success!',
                        }).then((d1) => {
                            window.location.reload(false)
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Error',
                        })
                        setFormKey(!formKey)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                    setFormKey(!formKey)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Error',
                    })
                })
        }
    }

    const handleFileUpload = (event) => {
        event.persist()
        var files = []
        if (event.target.files[0] !== undefined) {
            if (event.target.files.length < 3) {
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
                    text: "Error: Can't Upload More Than 2 Files.",
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

    return (
        <div>
            {loading ? (
                <LoadingDialog />
            ) : (
                <div>
                    <ValidatorForm
                        onSubmit={() => handleFormSubmit()}
                        key={formKey}
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
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Typography
                                        className="mt-5"
                                        variant="h5"
                                        style={{ textAlign: 'center' }}
                                    >
                                        Add New Item
                                    </Typography>
                                </Grid>
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
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextValidator
                                                className="w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Code"
                                                helperText="Item Code"
                                                onChange={handleChange}
                                                value={itemInfo.code}
                                                type="text"
                                                name="code"
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextValidator
                                                className="w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Name"
                                                helperText="Item Name"
                                                onChange={handleChange}
                                                value={itemInfo.name}
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
                                            lg={3}
                                            md={3}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextValidator
                                                className="w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Price"
                                                helperText="Item Price"
                                                onChange={handleChange}
                                                value={itemInfo.price}
                                                type="number"
                                                name="price"
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextValidator
                                                className="w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Material"
                                                helperText="Item Material"
                                                onChange={handleChange}
                                                value={itemInfo.material}
                                                type="text"
                                                name="material"
                                                validators={['required']}
                                                errorMessages={[
                                                    'This field is required',
                                                ]}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Autocomplete
                                                className="w-full"
                                                options={[
                                                    'S',
                                                    'M',
                                                    'L',
                                                    'XL',
                                                    'XXL',
                                                ]}
                                                getOptionLabel={(opt) => opt}
                                                name="Available Sizes"
                                                size="small"
                                                multiple
                                                value={itemInfo.available_sizes}
                                                onChange={(e, v) => {
                                                    itemInfo[
                                                        'available_sizes'
                                                    ] = v
                                                    setItemInfo(itemInfo)
                                                }}
                                                renderInput={(params) => (
                                                    <TextValidator
                                                        {...params}
                                                        variant="outlined"
                                                        label="Available Sizes"
                                                        value={
                                                            itemInfo.available_sizes
                                                        }
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'This field is required!',
                                                        ]}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Autocomplete
                                                className="w-full"
                                                options={[
                                                    'Kids',
                                                    'Gents',
                                                    'Women',
                                                    'Other',
                                                ]}
                                                getOptionLabel={(opt) => opt}
                                                name="Category"
                                                size="small"
                                                value={itemInfo.category}
                                                onChange={(e, v) => {
                                                    itemInfo['category'] = v
                                                    setItemInfo(itemInfo)
                                                }}
                                                renderInput={(params) => (
                                                    <TextValidator
                                                        {...params}
                                                        variant="outlined"
                                                        label="Category"
                                                        value={
                                                            itemInfo.category
                                                        }
                                                        validators={[
                                                            'required',
                                                        ]}
                                                        errorMessages={[
                                                            'This field is required!',
                                                        ]}
                                                    />
                                                )}
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
                                                className="mb-4 w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Description"
                                                helperText="Item Description"
                                                onChange={handleChange}
                                                value={itemInfo.description}
                                                type="text"
                                                multiline
                                                rows={5}
                                                name="description"
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
                                                Item Images
                                            </Typography>
                                            <input
                                                className="mb-t w-full"
                                                id="upload-multiple-file"
                                                type="file"
                                                onChange={handleFileUpload}
                                                value={itemInfo.attachment}
                                                multiple
                                                name="attachment"
                                            />

                                            <div className="text-right">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    disabled={loading}
                                                    type="submit"
                                                >
                                                    Save Item
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </ValidatorForm>
                </div>
            )}
        </div>
    )
}

export default AddNewItem
