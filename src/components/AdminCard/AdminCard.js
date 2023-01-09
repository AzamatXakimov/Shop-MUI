import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

export const AdminCard =({obj, deleteFn, setEditModal, setEditModalId}) => {
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
                    deleteFn(obj.id)
                }} variant="contained" color="error">
                    Delete
                </Button>
                <Button onClick={() => {
                    setEditModal(true)
                    setEditModalId(obj.id)
                }} variant="contained" color="warning">
                    Edit
                </Button>
            </CardActions>
        </Card>
    </>
}