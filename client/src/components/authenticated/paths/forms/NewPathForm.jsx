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

  return (
    <div>
      <div>
        <StepDelegator step={step} formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flew-row w-1/2 m-auto justify-between">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((currStep) => currStep - 1)}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          prev
        </button>
        <button
          type="button"
          disabled={step === steps.length - 1}
          onClick={() => setStep((currStep) => currStep + 1)}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          next
        </button>
      </div>
    </div>
  );
}

export default NewPathForm;
