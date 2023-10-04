/* eslint-disable jsx-a11y/label-has-associated-control */
import Datepicker from 'react-tailwindcss-datepicker';
import PropTypes from 'prop-types';
import { newPathFormHighlighter } from '../../../../yup/NewPathForm';

function PathBasics({ formData, setFormData }) {
  PathBasics.propTypes = {
    setFormData: PropTypes.func.isRequired,
    formData: PropTypes.shape({
      pathName: PropTypes.string,
      pathWhy: PropTypes.string,
      pathStartDate: PropTypes.string,
      pathEndDate: PropTypes.string,
      pathUnits: PropTypes.array,
    }),
  };

  const {
    pathStartDate, pathEndDate, pathName, pathWhy,
  } = formData;

  const maybeClearErrorClasses = (dateFieldClassOrId) => {
    newPathFormHighlighter('remove', dateFieldClassOrId);
  };

  const handleStartDateValueChange = (newValue) => {
    setFormData({ ...formData, pathStartDate: newValue.startDate });
    maybeClearErrorClasses('pathStartDate');
  };

  const handleEndDateValueChange = (newValue) => {
    setFormData({ ...formData, pathEndDate: newValue.endDate });
    maybeClearErrorClasses('pathEndDate');
  };

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Path Basics</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Define the basic attributes of your new path.
      </p>
      <div className="mt-2">
        <div className="w-full flex flex-row justify-between">
          <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
            From
            <div>
              <Datepicker
                inputClassName="pathStartDate relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-indigo-600 focus:ring-indigo-600/20"
                asSingle
                useRange={false}
                primaryColor="indigo"
                value={{
                // weird hack to display the date in the picker
                // but we're not actually using the libraries
                // version of the state
                // https://github.com/onesine/react-tailwindcss-datepicker/blob/master/src/components/Datepicker.tsx:187
                  startDate: pathStartDate,
                  endDate: '2025-01-01',
                }}
                onChange={handleStartDateValueChange}
              />
            </div>
          </label>
          <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
            To
            <i className="text-xxs font-light ml-2">(optional)</i>
            <Datepicker
              inputClassName="pathEndDate relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-indigo-600 focus:ring-indigo-600/20"
              asSingle
              useRange={false}
              primaryColor="indigo"
              value={{
                startDate: pathEndDate,
                endDate: '2025-01-01',
              }}
              onChange={handleEndDateValueChange}
            />
          </label>
        </div>

        <div className="mt-2">
          <label htmlFor="pathName" className="block text-sm font-medium leading-6 text-gray-900">
            Path Name
            <input
              type="text"
              id="pathName"
              placeholder="Path Name"
              value={pathName}
              onChange={(event) => {
                maybeClearErrorClasses('pathName');
                setFormData({ ...formData, pathName: event.target.value });
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </label>
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
          About
          <textarea
            id="about"
            name="about"
            rows={3}
            type="text"
            placeholder="Your why"
            value={pathWhy}
            onChange={(event) => setFormData({ ...formData, pathWhy: event.target.value })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
      </div>
    </div>
  );
}

export default PathBasics;
