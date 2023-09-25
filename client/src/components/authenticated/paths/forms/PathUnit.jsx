import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faI } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Dropdown from '../../../general/Dropdown';
import SelectField from '../../../general/SelectField';
import { newPathFormHighlighter } from '../../../../yup/NewPathForm';

function PathUnit({
  polarity, schedule, name, onRemove, onChange, idx, errorFinder,
}) {
  PathUnit.propTypes = {
    polarity: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
    errorFinder: PropTypes.number.isRequired,
  };

  const customScheduleSet = !!schedule.startsWith('custom=');

  const [customDaysState, setCustomDaysState] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (customScheduleSet) {
      const scheduleParts = schedule.split('=')[1];
      const customDays = scheduleParts.split(',').map(Number);
      setCustomDaysState(customDays);
    }
  }, []);

  useEffect(() => {
    if (schedule.startsWith('custom=')) {
      const event = { target: { name: 'schedule', value: `custom=${customDaysState}` } };
      onChange(event, idx);
    }
  }, [customDaysState]);

  useEffect(() => {
    if (!schedule.startsWith('custom=')) {
      setCustomDaysState([0, 0, 0, 0, 0, 0, 0]);
    }
  }, [schedule]);

  const polarityOptions = [
    { label: 'will', value: 'positive' },
    { label: 'will not', value: 'negative' },
  ];

  const scheduleOptions = [
    { label: 'daily', value: 'daily' },
    { label: 'weekly', value: 'weekly' },
    { label: 'custom', value: 'custom=' },
  ];

  const customScheduleOptions = [
    { label: 'sun', value: 0 },
    { label: 'mon', value: 1 },
    { label: 'tues', value: 2 },
    { label: 'wed', value: 3 },
    { label: 'thurs', value: 4 },
    { label: 'fri', value: 5 },
    { label: 'sat', value: 6 },
  ];

  const maybeClearErrorClasses = (index, fieldName) => {
    newPathFormHighlighter('remove', `pathUnits[${index}].${fieldName}`);
  };

  const handleDropDownSelect = (label, option) => {
    newPathFormHighlighter('remove', `pathUnits[${errorFinder}].${label}`);
    const event = { target: { name: label, value: option } };
    onChange(event, idx);
  };

  const optionLabelFromValue = (options, value) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const obj of options) {
      const key = Object.values(obj)[0];
      const val = Object.values(obj)[1];
      if (val === value) {
        return key;
      }
    }
    return null;
  };

  const handleCustomScheduleDaySelect = (index) => {
    setCustomDaysState((prevCustomDayState) => {
      const updatedState = [...prevCustomDayState];
      if (updatedState[index] === 1) {
        updatedState[index] = 0;
      } else {
        updatedState[index] = 1;
      }
      return updatedState;
    });
  };

  const maybeRenderCustomSchedule = () => {
    if (schedule.startsWith('custom=')) {
      return (
        <div className="mt-2 w-full">
          <SelectField options={customScheduleOptions} currentSelections={customDaysState} selectorFunc={handleCustomScheduleDaySelect} flexDirection="row" />
        </div>
      );
    }
    return null;
  };

  return (
    <div id={`unit-${errorFinder}`} className="w-full">
      <div className="mt-4 w-full flex flex-row align-center justify-evenly">
        <div className="w-1/4 inline-flex">
          <FontAwesomeIcon className="self-center mr-4" icon={faI} size="sm" />
          <Dropdown
            key={idx}
            label="polarity"
            placeHolder="will"
            dropdownOptions={polarityOptions}
            currentSelection={optionLabelFromValue(polarityOptions, polarity)}
            selectorFunc={(label, option) => handleDropDownSelect(label, option)}
          />
        </div>
        <div>
          <input
            key={idx}
            type="text"
            placeholder="commitment"
            value={name}
            name="name"
            id="name"
            onChange={(e) => {
              maybeClearErrorClasses(errorFinder, 'name');
              onChange(e, idx);
            }}
            className="min-w-[300px] block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="min-w-[120px]">
          <Dropdown
            key={idx}
            label="schedule"
            placeHolder="schedule"
            dropdownOptions={scheduleOptions}
            currentSelection={schedule.startsWith('custom=') ? 'custom' : schedule}
            selectorFunc={(label, option) => handleDropDownSelect(label, option)}
          />
        </div>
        <div className="hover:cursor-pointer self-center">
          <FontAwesomeIcon onClick={() => onRemove(idx)} icon={faTrash} />
        </div>
      </div>
      <div>
        { maybeRenderCustomSchedule()}
      </div>
    </div>
  );
}

export default PathUnit;
