import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from "react-use-cart"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const CardProduct =({obj}) => {
    const { addItem } = useCart();
    const {token} = useContext(AuthContext)
    return <>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component={`img`}
                height="140"
                sx={{height: "300px", }}
                image={obj.product_img}
                alt={`${obj.product_title} image`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {obj.product_title}
                    </Typography>
                    <Typography variant="h5" display="inline-block" marginBottom="12px" component="span">
                        {obj.price} $
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => {
                    if(token){
                        addItem(obj)
                    }
                }} variant="contained" endIcon={
                    <AddShoppingCartIcon />
                } color="primary">
                    Buy
                </Button>
            </CardActions>
        </Card>
    </>
}