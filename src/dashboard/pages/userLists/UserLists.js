import React , { useState , useEffect } from 'react'
import { DataGrid  } from '@mui/material/data-grid';
import { Box  , Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchNewUsers , deleteUser } from '../../../server_api/Api'
import {makeStyles} from '@mui/styles'


const useStyles = makeStyles((theme) => ({
    avatar : {
        display : 'flex',
    },
    userImage : {
        width:'32px',
        height: '32px',
        borderRadius: '50%',
        objectFit:'cover',
        marginRight:'10px',
        marginTop: '10px'
    },
    deleteBtn: {
        marginLeft: '20px',
        color: 'red'
    }
}))
const UserLists = () => {
    const classes = useStyles();
    const [ allUsers , setAllusers ] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await fetchNewUsers();
            console.log(data.allUsers)
            setAllusers(data?.allUsers)
        }
        getUsers();
    }, [])

    const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
        field: 'username',
        headerName: 'UserName',
        width: 200,
        renderCell: (params) => {
            return (
                <Box className={classes.avatar} >
                    <img className={classes.userImage} src={params.row.profilePic} alt="User Cover" />
                    {params.row.username}
                </Box>
            )
        }
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        editable: true,
    },
    {
        field: 'action',
        headerName: 'Action',
        width: 250,
        renderCell: (params) => {
            return (
                <>
                    <Button  variant = "contained"
                    color = "primary"
                    size = "small"
                     >
                        Edit
                    </Button>
                    <DeleteIcon
                        className={classes.deleteBtn}
                        onClick= { () => handleDelete(params.row._id)}
                    />
                </>
            )
        }
    }
    ];

    // deleting User
    const handleDelete = async (id) => {
        try {
            await deleteUser(id)
        } catch (error) {
            console.log("Error is : ", error)
        }
    }


    return (
        <>
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={allUsers}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                        getRowId={r=>r._id}
                    />
                </div>
            </Box>
        </>
    )
}

export default UserLists
