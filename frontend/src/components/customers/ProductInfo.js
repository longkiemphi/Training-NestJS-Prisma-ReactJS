import LABELS from '../../constants/ProductLabels';

const ProductInfo = ({ formData }) => {
    return (
        <div className="table-responsive mt-3">
            <table className="table table-bordered">
                <tbody>
                    {Object.entries(formData).map(([key, value]) => (
                        <tr key={key}>
                            <td style={{ fontWeight: 'bold', width: '50%' }}>{LABELS[key]}</td>
                            <td>{value ? value : 'Please update!'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductInfo;
