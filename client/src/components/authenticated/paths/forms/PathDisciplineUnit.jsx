import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faI } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Dropdown from '../../../general/Dropdown';

function PathDisciplineUnit({
  disciplineCardinality, disciplineSchedule, disciplineName, onRemove, onChange, idx,
}) {
  PathDisciplineUnit.propTypes = {
    disciplineCardinality: PropTypes.string.isRequired,
    disciplineSchedule: PropTypes.string.isRequired,
    disciplineName: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired,
  };

  const cardinalityOptions = [
    { label: 'will', value: 'positive' },
    { label: 'will not', value: 'negative' },
  ];

  const scheduleOptions = [
    { label: 'daily', value: 'daily' },
    { label: 'weekly', value: 'weekly' },
    { label: 'custom', value: 'custom' },
  ];

  const handleDropDownSelect = (label, option) => {
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

  return (
    <div className="mt-4 w-full flex flex-row align-center justify-evenly">
      <div className="w-1/4 inline-flex">
        <FontAwesomeIcon className="self-center mr-4" icon={faI} size="sm" />
        <Dropdown
          key={idx}
          label="disciplineCardinality"
          placeHolder="will"
          dropdownOptions={cardinalityOptions}
          currentSelection={optionLabelFromValue(cardinalityOptions, disciplineCardinality)}
          selectorFunc={(label, option) => handleDropDownSelect(label, option)}
        />
      </div>
      <div>
        <input
          key={idx}
          type="text"
          placeholder="commitment"
          value={disciplineName}
          name="disciplineName"
          onChange={(e) => onChange(e, idx)}
          className="min-w-[300px] block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="min-w-[120px]">
        <Dropdown
          key={idx}
          label="disciplineSchedule"
          placeHolder="schedule"
          dropdownOptions={scheduleOptions}
          currentSelection={disciplineSchedule}
          selectorFunc={(label, option) => handleDropDownSelect(label, option)}
        />
      </div>
      <div className="hover:cursor-pointer self-center">
        <FontAwesomeIcon onClick={() => onRemove(idx)} icon={faTrash} />
      </div>
    </div>
  );
}

export default PathDisciplineUnit;
