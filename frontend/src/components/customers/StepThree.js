import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const StepThree = ({ formData, setDraftData, nextStep, prevStep, step }) => {
  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (step >= 3) {
      trigger();
    }
  }, [step, trigger]);

  const onSubmit = (data) => {
    setDraftData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">Step 3: Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} onChange={(e) => setDraftData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.ownerName ? 'is-invalid' : ''}`}
              id="customerName"
              name="ownerName"
              {...register('ownerName', { required: true, maxLength: 50 })}
              defaultValue={formData?.ownerName || ''}
            />
            {errors.ownerName && <div className="invalid-feedback">Customer name is required (max 50 characters).</div>}

            <label htmlFor="ownerEmail" className="mt-3">Email</label>
            <input
              type="email"
              className={`form-control mt-1 ${errors.ownerEmail ? 'is-invalid' : ''}`}
              id="ownerEmail"
              name="ownerEmail"
              {...register('ownerEmail', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              defaultValue={formData?.ownerEmail || ''}
            />
            {errors.ownerEmail && <div className="invalid-feedback">Valid email is required.</div>}

            <label htmlFor="ownerPhone" className="mt-3">Phone Number</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.ownerPhone ? 'is-invalid' : ''}`}
              id="ownerPhone"
              name="ownerPhone"
              {...register('ownerPhone', { required: true, pattern: /^\d{9,10}$/ })}
              defaultValue={formData?.ownerPhone || ''}
            />
            {errors.ownerPhone && <div className="invalid-feedback"> Valid phone number is required (e.g.123456789; 0357863622, must be 9 or 10 digits).</div>}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepThree;
