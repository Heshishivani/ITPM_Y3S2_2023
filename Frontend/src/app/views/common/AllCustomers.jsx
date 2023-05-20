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
    InputBase,
    Grid,
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
    cusDataTable: {
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
    search: {
        width: 1000,
        backgroundColor: '#fff',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
    },
}))

export default function AllCustomers() {
    const [allCustomers, setAllCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const classes = useStyles()

    const getAllCustomers = async () => {
        setLoading(true)
        await Axios.get(BACKEND_API_ENDPOINT + 'users')
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data)
                    setAllCustomers(res.data)
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

    const exportPDF = () => {
        const doc = new jsPDF()
        doc.autoTable({ html: '#dataTable' })
        doc.save('table.pdf')
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    const deleteCustomer = (userId) => {
        Swal.fire({
            title: 'Are you sure you delete this customer?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#FF3D57',
        }).then(async (result) => {
            setLoading(true)
            if (result.isConfirmed) {
                await Axios.delete(BACKEND_API_ENDPOINT + 'user/' + userId)
                    .then((res) => {
                        if (res.status == 200 && res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Deleted!.',
                            }).then(() => {
                                getAllCustomers()
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

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure you delete this account?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#FF3D57',
        }).then(async (result) => {
            setLoading(true)
            if (result.isConfirmed) {
                await Axios.delete(BACKEND_API_ENDPOINT + 'users/delete/' + id)
                    .then((res) => {
                        if (res.status == 200 && res.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Deleted!.',
                            }).then(() => {
                                getAllCustomers()
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

    return (
        <div>
            <div className="m-sm-30">
                {loading ? (
                    <LoadingDialog size={24} />
                ) : (
                    <SimpleCard>
                        <Typography className="text-center" variant="h4">
                            All Customers
                        </Typography>
                        <div className="w-full overflow-auto">
                            <Card elevation={3} className="pt-5 mb-6">
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <InputBase
                                            fullWidth
                                            className={classes.search}
                                            placeholder="Search customers..."
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
                                <div className="overflow-auto">
                                    <Button
                                        onClick={exportPDF}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Generate Report
                                    </Button>
                                    <Table
                                        className={clsx(
                                            'whitespace-pre min-w-600',
                                            classes.cusDataTable
                                        )}
                                        id="dataTable"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="px-6">
                                                    Username
                                                </TableCell>
                                                <TableCell>FName</TableCell>
                                                <TableCell>LName</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allCustomers
                                                .filter((row) => {
                                                    if (searchTerm == '') {
                                                        return row
                                                    } else if (
                                                        row.name
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            ) ||
                                                        row.email
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            ) ||
                                                        row.role
                                                            .toLowerCase()
                                                            .includes(
                                                                searchTerm.toLowerCase()
                                                            )
                                                    ) {
                                                        return row
                                                    }
                                                })
                                                .map((cusData, index) => (
                                                    <TableRow key={index} hover>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            <div className="flex items-center">
                                                                <Avatar
                                                                    src={`data:image/jpeg;base64,${cusData.image}`}
                                                                />
                                                                <p className="m-0 ml-8">
                                                                    {
                                                                        cusData.name
                                                                    }
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {cusData.fname}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {cusData.lname}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {cusData.email}
                                                        </TableCell>
                                                        <TableCell
                                                            className="px-0 capitalize"
                                                            align="left"
                                                        >
                                                            {cusData.role}
                                                        </TableCell>
                                                        <TableCell className="px-0">
                                                            {/* view */}
                                                            <Tooltip
                                                                title="View"
                                                                arrow
                                                            >
                                                                <Link
                                                                    to={
                                                                        '/customers/view/' +
                                                                        cusData._id
                                                                    }
                                                                >
                                                                    <VisibilityIcon color="primary" />
                                                                </Link>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Delete"
                                                                arrow
                                                            >
                                                                <DeleteIcon
                                                                    color="error"
                                                                    onClick={() => {
                                                                        deleteUser(
                                                                            cusData._id
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
