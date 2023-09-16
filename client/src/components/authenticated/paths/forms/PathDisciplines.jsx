/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PathDisciplineUnit from './PathDisciplineUnit';

function PathDisciplines({ formData, setFormData }) {
  PathDisciplines.propTypes = {
    formData: PropTypes.shape.isRequired,
    setFormData: PropTypes.func.isRequired,
  };

  const formObject = {
    index: new Date().getTime(),
    disciplineName: '',
    disciplineCardinality: 'positive',
    disciplineSchedule: '',
  };

  const [pathDisciplineUnits, setPathDisciplineUnits] = useState(formData.pathDisciplines);

  useEffect(() => {
    setFormData({
      ...formData,
      pathDisciplines: pathDisciplineUnits,
    });
  }, [pathDisciplineUnits]);

  const handleAddPathDisciplineUnit = () => {
    setPathDisciplineUnits((prevUnits) => [
      ...prevUnits,
      formObject,
    ]);
  };

  const handleUnitChange = (e, idx) => {
    const { name, value } = e.target;
    setPathDisciplineUnits((prevUnits) => {
      const targetIndex = prevUnits.findIndex((item) => item.index === idx);
      if (targetIndex === -1) {
        return prevUnits;
      }
      const updatedUnits = [...prevUnits];
      updatedUnits[targetIndex][name] = value;
      return updatedUnits;
    });
  };

  const handleRemoveUnit = (idx) => {
    setPathDisciplineUnits((prevUnits) => {
      const updatedUnits = prevUnits.filter((item) => item.index !== idx);
      return updatedUnits;
    });
  };

  return (
    <div className="flex flex-col items-start w-full m-auto pb-2">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Path Commitments</h2>
      {pathDisciplineUnits.map((unit) => (
        <PathDisciplineUnit
          key={unit.index}
          idx={unit.index}
          disciplineName={unit.disciplineName}
          disciplineCardinality={unit.disciplineCardinality}
          disciplineSchedule={unit.disciplineSchedule}
          onRemove={handleRemoveUnit}
          onChange={handleUnitChange}
        />
      ))}
      <div role="button" tabIndex={0} onKeyDown={handleAddPathDisciplineUnit} onClick={handleAddPathDisciplineUnit}>
        <FontAwesomeIcon className="hover:cursor-pointer mt-4" icon={faPlusCircle} />
      </div>
    </div>
  );
}

export default PathDisciplines;
