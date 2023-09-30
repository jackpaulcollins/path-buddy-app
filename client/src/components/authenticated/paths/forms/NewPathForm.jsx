import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newPathFormHighlighter, newPathFormSchema } from '../../../../yup/NewPathForm';
import StepDelegator from './StepDelegator';
import ErrorAlert from '../../../general/ErrorAlert';
import { useCreatePathMutation } from '../../../../features/paths/pathApiSlice';
import { setFlash } from '../../../../features/notifications/notificationsSlice';

function NewPathForm() {
  const [createPath] = useCreatePathMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formObject = {
    pathName: '',
    pathWhy: '',
    pathStartDate: '',
    pathEndDate: null,
    pathUnits: [],
  };

  const [step, setStep] = useState(0);
  const steps = ['Basics', 'Units', 'Review'];
  const [formData, setFormData] = useState(formObject);
  const [formErrors, setFormErrors] = useState('');

  const isLastStep = () => (step === steps.length - 1);

  const isFirstStep = () => (step === 0);

  const goToStep = async (stepInt) => {
    setStep(stepInt);
  };

  const hightLightFieldOnError = (field) => {
    newPathFormHighlighter('add', field);
  };

  const handleSubmit = async () => {
    const {
      pathName, pathWhy, pathStartDate, pathEndDate, pathUnits,
    } = formData;

    try {
      const response = await createPath({
        path: {
          path_name: pathName,
          path_description: pathWhy,
          path_start_date: pathStartDate,
          path_end_date: pathEndDate,
          path_units: pathUnits,
        },
      }).unwrap();

      const { status, data } = response;

      if (status === 201) {
        dispatch(setFlash({ title: 'Success!', message: 'Your path was created', icon: 'success' }));
        navigate('/dashboard/my-path', { state: { data } });
      }
    } catch (e) {
      setFormErrors('Something went wrong, please contact support');
    }
  };

  const validateFormData = async () => {
    try {
      await newPathFormSchema.validate(formData);
    } catch (e) {
      const { errors, path } = e;
      await goToStep(errors[0]);
      setFormErrors(errors[1]);
      hightLightFieldOnError(path);
      return false;
    }
    return true;
  };

  const incrementStep = async () => {
    if (step === 1) {
      const valid = validateFormData();
      if (!valid) return;
    }
    setFormErrors('');
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

  const clearErrors = () => setFormErrors('');

  const renderFormErrors = (
    <ErrorAlert clearErrors={clearErrors} messages={[formErrors]} />
  );

  const content = (
    <div className="min-h-[400px] max-w-[700px] p-4 mt-12 space-y-4 shadow-md rounded-md bg-white mx-auto border-solid border-2 border-gray-100 mb-8 flex flex-col justify-between">
      {formErrors ? renderFormErrors : null}
      <div>
        <StepDelegator step={step} formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex flex-row justify-between">
        {previousButton()}
        {nextOrSubmitButton()}
      </div>
    </div>
  );

  return content;
}

export default NewPathForm;
