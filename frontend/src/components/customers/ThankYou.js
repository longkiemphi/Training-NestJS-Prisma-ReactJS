import ProductInfo from './ProductInfo.js';
const ThankYou = ({ formData }) => {
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center card-title text-success">Thank You!</h2>
                    <p className="card-text">Your form has been submitted successfully. Here is the information you provided:</p>
                    <ProductInfo formData={formData} />
                    <div className="text-center mt-4">
                        <button className="btn btn-success" onClick={() => window.location.href = '/'}>Go Back Home</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ThankYou;
