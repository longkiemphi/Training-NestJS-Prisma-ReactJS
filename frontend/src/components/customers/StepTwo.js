
import { useForm } from 'react-hook-form';

const StepTwo = ({ formData, setDraftData, nextStep, prevStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    setDraftData((prevData) => ({ ...prevData, ...data }));
    nextStep();
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">Step 2: Product Specifications</h2>
        <form onSubmit={handleSubmit(onSubmit)} onChange={(e) => setDraftData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))}>
          <div className="form-group">
            <label htmlFor="storage">Storage</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.storage ? 'is-invalid' : ''}`}
              id="storage"
              name="storage"
              {...register('storage', { required: true, maxLength: 20 })}
              defaultValue={formData?.storage || ''}
            />
            {errors.storage && <div className="invalid-feedback">Storage is required (max 20 characters).</div>}

            <label htmlFor="ram" className="mt-3">RAM</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.ram ? 'is-invalid' : ''}`}
              id="ram"
              name="ram"
              {...register('ram', { required: true, maxLength: 20 })}
              defaultValue={formData?.ram || ''}
            />
            {errors.ram && <div className="invalid-feedback">RAM is required (max 20 characters).</div>}

            <label htmlFor="conditon" className="mt-3">Condition</label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.conditon ? 'is-invalid' : ''}`}
              id="conditon"
              name="conditon"
              {...register('conditon', { required: true, maxLength: 50 })}
              defaultValue={formData?.conditon || ''}
            />
            {errors.conditon && <div className="invalid-feedback">Condition is required (max 50 characters).</div>}
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

export default StepTwo;
