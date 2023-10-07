import PropTypes from 'prop-types';

function X({ extraClasses }) {
  X.propTypes = {
    extraClasses: PropTypes.string.isRequired,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${extraClasses}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>

  );
}

export default X;
