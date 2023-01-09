import { BottomNavigation, BottomNavigationAction, Box, Button, DialogActions, DialogContent, Grid, MenuItem, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link as RouteLink } from "react-router-dom"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Modal } from '../../components/Modal/Modal';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AdminCard } from '../../components/AdminCard/AdminCard';


export const Products = () => {
    
    const [value, setValue] = useState(1);
    const [categorys, setCategorys] = useState([]);
    const [products, setProducts] = useState([]);
    const [productModal, setProductModal] = useState(false);
    const [productModalEdit, setProductModalEdit] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [editModalId, setEditModalId] = useState(-1);


    const schema = Yup.object({
        product_img: Yup.string().url("Invalid Format").required("Required"),
        product_title: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        category_id: Yup.string().required("Required"),
    });

    const { register, handleSubmit, formState:{ errors, isValid } } = useForm({
        mode: "onBlur",
        defaultValues: {
            product_img: "",
            product_title: "",
            price: "",
            category_id: "",
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        axios.get("http://localhost:8080/category").then(data => {
            if(data.status === 200){
                setCategorys(data.data)
            }
        }).catch(err => console.log(err))
    }, []);
    useEffect(() => {
        axios.get("http://localhost:8080/products").then(data => {
            if(data.status === 200){
                setProducts(data.data)
                console.log(data);
                setIsChanged(false);
            }
        }).catch(err => console.log(err))
    }, [isChanged]);

    const productPost = (data) => {
        axios.post("http://localhost:8080/products", data).then(res => res.status === 201 ? (
            setProductModal(false),
            setIsChanged(true),
            console.log(res)
        ) : "").catch(err => console.log(err))
    };

    const productEdit = (data) => {
        axios.put(`http://localhost:8080/products/${editModalId}`, data).then(res => {
            setProductModalEdit(false);
            setIsChanged(true);
            setEditModalId(-1);
            console.log(res)
        }).catch(err => console.log(err))
    }


    function TabPanel({children, value, index, ...other}) {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(Number(event.target.attributes.tabindex.nodeValue));
        // console.log(newValue);
    };


    const hendelDeleteProduct = (id) => {
        axios.delete(`http://localhost:8080/products/${id}`).then(data => {
            setIsChanged(true);
        }).catch(err => console.log(err))
    }
    return<>
        <Button type='button' onClick={() => {
            setProductModal(true)
        }} variant='contained' endIcon={<AddCircleIcon />}>
            Add Product
        </Button>
        <Box sx={{ width: '100%', marginTop: "20px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} 
                onChange={handleChange}
                >
                    {categorys.map(item => <Tab label={item.category_name} value={item.id} tabIndex={item.id} {...a11yProps(item.id)} />)}
                </Tabs>
            </Box>

            {categorys.map(item => (
                <TabPanel  value={value} index={item.id}>
                    <Grid container spacing={2}>
                        {products.map(item => {
                            if(value === Number(item.category_id)){
                                return <Grid item xs={3}>
                                    <AdminCard obj={item} deleteFn={hendelDeleteProduct} setEditModal={setProductModalEdit} setEditModalId={setEditModalId}/>
                                </Grid>
                            }
                        })}
                    </Grid>
                </TabPanel>
            ))}
        </Box>
        <Modal modal={productModal} setModal={setProductModal} title="Add Product">
            <form onSubmit={handleSubmit(productPost)}>
                <DialogContent dividers>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="url" label="Image Url" helperText={errors.product_img?.message} {...register("product_img")}/>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="text" label="Product Name" helperText={errors.product_title?.message} {...register("product_title")}/>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="number"label="Product Price" helperText={errors.price?.message} {...register("price")}/>
                    <TextField
                        sx={{width: "100%"}}
                        select
                        helperText={errors.category_id?.message}
                        label="Category"
                        {...register('category_id')}
                    >
                        {categorys.map(item => <MenuItem value={item.id}>{item.category_name}</MenuItem>)}
                    </TextField>
                </DialogContent>
                <DialogActions>                    
                    <Button type="submit" variant='contained' color="success">Add</Button>
                </DialogActions>
            </form>
        </Modal>
        
        <Modal modal={productModalEdit} setModal={setProductModalEdit} title="Edit Product">
            <form onSubmit={handleSubmit(productEdit)}>
                <DialogContent dividers>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="url" label="Image Url" helperText={errors.product_img?.message} {...register("product_img")}/>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="text" label="Product Name" helperText={errors.product_title?.message} {...register("product_title")}/>
                    <TextField sx={{width: "100%", marginBottom: "20px"}} type="number"label="Product Price" helperText={errors.price?.message} {...register("price")}/>
                    <TextField
                        sx={{width: "100%"}}
                        select
                        helperText={errors.category_id?.message}
                        label="Category"
                        {...register('category_id')}
                    >
                        {categorys.map(item => <MenuItem value={item.id}>{item.category_name}</MenuItem>)}
                    </TextField>
                </DialogContent>
                <DialogActions>                    
                    <Button type="submit" variant='contained' color="warning">Edit</Button>
                </DialogActions>
            </form>
        </Modal>
    </>
}
