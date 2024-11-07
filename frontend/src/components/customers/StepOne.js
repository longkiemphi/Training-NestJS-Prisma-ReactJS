import { useForm } from 'react-hook-form';

const StepOne = ({ formData, setDraftData, nextStep }) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    setDraftData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title text-start">Step 1: Product Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} onChange={(e) => setDraftData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.name ? 'is-invalid' : ''}`}
              id="productName"
              name="name"
              {...register('name', { required: true, minLength: 5, maxLength: 50 })}
              defaultValue={formData?.name || ''}
            />
            {errors.name && <div className="invalid-feedback">Name is required (5-50 characters).</div>}

            <label htmlFor="productType" className="mt-3">Product Type</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.type ? 'is-invalid' : ''}`}
              id="productType"
              name="type"
              {...register('type', { required: true, maxLength: 50 })}
              defaultValue={formData?.type || ''}
            />
            {errors.type && <div className="invalid-feedback">Type is required (max 50 characters).</div>}
          </div>
          <button type="submit" className="btn btn-primary mt-4 float-end" disabled={!isValid}>Next</button>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
