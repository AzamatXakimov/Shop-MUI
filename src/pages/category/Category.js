import { Box, Button, DialogActions, DialogContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from "../../components/Modal/Modal"
import axios from 'axios';
import { Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export const Category = () => {
    
    const [categoryModal, SetCategoryModal] = useState(false);
    const [changeCategoryId, setChangeCategoryId] = useState(-1);
    const [changeCategoryModal, setChangeCategoryModal] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const CategoryInputRef = useRef();
    const [categorys, setCategorys] = useState([])
    const [products, setProducts] = useState([])

    const hendelSubmit = (evt) => {
        evt.preventDefault()
        axios.post("http://localhost:8080/category", {
            category_name: CategoryInputRef.current.value,
        }).then(data => data.status === 201 ? (
            SetCategoryModal(false),
            setIsChanged(true)
        ) : "").catch(err => console.log(err))
    };


    const changeCategory = (id) => {
        axios.put(`http://localhost:8080/category/${id}`, {
            category_name: CategoryInputRef.current.value,
        }).then(data => data.status === 200 ? (
            setChangeCategoryModal(false),
            setChangeCategoryId(-1),
            setIsChanged(true)
        ) : "").catch(err => console.log(err))
    }

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:8080/category/${id}`).then(data => data.status === 200 ? setIsChanged(true) : "").catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8080/category").then(data => {
            if(data.status === 200){
                setCategorys(data.data)
                setIsChanged(false)
            }
        }).catch(err => console.log(err))
    }, [isChanged])
    
    useEffect(() => {
        axios.get("http://localhost:8080/products").then(data => {
            if(data.status === 200){
                setProducts(data.data)
                console.log(data);
            }
        }).catch(err => console.log(err))
    }, []);

    const haveProduct = new Map();
    
    categorys.map(item => {
        const isTrue = products.findIndex(element => Number(element.category_id) === item.id) > -1 ? true : false
        haveProduct.set(item.id, isTrue);    
    })

    console.log(haveProduct.get(1));

    return <>
        <Box>
            <Button type='button' onClick={() => {
                SetCategoryModal(true)
            }} variant='contained' endIcon={<AddCircleIcon />}>
                Add Category
            </Button>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "272727"}}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Category name</TableCell>
                            <TableCell>Category actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categorys.map(item => (
                                <TableRow>
                                    <TableCell>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>
                                        {item.category_name}
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={2}>
                                            <IconButton onClick={() => {
                                                setChangeCategoryId(item.id);
                                                setChangeCategoryModal(true)
                                            }} color='warning'>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                            // disabled={knowProduct(item.id)} 
                                            disabled={haveProduct.get(item.id)} 
                                            onClick = {() => {
                                                deleteCategory(item.id)
                                            }} color="error">
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal modal={categoryModal} setModal={SetCategoryModal} title="Add Category">
                <form onSubmit={hendelSubmit}>
                    <DialogContent dividers>
                        <TextField sx={{width: "450px"}} type="text" inputRef={CategoryInputRef} label="Category name"/>
                    </DialogContent>
                    <DialogActions>                    
                        <Button type="submit" variant='contained' color="success">Add</Button>
                    </DialogActions>
                </form>
            </Modal>
            <Modal modal={changeCategoryModal} setModal={setChangeCategoryModal} title="Change Category">
                <form onSubmit={(evt) => {
                    evt.preventDefault()
                    changeCategory(changeCategoryId)
                }}>
                    <DialogContent dividers>
                        <TextField sx={{width: "450px"}} type="text" inputRef={CategoryInputRef} label="Category name"/>
                    </DialogContent>
                    <DialogActions>                    
                        <Button type="submit" variant='contained' color="warning">Edit</Button>
                    </DialogActions>
                </form>
            </Modal>
        </Box>
    </>
}
