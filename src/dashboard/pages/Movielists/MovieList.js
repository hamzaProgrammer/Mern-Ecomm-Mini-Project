import React , {useState , useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box  , Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {makeStyles} from '@mui/styles'
import {getAllusers , delUser} from '../../../server_api/Api'



const useStyles = makeStyles((theme) => ({
    image : {
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
    deleteBtn : {
        marginLeft: '20px',
        color: 'red',
        cursor: 'pointer'
    }
}))
const ProductList = () => {
    const classes = useStyles();
    const [ moviesLists , setMoviesLists ] = useState([])
    const columns = [
        {field: "_id" , headerName: 'ID', width: '250'},
        {
            field: 'username',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteIcon
                            className={classes.deleteBtn}
                            onClick= { () => handleDelete(params.row._id)}
                        />
                    </>
                )
            }
        }
    ];

    // deleting Movie
    const handleDelete = async (id) => {
        try {
            await delUser(id)
        } catch (error) {
            console.log("Error is : ", error)
        }
    }

    // for showing Movies in Table Grid
    useEffect(() => {
        const getMovies = async () => {
            try {
                const { data } = await getAllusers();
                setMoviesLists(data?.allFriends)
            } catch (error) {
                console.log("Error is : ",error)
            }
        }
        getMovies();
    }, [moviesLists])

    return (
        <>
            <Box>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={moviesLists}
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

export default ProductList
