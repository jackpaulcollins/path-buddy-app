import PropTypes from 'prop-types';
import PathBasics from './PathBasics';
import PathUnits from './PathUnits';
import PathReview from './PathReview';

function StepDelegator({ step, formData, setFormData }) {
  StepDelegator.propTypes = {
    step: PropTypes.number.isRequired,
    formData: PropTypes.shape.isRequired,
    setFormData: PropTypes.func.isRequired,
  };

  if (formData !== undefined) {
    if (step === 0) {
      return <PathBasics formData={formData} setFormData={setFormData} />;
    } if (step === 1) {
      return <PathUnits formData={formData} setFormData={setFormData} />;
    }
    return <PathReview formData={formData} setFormData={setFormData} />;
  }
}

export default StepDelegator;
