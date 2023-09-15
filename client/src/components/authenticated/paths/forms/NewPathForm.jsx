import { useState } from 'react';
import StepDelegator from './StepDelegator';

function NewPathForm() {
  const formObject = {
    pathName: '',
    pathWhy: '',
    pathStartDate: '',
    pathEndDate: null,
    pathDisciplines: {},
  };

  const [step, setStep] = useState(0);
  const steps = ['Basics', 'Disciples', 'Review'];
  const [formData, setFormData] = useState(formObject);

  const isLastStep = () => (step === steps.length - 1);

  const isFirstStep = () => (step === 0);

  const handleSubmit = () => {
    console.log('submitted');
  };

  const incrementStep = () => {
    setStep((currStep) => currStep + 1);
  };

  const delegateButtonAction = () => (isLastStep() ? handleSubmit() : incrementStep());

  const nextOrSubmitButton = () => (
    <button
      type="button"
      aria-label="next"
      onClick={delegateButtonAction}
      className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      { isLastStep() ? 'submit' : 'next'}
    </button>
  );

  return (
    <div>
      <div>
        <StepDelegator step={step} formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flew-row w-1/2 m-auto justify-between">
        <button
          type="button"
          disabled={isFirstStep()}
          onClick={() => setStep((currStep) => currStep - 1)}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          prev
        </button>
        {nextOrSubmitButton()}
      </div>
    </div>
  );
}

export default NewPathForm;
