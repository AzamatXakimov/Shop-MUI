import React, { useContext } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { Badge, Divider, Drawer, List, Stack } from "@mui/material";
import {Modal} from "../../components/Modal/Modal"
import { Link as RouteLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MeContext } from "../../context/MeContext";
import { CartCard } from "../CartCard/CartCard";
import { useCart } from "react-use-cart"
import axios from 'axios';

export const Header = () => {

    const navigate = useNavigate()
    const pages = ['Products', 'Pricing', 'Blog'];
    const { totalItems, items, cartTotal, emptyCart } = useCart()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [orderModalPost, setOrderModalPost] = React.useState(false);

        
    const {token, setToken} = useContext(AuthContext)
    const {me} = useContext(MeContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
        sx={{ width: "400px", height: "100vh", paddingX: "20px", paddingBottom: "50px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box>
                <Typography my={"25px"} variant="h4" component="h2">Orders</Typography>
                <Divider />
                
                {totalItems < 1 ? <Typography variant="h5" component="h3">Empty</Typography> : (
                    <List sx={{height: "100%", overflowY: "scroll"}}>
                        {items.map(element => <CartCard obj={element} />)}
                    </List>
                )}
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" color="error" onClick={() => {
                    emptyCart()
                }}>Clear cart</Button>
                <Button variant="contained" color="success" onClick={() => {
                    setOrderModalPost(true)
                }}>Order</Button>
                <Typography variant="body2">Total: {cartTotal} $</Typography>
            </Stack>
        </Box>
    );

    const handelOrdersPost = () => {
        axios.post("http://localhost:8080/order", {
            user_name: me.firstName,
            user_lastName: me.lastName,
            user_email: me.email,
            user_orders: items,
            total: cartTotal,
            user_id: me.id,
        }).then(res => res.status === 201 ? (
            setOrderModalPost(false),
            console.log(res)
        ) : "").catch(err => console.log(err))
    }

    return <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        onClick={(evt) => {
                            evt.preventDefault()
                            navigate("/")
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '0.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            bacgroundColor: "transperent"
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} >
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        href="#"
                        onClick={(evt) => {
                            evt.preventDefault()
                            navigate("/")
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {['left'].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <Badge badgeContent={totalItems} color="error">
                            {/* <MailIcon color="action" /> */}
                                <IconButton onClick={toggleDrawer(anchor, true)} aria-label="order">
                                    <ShoppingCartIcon />
                                </IconButton>    
                            </Badge>
                            <Drawer
                                anchor={anchor}
                                open={state[anchor]}
                                onClose={toggleDrawer(anchor, false)}
                            >
                                {list(anchor)}
                            </Drawer>
                            </React.Fragment>
                        ))}  
                        <Box sx={{marginLeft: "20px", display: "inline"}}>
                            {token ? <Tooltip  title="Open settings">
                                <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar>{`${me.firstName[0]}${me.lastName[0]}`}</Avatar>
                                </IconButton>
                            </Tooltip> : <></>}                   
                        </Box>
                        
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Button component={RouteLink} to="/admin">Admin</Button>
                                </MenuItem>
                                <MenuItem key={"LogOut"} onClick={handleCloseUserMenu}>
                                    <Button  component="button" onClick={() => {
                                        setToken("")
                                    }}>Log Out</Button>
                                </MenuItem>
                        </Menu>

                        <Button type="button" sx={{marginLeft: "20px",}} onClick={() => {
                            navigate("/login")
                        }} variant="contained">Login</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

        <Modal modal={orderModalPost} setModal={setOrderModalPost} title="Are you sure?">
            <Stack direction="row" spacing={3} sx={{padding: "20px"}}>
                <Button variant="contained" color="error" onClick={() => {
                    setOrderModalPost(false)
                }}>NO</Button>
                <Button variant="contained" color="success" onClick={() => {
                    handelOrdersPost()
                }}>YES</Button>
            </Stack>
        </Modal>
    </>
}
