import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

export const CardProduct =({obj}) => {
    return <>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                component={`img`}
                height="140"
                image={obj.product_img}
                alt={`${obj.product_title} image`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {obj.product_title}
                    </Typography>
                    <Typography variant="h5" display="inline-block" marginBottom="12px" component="span">
                        {obj.product_price} $
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => console.log(obj.id)} color="primary">
                    Buy
                </Button>
            </CardActions>
        </Card>
    </>
}