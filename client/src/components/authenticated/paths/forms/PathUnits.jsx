/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import PathUnit from './PathUnit';

function PathUnits({ formData, setFormData }) {
  PathUnits.propTypes = {
    setFormData: PropTypes.func.isRequired,
    formData: PropTypes.shape({
      pathName: PropTypes.string,
      pathWhy: PropTypes.string,
      pathStartDate: PropTypes.string,
      pathEndDate: PropTypes.string,
      pathUnits: PropTypes.array,
    }),
  };

  const formObject = {
    index: new Date().getTime(),
    name: '',
    polarity: 'positive',
    schedule: '',
  };

  const unitsSet = !!formData.pathUnits.length;

  const [pathUnits, setPathUnits] = unitsSet ? useState(formData.pathUnits) : useState([formObject]);

  useEffect(() => {
    setFormData({
      ...formData,
      pathUnits,
    });
  }, [pathUnits]);

  const handleAddPathunitUnit = () => {
    setPathUnits((prevUnits) => [
      ...prevUnits,
      formObject,
    ]);
  };

  const handleUnitChange = (e, idx) => {
    const { name, value } = e.target;
    setPathUnits((prevUnits) => {
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
    setPathUnits((prevUnits) => {
      const updatedUnits = prevUnits.filter((item) => item.index !== idx);
      return updatedUnits;
    });
  };

  return (
    <div className="flex flex-col items-start w-full m-auto pb-2">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Path Commitments</h2>
      {pathUnits.map((unit, i) => (
        <PathUnit
          key={unit.index}
          idx={unit.index}
          name={unit.name}
          errorFinder={i}
          polarity={unit.polarity}
          schedule={unit.schedule}
          onRemove={handleRemoveUnit}
          onChange={handleUnitChange}
        />
      ))}
      <div role="button" tabIndex={0} onKeyDown={handleAddPathunitUnit} onClick={handleAddPathunitUnit}>
        <FontAwesomeIcon className="hover:cursor-pointer mt-4" icon={faPlusCircle} />
      </div>
    </div>
  );
}

export default PathUnits;
