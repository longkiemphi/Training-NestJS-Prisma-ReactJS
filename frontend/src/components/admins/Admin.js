import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from './Productable';
import { useDispatch, useSelector } from 'react-redux';
import { redirectToLoginIfTokenInvalid } from '../auths/services/AuthorService';
import { setProducts } from '../../redux/reducers/adminReducer';
import './css/AdminProducts.css';
import { fetchProducts } from './services/ProductServices';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.admin.products);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const productsApiUrl = process.env.REACT_APP_API_URL_PRODUCTS;

    useEffect(() => {
        const savedToken = redirectToLoginIfTokenInvalid(navigate);
        if (savedToken) {
            setToken(savedToken);
        }
    }, [navigate]);

    useEffect(() => {
        if (token) {
            // Fetch products when token is available
            fetchProducts(token)
                .then((response) => {
                    dispatch(setProducts(response.data));

                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [token, productsApiUrl, dispatch]);

    return (
        <ProductTable products={products} />
    );
};

export default AdminProducts;
