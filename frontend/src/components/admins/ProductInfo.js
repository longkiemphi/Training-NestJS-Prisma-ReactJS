import LABELS from '../../constants/ProductLabels';
import { formatDateTime } from '../../helpers/StringHelper';


const ProductInfo = ({ product }) => {

    if (!product) {
        return <div className="container mt-5 alert alert-danger">Loading....</div>;
    }
    return (

        <div className="table-responsive mt-3">
            <table className="table table-bordered">
                <tbody>
                    {Object.entries(LABELS).map(([key, value]) => (
                        <tr key={key}>
                            <td style={{ fontWeight: 'bold', width: '50%' }}>{value}</td>
                            <td className={key === 'approved' ? (product?.[key] ? 'text-success' : 'text-warning') : ''}>
                                {product[key] !== undefined ? (
                                    key === 'approved'
                                        ? product[key]
                                            ? 'Approved'
                                            : 'Pending'
                                        : key === 'createdAt' || key === 'updatedAt'
                                            ? formatDateTime(product?.[key])
                                            : product?.[key]
                                ) : (
                                    'N/A'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductInfo;
