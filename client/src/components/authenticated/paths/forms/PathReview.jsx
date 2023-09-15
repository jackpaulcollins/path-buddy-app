import PropTypes from 'prop-types';

function PathReview({ formData }) {
  PathReview.propTypes = {
    formData: PropTypes.shape.isRequired,
  };

  const {
    pathName, pathStartDate, pathEndDate, pathDisciplines,
  } = formData;

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

  const renderDisciplines = () => (
    pathDisciplines.map((d) => (
      <li key={d.index}>
        I
        {' '}
        <strong>{d.disciplineCardinality === 'positive' ? 'will' : 'will not'}</strong>
        {' '}
        {d.disciplineName}
        {' '}
        {d.disciplineSchedule}
      </li>
    ))
  );

  return (
    <div className="w-1/2 m-auto rounded-md p-12">
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-4">
        <div>
          {renderPathNameAndWhy()}
        </div>
        <div>
          {renderBasics()}
        </div>
        <ul className="list-disc ml-8 mt-2">
          {renderDisciplines()}
        </ul>
      </div>
    </div>
  );
}

export default PathReview;
