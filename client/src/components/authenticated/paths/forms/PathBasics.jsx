/* eslint-disable jsx-a11y/label-has-associated-control */
import Datepicker from 'react-tailwindcss-datepicker';
import PropTypes from 'prop-types';

function PathBasics({ formData, setFormData }) {
  PathBasics.propTypes = {
    formData: PropTypes.shape.isRequired,
    setFormData: PropTypes.func.isRequired,
  };

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
    <div className="w-2/3 m-auto mt-4 space-y-12">
      {JSON.stringify(formData)}
      <div className="pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Path Basics</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Define the basic attributes of your new path.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <div className="mt-2">
              <div className="w-full flex flex-row space-between">
                <div className="w-full">
                  <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Start Date
                    <Datepicker
                      asSingle
                      useRange={false}
                      containerClassName="w-1/2"
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
                </div>
                <div className="w-full">
                  <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                    End Date
                    <i className="text-xs font-normal ml-2">leave blank for ongoing</i>
                    <Datepicker
                      asSingle
                      useRange={false}
                      containerClassName="w-1/2"
                      primaryColor="fuchsia"
                      value={{
                        startDate: pathEndDate,
                        endDate: '2025-01-01',
                      }}
                      onChange={handleEndDateValueChange}
                    />
                  </label>
                </div>
              </div>
              <div className="col-span-full">
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
            </div>
          </div>
          <div className="col-span-full">
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
        </div>
      </div>
    </div>
  );
}

export default PathBasics;
