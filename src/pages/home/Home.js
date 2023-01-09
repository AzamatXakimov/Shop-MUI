import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import { CardProduct } from '../../components/Card/Card';

export const Home = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:8080/products')
			.then((data) => {
				if (data.status === 200) {
					setProducts(data.data);
					console.log(data);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<>
			<Container sx={{ marginTop: '70px' }} maxWidth='xl'>
				<Grid container spacing={2}>
					{products.map((item,index) => (
						<Grid key={index} item xs={3}>
							<CardProduct obj={item} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};
