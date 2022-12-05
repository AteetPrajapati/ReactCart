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
import { useDispatch, useSelector } from 'react-redux'
import { incrementByAmount } from '../../features/counter/cart'
import ArgonAlert from "components/ArgonAlert";

function Products() {
    const [products, setProducts] = useState([]);
    const [isExists, setisExists] = useState(false);
    const items = useSelector((state) => state.cartStore.items)

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
        let index = -1
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            dispatch(incrementByAmount(item));
        } else {
            setisExists(true);
        }
        setTimeout(() => {
            setisExists(false);
        }, 3000);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {
                isExists ? <ArgonAlert dismissible={true} color={'error'}> Alredy exists</ArgonAlert> : null
            }
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
                                                <div style={{
                                                    'max-height': '120px',
                                                    'min-height': '120px',
                                                    overflow: 'hidden',
                                                    'text-overflow': 'ellipsis',
                                                }}>
                                                    {element.description}
                                                </div>
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
