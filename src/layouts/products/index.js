import Grid from "@mui/material/Grid";
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { incrementByAmount } from '../../features/counter/cart'

function Products() {
    const [products, setProducts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchParams.get('cat') == null) {
            axios.get('https://fakestoreapi.com/products').then((res) => {
                setProducts(res.data);
            })
        } else {
            axios.get('https://fakestoreapi.com/products/category/' + searchParams.get('cat')).then((res) => {
                setProducts(res.data);
            })
        }
    }, [])

    const addtoCart = (item) => {
        dispatch(incrementByAmount(item));
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <Grid container spacing={3} mb={3}>
                    {
                        products.map((element, index) => {
                            return (
                                <Grid key={index} item xs={12} md={6} lg={3}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                width={240}
                                                image={element.image}
                                                alt="green iguana"
                                            />
                                            <CardContent maxHeight="400px">
                                                <Typography gutterBottom variant="h6" overflow='hidden' marginBottom={0} textOverflow={'ellipsis'} whiteSpace='nowrap' component="div">
                                                    {element.title}
                                                </Typography>
                                                <Rating size="small" name="read-only" precision={0.5} value={element.rating.rate} readOnly></Rating>
                                                <Typography variant="h6" >{element.rating.count} rates</Typography>
                                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                                    {element.category}
                                                </Typography>
                                                <Typography variant="body" maxHeight={400} minHeight={400} color="text.secondary">
                                                    {element.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <ArgonBox>
                                                <IconButton aria-label="add to favorites">
                                                    <CurrencyRupee /> {element.price}
                                                </IconButton>
                                            </ArgonBox>
                                            <Button onClick={() => addtoCart(element)}>Add to Cart</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>);
                        })
                    }
                </Grid>
            </ArgonBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Products;
