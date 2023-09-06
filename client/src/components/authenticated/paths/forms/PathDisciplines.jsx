/* eslint-disable */
import { useState } from 'react';
import PathDisciplineUnit from './PathDisciplineUnit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function PathDisciplines() {
  const [pathDisciplineUnits, setPathDisciplineUnits] = useState([{disciplineName: ''}]);

  const handleAddPathDisciplineUnit = () => {
    setPathDisciplineUnits((prevUnits) => [
      ...prevUnits,
      { disciplineName: '' }
    ]);
  };

  const handleUnitChange = (e, idx) => {
    const { name, value } = e.target;
    setPathDisciplineUnits((prevUnits) => {
      const updatedUnits = [...prevUnits];
      updatedUnits[idx] = { ...updatedUnits[idx], [name]: value };
      return updatedUnits;
    });
  };

  return (
    <div>
      {JSON.stringify(pathDisciplineUnits)}
      Path Disciplines
      {pathDisciplineUnits.map((unit, idx) => (
          <PathDisciplineUnit
            key={idx}
            idx={idx}
            // onRemove={handleRemovePathDisciplineUnit}
            onChange={handleUnitChange}
          />
        ))}
      <div onClick={handleAddPathDisciplineUnit}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}

export default PathDisciplines;
