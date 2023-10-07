import PropTypes from 'prop-types';
import Check from '../../../assets/icons/Check';
import LeftCarrot from '../../../assets/icons/LeftCarrot';
import RightCarrot from '../../../assets/icons/RightCarrot';

function DateDisplay({ date }) {
  DateDisplay.propTypes = {
    date: PropTypes.string.isRequired,
  };
  return (
    <div className="inline-flex w-full justify-evenly">
      <div><LeftCarrot /></div>
      <Check extraClasses="text-green-600 text-l" />
      <h1 className="font-semibold">{date}</h1>
      <div><RightCarrot /></div>
    </div>
  );
}

export default DateDisplay;
