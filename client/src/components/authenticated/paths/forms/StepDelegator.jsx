import PropTypes from 'prop-types';
import PathBasics from './PathBasics';
import PathUnits from './PathUnits';
import PathReview from './PathReview';

function StepDelegator({ step, formData, setFormData }) {
  StepDelegator.propTypes = {
    step: PropTypes.number.isRequired,
    setFormData: PropTypes.func.isRequired,
    formData: PropTypes.shape({
      pathName: PropTypes.string,
      pathWhy: PropTypes.string,
      pathStartDate: PropTypes.string,
      pathEndDate: PropTypes.string,
      pathUnits: PropTypes.array,
    }),
  };

  if (formData) {
    if (step === 0) {
      return <PathBasics formData={formData} setFormData={setFormData} />;
    } if (step === 1) {
      return <PathUnits formData={formData} setFormData={setFormData} />;
    }
    return <PathReview formData={formData} setFormData={setFormData} />;
  }
}

export default StepDelegator;
