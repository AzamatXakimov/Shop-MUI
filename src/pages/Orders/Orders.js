import { Accordion, AccordionDetails, AccordionSummary, List, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { OrderCartCard } from '../../components/CartCard/CartCard';

export const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/order").then(data => {
            if(data.status === 200){
                setOrders(data.data)
                console.log(data);
            }
        }).catch(err => console.log(err))
    }, []);

    return <>
        <Box>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "272727"}}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User_ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>User Email</TableCell>
                            <TableCell>Orders</TableCell>
                            <TableCell>Total price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(item => (
                            <TableRow>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell>
                                    {item.user_id}
                                </TableCell>
                                <TableCell>
                                    {item.user_name} {item.user_lastName}
                                </TableCell>
                                <TableCell>
                                    {item.user_email}
                                </TableCell>
                                <TableCell>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                            <Typography>Orders</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <List>
                                            {item.user_orders?.map(element => <OrderCartCard obj={element} />)}
                                        </List>
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                                <TableCell>
                                    {item.total} $
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    </>
}
