import { Avatar, Box, Button, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useCart } from "react-use-cart"

export const CartCard = ({obj}) => {
    const { updateItemQuantity, removeItem } = useCart()
    return <>
        <ListItem sx={{display: "block"}}>
            <Box sx={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary={obj.product_title} secondary={`Price: ${obj.price}`} />
            </Box>
            <Stack direction="row" sx={{alignItems: "center"}} spacing={2}>
                <Button variant="contained" type="button" onClick={() => {
                    updateItemQuantity(obj.id, obj.quantity + 1)
                }}>+</Button>
                <Typography>{obj.quantity}</Typography>
                <Button variant="contained" type="button" onClick={() => {
                    updateItemQuantity(obj.id, obj.quantity - 1)
                }}>-</Button>
                <Button variant="contained" color="error" onClick={() => {
                    removeItem(obj.id)
                }}>Remove All</Button>
            </Stack>
            <Divider variant="inset" sx={{marginLeft: "0", marginTop: "10px"}}/>
        </ListItem>
    </>
}