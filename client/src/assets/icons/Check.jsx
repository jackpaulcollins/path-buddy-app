import PropTypes from 'prop-types';

function Check({ extraClasses }) {
  Check.propTypes = {
    extraClasses: PropTypes.string.isRequired,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${extraClasses}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>

  );
}

export default Check;
