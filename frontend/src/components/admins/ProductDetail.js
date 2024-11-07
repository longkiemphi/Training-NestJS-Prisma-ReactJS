import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../redux/reducers/adminReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirectToLoginIfTokenInvalid } from '../auths/services/AuthorService';
import { fetchProduct, fetchProducts, updateProductApproval } from './services/ProductServices';
import ProductInfo from './ProductInfo';
import { setProducts } from '../../redux/reducers/adminReducer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.admin.products);
    const product = useSelector((state) => state.admin.products.find((p) => p.id == id));


    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = redirectToLoginIfTokenInvalid(navigate);
        if (savedToken) {
            setToken(savedToken);
        }
    }, [navigate]);

    useEffect(() => {
        if (products.length === 0 && token) {
            // Fetch products when token is available
            fetchProducts(token)
                .then((response) => {
                    dispatch(setProducts(response.data));
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
    }, [token]);

    useEffect(() => {

    }, [product]);


    const updateApprovalStatus = (status) => {
        if (token) {
            updateProductApproval(id, token, status)
                .then(() => {
                    dispatch(updateProduct({ id: id, approved: status }));
                })
                .catch(() => {
                    setError('Error updating the product status, please try again later.');
                });
        }
    };

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Product Detail</h3>
                            <ProductInfo product={product} />
                            <div className="d-flex mt-4 gap-2 justify-content-end">
                                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                                    Back
                                </button>
                                {product?.approved ? (
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => updateApprovalStatus(false)}
                                    >
                                        Pending
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => updateApprovalStatus(true)}
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

const Loading = () => {
    return <h2>🌀 Loading...</h2>;
}

export default ProductDetail;
