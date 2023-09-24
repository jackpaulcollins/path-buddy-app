/* eslint-disable jsx-a11y/label-has-associated-control */
import Datepicker from 'react-tailwindcss-datepicker';
import PropTypes from 'prop-types';
import { string, date, object } from 'yup';

function PathBasics({ formData, setFormData }) {
  PathBasics.propTypes = {
    formData: PropTypes.shape.isRequired,
    setFormData: PropTypes.func.isRequired,
  };

  const basicsSchema = object({
    pathName: string().required(),
    pathWhy: string(),
    pathEndDate: date(),
    pathStartDate: date().required(),
  });

  basicsSchema.validate(formData);

  const {
    pathStartDate, pathEndDate, pathName, pathWhy,
  } = formData;

  const handleStartDateValueChange = (newValue) => {
    setFormData({ ...formData, pathStartDate: newValue.startDate });
  };

  const handleEndDateValueChange = (newValue) => {
    setFormData({ ...formData, pathEndDate: newValue.endDate });
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
            <Datepicker
              asSingle
              useRange={false}
              primaryColor="fuchsia"
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
          </label>
          <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
            To
            <i className="text-xxs font-light ml-2">(optional)</i>
            <Datepicker
              asSingle
              useRange={false}
              primaryColor="fuchsia"
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
              placeholder="Path Name"
              value={pathName}
                    // eslint-disable-next-line max-len
              onChange={(event) => setFormData({ ...formData, pathName: event.target.value })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
      </div>
    </div>
  );
}

export default PathBasics;
