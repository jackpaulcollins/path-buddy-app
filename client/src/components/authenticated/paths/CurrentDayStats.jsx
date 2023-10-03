// import PropTypes from 'prop-types';
import { toDate, format } from 'date-fns';
import Check from '../../../assets/icons/Check';

function CurrentDayStats() {
  const today = format(toDate(new Date(), { timeZone: 'Your_Time_Zone' }), 'MMMM d, yyyy');
  return (
    <div className="inline-flex">
      <Check extraClasses="text-green-600 text-l" />
      <h1 className="font-semibold">{today}</h1>
    </div>
  );
}

export default CurrentDayStats;
