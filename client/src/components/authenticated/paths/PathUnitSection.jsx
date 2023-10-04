/* eslint-disable  */
/* eslint-disable no-alert */
import PropTypes from 'prop-types';
import CircleCheck from '../../../assets/icons/CircleCheck';
import CircleX from '../../../assets/icons/CircleX';
import ThumbsUp from '../../../assets/icons/ThumbsUp';
import ThumbsDown from '../../../assets/icons/ThumbsDown';
import PathScheduleParser from '../../../utils/PathScheduleParser';

function PathUnitSection({ unit }) {
  PathUnitSection.propTypes = {
    unit: PropTypes.shape.isRequired,
  };

  const { name, schedule, polarity } = unit;

  const parsedSchedule = (unitSchedule, unitPolarity) => {
    if (!unitSchedule.startsWith('custom=')) {
      return new PathScheduleParser(unitSchedule, unitPolarity).periodDisplay();
    }

    return new PathScheduleParser(schedule, polarity).parse();
  };

  const maybeMarkSelected = () => '#7173f5';

  const renderPathActionSection = () => (
    <div className="w-1/2 inline-flex justify-evenly">
      <div className="hover:cursor-pointer" onClick={() => alert('are you sure you want to mark this completed?')}>
        <ThumbsUp extraClasses={maybeMarkSelected()} />
      </div>
      <div className="hover:cursor-pointer" onClick={() => alert('are you sure you want to mark this failed?')}>
        <ThumbsDown extraClasses={maybeMarkSelected()} />
      </div>
    </div>
  );

  const parsePolarity = (unitPolarity) => (unitPolarity === 'positive' ? <CircleCheck extraClasses="text-green-600" /> : <CircleX extraClasses="text-red-600" />);

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-48 sm:px-6">
      <div className="inline-flex sm:grid-cols-2 gap-4">
        <div>{parsePolarity(polarity)}</div>
        <dt className="text-sm font-medium text-gray-900">{name}</dt>
      </div>
      <div className="inline-flex">
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parsedSchedule(schedule, polarity)}</dd>
      </div>
      <div>{renderPathActionSection()}</div>
    </div>
  );
}

export default PathUnitSection;
