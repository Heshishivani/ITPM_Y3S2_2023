import React, { useEffect, useState } from 'react'
import {
    Card,
    Icon,
    Grid,
    Divider,
    Typography,
    Tooltip,
} from '@material-ui/core'
import LoadingDialog from 'app/components/LoadingDialog/LoadingDialog'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'
import Axios from 'axios'
import Swal from 'sweetalert2'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    // Transition
    bodyContent: {
        opacity: 1,
        animation: '$customFade 1.3s linear',
    },
    '@keyframes customFade': {
        '0%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        },
    },

    imageBorder: {
        border: '2px solid rgba(var(--primary), 0.67)',
    },

    //progress loading icon
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

function ViewItem() {
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState({})
    const [selectedImg, setSelectedImg] = useState(true)
    const classes = useStyles()
    const params = useParams()

    const getItemData = async () => {
        setLoading(true)
        await Axios.get(BACKEND_API_ENDPOINT + 'items/' + params.id)
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data)
                    setSelectedImg(res.data.images[0])
                    setItem(res.data)
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
        getItemData()
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
                            className={classes.bodyContent}
                        >
                            <Grid item md={6} xs={12}>
                                <div className="flex-column justify-center items-center">
                                    <img
                                        className="max-w-full mb-4 max-h-400"
                                        src={`data:image/jpeg;base64,${selectedImg}`}
                                        alt="item"
                                    />
                                    <div className="flex justify-center items-center">
                                        {item.images.map((imgUrl) => (
                                            <img
                                                className={clsx({
                                                    'w-80 mx-2 p-2 border-radius-4': true,
                                                    [classes.imageBorder]:
                                                        selectedImg === imgUrl,
                                                })}
                                                src={`data:image/jpeg;base64,${imgUrl}`}
                                                alt="item"
                                                key={imgUrl}
                                                onClick={() =>
                                                    setSelectedImg(imgUrl)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <h4 className="mt-0 mb-4">
                                    {item.name}
                                </h4>
                                <p className="text-muted mt-0 mb-2">
                                    Item Code: {item.code}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    Item Category: {item.category}
                                </p>
                                <p className="text-muted mt-0 mb-2">
                                    Item Price: LKR {item.price}
                                </p>
                                <Divider className="my-4" />
                                <p className="text-muted mt-0 mb-2">
                                  Available Sizes
                                    {item.available_sizes.length > 0 &&
                                        item.available_sizes.map((size) => (
                                            <>
                                                {size == 'S' && (
                                                    <small className="m-1 border-radius-4 bg-primary text-white px-2 py-2px">
                                                        {size}
                                                    </small>
                                                )}
                                                {size == 'M' && (
                                                    <small className="m-1 border-radius-4 bg-secondary text-white px-2 py-2px">
                                                        {size}
                                                    </small>
                                                )}
                                                {size != 'S' && size != 'M' && (
                                                    <small className="m-1 border-radius-4 bg-error text-white px-2 py-2px">
                                                        {size}
                                                    </small>
                                                )}
                                            </>
                                        ))}
                                </p>
                                <p className="mt-0 mb-4">
                                    <span className="text-muted">
                                        Item Material:{' '}
                                    </span>
                                    <span className="text-primary">
                                        {item.material}
                                    </span>
                                </p>
                                <h4 className="mt-0 mb-4">Description</h4>
                                <p>{item.description}</p>
                            </Grid>
                        </Grid>
                    </Card>
                </>
            )}
        </div>
    )
}

export default ViewItem
