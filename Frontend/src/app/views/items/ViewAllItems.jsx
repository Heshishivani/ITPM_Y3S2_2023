import React, { useEffect, useState } from 'react'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
    Typography,
    Tooltip,
    Button,
    Grid,
    InputBase,
} from '@material-ui/core'
import { SimpleCard } from 'app/components'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import Axios from 'axios'
import { BACKEND_API_ENDPOINT } from 'app/services/AppConst'
import Swal from 'sweetalert2'
import LoadingDialog from 'app/components/LoadingDialog/LoadingDialog'

import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    productTable: {
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-child': {
            paddingLeft: '16px !important',
        },
    },
}))

export default function ViewAllItems() {
    const [itemData, setItemData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const classes = useStyles()

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

    const deleteItem = (itemId) => {
        Swal.fire({
            title: 'Are you sure you delete this item?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#FF3D57',
        }).then(async (result) => {
            setLoading(true)
            if (result.isConfirmed) {
                await Axios.delete(BACKEND_API_ENDPOINT + 'items/' + itemId)
                    .then((res) => {
                        if (res.status == 200 && res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Deleted!.',
                            }).then(() => {
                                getAllItems()
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
            setLoading(false)
        })
    }

    const exportPDF = () => {
        const unit = 'pt'
        const size = 'A4'
        const orientation = 'portrait'

        const marginLeft = 40
        const doc = new jsPDF(orientation, unit, size)

        doc.setFontSize(15)

        const title = 'Items Report'
        const headers = [['Number', 'Name', 'Category', 'Price', 'Material']]

        const data = itemData.map((itm) => [
            itm.code, 
            itm.name,
            itm.category,
            itm.price,
            itm.material,
        ])

        let content = {
            startY: 50,
            head: headers,
            body: data,
        }

        doc.text(title, marginLeft, 40)
        doc.autoTable(content)
        doc.save('report.pdf')
    }

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <div>
            <div className="m-sm-30">
                {loading ? (
                    <LoadingDialog size={24} />
                ) : (
                    <SimpleCard>
                        <Typography className="text-center" variant="h4">
                            All Items
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <InputBase
                                    fullWidth
                                    placeholder="Search items..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>

                        <div className="w-full overflow-auto">
                            <Card elevation={3} className="pt-5 mb-6">
                                <div className="overflow-auto">
                                    <Button
                                        onClick={exportPDF}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Generate Report
                                    </Button>
                                    <Table
                                        id="dataTable"
                                        className={clsx(
                                            'whitespace-pre min-w-600',
                                            classes.productTable
                                        )}
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    className="px-6"
                                                    colSpan={2}
                                                >
                                                    Name
                                                </TableCell>
                                                <TableCell>Code</TableCell>
                                                <TableCell>Category</TableCell>
                                                <TableCell colSpan={1}>
                                                    Price
                                                </TableCell>
                                                <TableCell>
                                                    Available Sizes
                                                </TableCell>
                                                <TableCell>Material</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {itemData
                                                .filter((row) => {
                                                    if (searchTerm == '') {
                                                        return row
                                                    } else if (
                                                        row.code
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            ) ||
                                                        row.name
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            ) ||
                                                        row.category
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            )
                                                    ) {
                                                        return row
                                                    }
                                                })
                                                .map((product, index) => (
                                                    <TableRow key={index} hover>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                            colSpan={2}
                                                        >
                                                            <div className="flex items-center">
                                                                <Avatar
                                                                    src={`data:image/jpeg;base64,${product.images[0]}`}
                                                                />
                                                                <p className="m-0 ml-8">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {product.code}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {product.category}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                            colSpan={1}
                                                        >
                                                            LKR{' '}
                                                            {product.price > 999
                                                                ? (
                                                                      product.price /
                                                                      1000
                                                                  ).toFixed(1) +
                                                                  'k'
                                                                : product.price}
                                                        </TableCell>

                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {product.material}
                                                        </TableCell>

                                                        <TableCell
                                                            className="px-0"
                                                            align="left"
                                                        >
                                                            {product
                                                                .available_sizes
                                                                .length > 0 &&
                                                                product.available_sizes.map(
                                                                    (size) => (
                                                                        <>
                                                                            {size ==
                                                                                'S' && (
                                                                                <small className="m-1 border-radius-4 bg-primary text-white px-2 py-2px">
                                                                                    {
                                                                                        size
                                                                                    }
                                                                                </small>
                                                                            )}
                                                                            {size ==
                                                                                'M' && (
                                                                                <small className="m-1 border-radius-4 bg-secondary text-white px-2 py-2px">
                                                                                    {
                                                                                        size
                                                                                    }
                                                                                </small>
                                                                            )}
                                                                            {size !=
                                                                                'S' &&
                                                                                size !=
                                                                                    'M' && (
                                                                                    <small className="m-1 border-radius-4 bg-error text-white px-2 py-2px">
                                                                                        {
                                                                                            size
                                                                                        }
                                                                                    </small>
                                                                                )}
                                                                        </>
                                                                    )
                                                                )}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0"
                                                            colSpan={1}
                                                        >
                                                            {/* view */}
                                                            <Tooltip
                                                                title="View"
                                                                arrow
                                                            >
                                                                <Link
                                                                    to={
                                                                        '/items/view/' +
                                                                        product._id
                                                                    }
                                                                >
                                                                    <VisibilityIcon color="primary" />
                                                                </Link>
                                                            </Tooltip>
                                                            {/* Edit */}
                                                            <Tooltip
                                                                title="Edit"
                                                                arrow
                                                            >
                                                                <Link
                                                                    to={
                                                                        '/items/edit/' +
                                                                        product._id
                                                                    }
                                                                >
                                                                    <SettingsIcon color="secondary" />
                                                                </Link>
                                                            </Tooltip>
                                                            {/* delete */}
                                                            <Tooltip
                                                                title="Delete"
                                                                arrow
                                                            >
                                                                <DeleteIcon
                                                                    color="error"
                                                                    onClick={() => {
                                                                        deleteItem(
                                                                            product._id
                                                                        )
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Card>
                        </div>
                    </SimpleCard>
                )}
            </div>
        </div>
    )
}
