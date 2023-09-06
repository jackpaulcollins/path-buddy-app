/* eslint-disable */
import { useState } from 'react';
import PathBasics from './PathBasics';
import PathDisciplines from './PathDisciplines';
import PathReview from './PathReview';

function NewPathForm() {
  const [step, setStep] = useState(0);
  const steps = ['Basics', 'Disciples', 'Review'];
  const [formData, setFormData] = useState({
    pathName: "",
    pathWhy: "",
    pathStartDate: "",
    pathEndDate: null,
    pathDisciplines: {},
  });

  const RenderStep = () => {
    if (step === 0) {
      return <PathBasics formData={formData} setFormData={setFormData} />
    } else if (step == 1) {
      return <PathDisciplines formData={formData} setFormData={setFormData} />
    } else {
      return <PathReview formData={formData} setFormData={setFormData} />
    }
  }
  return (
    <div>
      New Path
      <div>
        {RenderStep()}
      </div>
      <div className="flex flew-row w-1/2 m-auto justify-between">
        <button
          disabled={step === 0}
          onClick={() => setStep((currStep) => currStep - 1)}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          prev
        </button>
        <button
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
