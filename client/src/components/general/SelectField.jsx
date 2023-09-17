/* eslint-disable */

function SelectField({ options, selectorFunc, currentSelections, flexDirection }) {
  return (
    <fieldset>
      <div className={`flex flex-${flexDirection} space-${flexDirection === 'row' ? 'x' : 'y'}-2 justify-evenly`}>
        {options.map((option) => (
          <div className="relative flex items-start" key={option.label}>
            <div className="mr-1 text-sm leading-6">
              <label htmlFor={option.label} className="font-medium text-gray-900">
                {option.label}
              </label>{' '}
              <span id={`${option.label}-description`} className="text-gray-500">
                <span className="sr-only">{option.label} </span>
                {option.description}
              </span>
            </div>
            <div className="flex h-6 items-center">
              <input
                id={option.id}
                aria-describedby={`${option.label}-description`}
                name={option.name}
                type="checkbox"
                checked={currentSelections[option.value] === 1}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => selectorFunc(option.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default SelectField;
