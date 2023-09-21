import { useState } from 'react';
import StepDelegator from './StepDelegator';
import { useCreatePathMutation } from '../../../../features/paths/pathApiSlice';

function NewPathForm() {
  const [createPath] = useCreatePathMutation();

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

  const handleSubmit = async () => {
    const {
      pathName, pathWhy, pathStartDate, pathEndDate, pathDisciplines,
    } = formData;
    const data = await createPath({
      path: {
        path_name: pathName,
        path_description: pathWhy,
        path_start_date: pathStartDate,
        path_end_date: pathEndDate,
        path_disciplines: pathDisciplines,
      },
    });
    console.log(data);
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
      { isLastStep() ? 'save' : 'next'}
    </button>
  );

  const previousButton = () => (
    <button
      type="button"
      disabled={isFirstStep()}
      onClick={() => setStep((currStep) => currStep - 1)}
      className="disabled:opacity-50 rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      back
    </button>
  );

  return (
    <div className="min-h-[400px] max-w-[700px] p-4 mt-12 space-y-4 shadow-md rounded-md bg-white mx-auto border-solid border-2 border-gray-100 mb-8 flex flex-col justify-between">
      <div>
        <StepDelegator step={step} formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flex-row justify-between">
        {previousButton()}
        {nextOrSubmitButton()}
      </div>
    </div>
  );
}

export default NewPathForm;
