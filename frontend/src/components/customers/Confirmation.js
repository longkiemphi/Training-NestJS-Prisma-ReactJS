import React from 'react';
import ProductInfo from './ProductInfo.js';

const Confirmation = ({ formData, prevStep, submitForm }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Confirmation</h2>
          <ProductInfo formData={formData} />
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={prevStep}>Back</button>
            <button className="btn btn-primary" onClick={submitForm}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;