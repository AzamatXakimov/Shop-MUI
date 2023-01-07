import { Box, Link, List, ListItem, ListItemButton, Typography } from '@mui/material'
import React from 'react'
import { Link as RouteLink, Route, Routes} from "react-router-dom"
import { Category } from "../category/Category"
import { Products } from '../Products/Products'
export const Admin = () => {
    return<>
        <Box sx={{display: "flex"}}>
            <Box
            sx={{bgcolor: 'background.paper' }}
            >
                <List
                    sx={{width: "250px", height: "100vh", overflowY:"scroll", backgroundColor: "#272727"}}
                >
                    <ListItem  component="div" disablePadding>
                        <ListItemButton>
                            <Link component={RouteLink} to="/" variant='h4' sx={{textDecoration: "none", color: "#fff"}}>
                                Logo
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem  component="div" disablePadding>
                        <ListItemButton>
                            <Link component={RouteLink} to="/admin">
                                Category
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem  component="div" disablePadding>
                        <ListItemButton>
                            <Link component={RouteLink} to="products">
                                Products
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem  component="div" disablePadding>
                        <ListItemButton>
                            <Link component={RouteLink} to="orders">
                                Orders
                            </Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{width: "100%"}}>
                <Box sx={{width: "100%", padding: "25px", backgroundColor: "#272727"}}>
                    <Typography variant="h5">Header</Typography>
                </Box>
                <Box sx={{padding: "25px"}}>
                    <Routes>
                        <Route index element={<Category/>}/>
                        <Route path='products' element={<Products/>}/>
                        {/* <Route path='orders' element={</>}/> */}
                    </Routes>
                </Box>
            </Box>
        </Box>
    </>
}
