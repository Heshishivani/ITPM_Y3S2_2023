import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import StarIcon from '@material-ui/icons/StarBorder'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CarousalSlider from './CarousalSlider'
import Axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'
import Swal from 'sweetalert2'
import LoadingDialog from 'app/components/LoadingDialog/LoadingDialog'
import { CardMedia } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}))

export default function Pricing() {
    const classes = useStyles()
    const [itemData, setItemData] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllItems = async () => {
        setLoading(true)
        await Axios.get(BACKEND_API_ENDPOINT + 'items')
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data)
                    setItemData(res.data)
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

    const navigateToViewOrder = (id) => {
        window.location.href = "/items/view/"+id
    }

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <>
            {loading ? (
                <LoadingDialog size={24} />
            ) : (
                <div>
                    <Card className="p-10 m-2" elevation={2}>
                        <CssBaseline />
                        <div>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography
                                        className="text-center mb-5"
                                        variant="h4"
                                    >
                                        TredEco Fashion
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <CarousalSlider />
                                </Grid>
                            </Grid>
                            <Grid container className="mt-10 mb-5">
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography variant="h6">
                                        Popular Items
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems="flex-end">
                                {itemData.map((product) => (
                                    <Grid
                                        item
                                        key={product.name}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                    >
                                        <Card
                                            elevation={5}
                                            className="hover-bg-secondary"
                                            onClick={() =>
                                                navigateToViewOrder(product._id)
                                            }
                                        >
                                            <CardHeader
                                                title={product.name}
                                                subheader={product.code}
                                                titleTypographyProps={{
                                                    align: 'center',
                                                }}
                                                subheaderTypographyProps={{
                                                    align: 'center',
                                                }}
                                            />
                                            <CardMedia
                                                className={classes.media}
                                                image={`data:image/jpeg;base64,${product.images[0]}`}
                                                title="itm img"
                                            />
                                            <CardContent>
                                                <Typography
                                                    className="text-center"
                                                    component="h2"
                                                    variant="h6"
                                                    color="error"
                                                >
                                                    LKR {product.price}.00
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        navigateToViewOrder(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    View
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Card>
                </div>
            )}
        </>
    )
}
