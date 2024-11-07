import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import Confirmation from './Confirmation';
import ErrorModal from '../errors/ErrorModal';
import ThankYou from './ThankYou';
import LABELS from '../../constants/ProductLabels';
import { nextStep, prevStep, setFormData } from '../../redux/reducers/customerReducer';

const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  } else {
    console.log('gtag mock:', ...args);
  }
};

const MultiStepForm = () => {
  const dispatch = useDispatch();

  const step = useSelector((state) => state.customer.form.step);
  const formData = useSelector((state) => state.customer.form.formData);

  const [error, setError] = useState(null);
  const [draftData, setDraftData] = useState(formData);

  const handleNextStep = () => {

    gtag('event', `next_step_${step}`, {
      step: step,
    });
    dispatch(setFormData(draftData));
    dispatch(nextStep());
  };

  const handlePrevStep = () => {

    gtag('event', `prev_step_${step}`, {
      step: step,
    });
    dispatch(prevStep());
  };


  const submitForm = async () => {
    try {
      gtag('event', 'form_completed', {
        step: step,
      });
      const apiUrl = process.env.REACT_APP_API_URL_PRODUCTS;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorResult = await response.json();
        if (response.status === 404) {
          setError('Error 404: The requested resource was not found.');
        } else if (response.status === 400) {
          setError(
            `${errorResult.message
              .map((msg) => `<strong>${LABELS[msg.split(' ')[0]]}</strong> ${msg.slice(msg.indexOf(' ') + 1)}`)
              .join('\n')}`
          );

        } else {
          setError(`Error ${response.status}: ${response.statusText}`);
        }
        return;
      }
      dispatch(nextStep());
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      {step === 1 && <StepOne formData={draftData} setDraftData={setDraftData} nextStep={handleNextStep} />}
      {step === 2 && <StepTwo formData={draftData} setDraftData={setDraftData} nextStep={handleNextStep} prevStep={handlePrevStep} />}
      {step === 3 && <StepThree formData={draftData} setDraftData={setDraftData} nextStep={handleNextStep} prevStep={handlePrevStep} />}
      {step === 4 && <Confirmation formData={formData} prevStep={handlePrevStep} submitForm={submitForm} />}
      {step === 5 && <ThankYou formData={formData} />}
    </div>
  );
};

export default MultiStepForm;
