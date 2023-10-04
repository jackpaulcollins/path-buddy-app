/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import CircleCheck from '../../../assets/icons/CircleCheck';
import CircleX from '../../../assets/icons/CircleX';
import ThumbsUp from '../../../assets/icons/ThumbsUp';
import ThumbsDown from '../../../assets/icons/ThumbsDown';
import PathScheduleParser from '../../../utils/PathScheduleParser';
import { useCreatePathUnitReportMutation } from '../../../features/path_unit_reports/pathUnitReportApiSlice';

function PathUnitSection({ unit, date }) {
  PathUnitSection.propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      polarity: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
  };

  const [createReport] = useCreatePathUnitReportMutation();

  const {
    id, name, schedule, polarity,
  } = unit;

  const createNewReport = async (status) => {
    const report = await createReport({
      path_unit_report: {
        path_unit_id: id,
        date,
        status,
      },
    });
    console.log(report);
  };

  const parsedSchedule = (unitSchedule, unitPolarity) => {
    if (!unitSchedule.startsWith('custom=')) {
      return new PathScheduleParser(unitSchedule, unitPolarity).periodDisplay();
    }

    return new PathScheduleParser(schedule, polarity).parse();
  };

  const maybeMarkSelected = () => '#7173f5';

  const renderPathActionSection = () => (
    <div className="w-1/2 inline-flex justify-evenly">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          alert('are you sure you want to mark this completed?');
          createNewReport('pass');
        }}
      >
        <ThumbsUp extraClasses={maybeMarkSelected()} />
      </div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          alert('are you sure you want to mark this failed?');
          createNewReport('fail');
        }}
      >
        <ThumbsDown extraClasses={maybeMarkSelected()} onClick={() => createNewReport('faile')} />
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
