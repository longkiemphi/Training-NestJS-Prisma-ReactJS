import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProductTable.css'
import { sortProducts } from '../../helpers/ArrayHelper';

const ProductTable = ({ products }) => {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const [sortedProducts, setSortedProducts] = useState(products);

    // Update sortedProducts when products prop changes
    useEffect(() => {
        // Get sort order from localStorage
        const savedSortOrder = localStorage.getItem('sortOrder');
        if (savedSortOrder) {
            setSortOrder(savedSortOrder);
            setSortedProducts(sortProducts(products, savedSortOrder));
        } else {
            setSortedProducts(products);
        }
    }, [products]);

    const handleSortByApproved = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sorted = sortProducts(sortedProducts, newSortOrder);
        setSortedProducts(sorted);
        setSortOrder(newSortOrder);
        // Save sort order to localStorage
        window.localStorage.setItem('sortOrder', newSortOrder);
    };

    // write sort funtion to reuese when first render and hadnled by handleSortByApproved

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Product List</h3>
                    <div className="table-container">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th className='align-center align-middles'>No.</th>
                                    <th className=''>Product Name</th>
                                    <th className='d-none d-md-table-cell'>Storage</th>
                                    <th className='d-none d-md-table-cell'>RAM</th>
                                    <th
                                        className=''
                                        onClick={handleSortByApproved}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Approved
                                        {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                                    </th>
                                    <th className=''>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {sortedProducts.map((product, index) => (
                                    <TablRow key={product.id} index={index} product={product} navigate={navigate} ></TablRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TablRow = React.memo(({ product, navigate, index }) => {
    return (
        <tr className={product.approved ? 'table-success' : 'table-warning'}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td className='d-none d-md-table-cell'>{product.storage}</td>
            <td className='d-none d-md-table-cell'>{product.ram}</td>
            <td className={product.approved ? 'text-success' : 'text-warning'}>
                {product.approved ? 'Approved' : 'Pending'}
            </td>
            <td>
                <button
                    className="btn btn-info"
                    onClick={() => navigate(`/admin/product/${product.id}`)}
                >
                    Detail
                </button>
            </td>
        </tr>
    )
})

export default ProductTable;