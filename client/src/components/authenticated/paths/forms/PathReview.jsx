import PropTypes from 'prop-types';
import PathScheduleParser from '../../../../utils/PathScheduleParser';

function PathReview({ formData }) {
  PathReview.propTypes = {
    formData: PropTypes.shape({
      pathName: PropTypes.string,
      pathWhy: PropTypes.string,
      pathStartDate: PropTypes.string,
      pathEndDate: PropTypes.string,
      pathUnits: PropTypes.array,
    }),
  };

  const {
    pathName, pathStartDate, pathEndDate, pathUnits,
  } = formData;

  const parsedSchedule = (schedule) => {
    if (!schedule.startsWith('custom=')) {
      return schedule;
    }

    return new PathScheduleParser(schedule).parse();
  };

  const renderPathNameAndWhy = () => (
    <h1 className="text-center font-bold mb-4 border-b-2">{pathName}</h1>
  );

  const maybeRenderEndDateInfo = () => {
    if (pathEndDate) {
      return (
        <span>
          {' '}
          and until
          {' '}
          {pathEndDate}
        </span>
      );
    }
    return '';
  };

  const renderBasics = () => (
    <div>
      Starting on
      {' '}
      {pathStartDate}
      {maybeRenderEndDateInfo()}
      {' '}
      :
    </div>
  );

  const renderUnits = () => (
    pathUnits.map((d) => (
      <li key={d.index}>
        I
        {' '}
        <strong>{d.polarity === 'positive' ? 'will' : 'will not'}</strong>
        {' '}
        {d.name}
        {' '}
        {parsedSchedule(d.schedule)}
      </li>
    ))
  );

  return (
    <div className="w-7/8 m-auto h-full rounded-md p-4">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Path Review</h2>
      <div className="mt-2 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-4">
        <div>
          {renderPathNameAndWhy()}
        </div>
        <div>
          {renderBasics()}
        </div>
        <ul className="list-disc ml-8 mt-2">
          {renderUnits()}
        </ul>
      </div>
    </div>
  );
}

export default PathReview;
