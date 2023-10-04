import PropTypes from 'prop-types';
import Check from '../../../assets/icons/Check';

function CurrentDayStats({ date }) {
  CurrentDayStats.propTypes = {
    date: PropTypes.string.isRequired,
  };
  return (
    <div className="inline-flex">
      <Check extraClasses="text-green-600 text-l" />
      <h1 className="font-semibold">{date}</h1>
    </div>
  );
}

export default CurrentDayStats;
