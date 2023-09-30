/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import PathScheduleParser from '../../../utils/PathScheduleParser';
import { useFetchPathMutation } from '../../../features/paths/pathApiSlice';
import FullScreenLoading from '../../general/FullScreenLoading';
import { setFlash } from '../../../features/notifications/notificationsSlice';

function CurrentUserPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRouteData = location.state?.data;
  const user = useSelector(selectCurrentUser);
  const [fetchPath] = useFetchPathMutation();

  const [path, setPath] = useState(null);

  useEffect(() => {
    if (!fromRouteData) {
      const getCurrentUserPath = async () => {
        const response = await fetchPath(user.id).unwrap();

        if (response.status === 200) {
          setPath(response.data.path);
        } else if (response.status === 204) {
          dispatch(setFlash({ title: 'Information', message: "You haven't created a path yet!", icon: 'info' }));
          navigate('/dashboard/new-path');
        }
      };

      getCurrentUserPath();
    } else {
      setPath(fromRouteData.path);
    }
  }, []);

  const parsedSchedule = (schedule) => {
    if (!schedule.startsWith('custom=')) {
      return schedule;
    }

    return new PathScheduleParser(schedule).parse();
  };

  const parsePolarity = (polarity) => (polarity === 'positive' ? 'Do' : 'Avoid');

  const content = () => {
    if (path) {
      return (
        <div className="overflow-hidden w-2/3 m-auto bg-white shadow sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-base font-semibold leading-7 text-gray-900">{path.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{path.why}</p>
            <div className="flex flex-row">
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{path.start_date}</p>
              {path.end_date && (
                <p className="ml-2 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  {' '}
                  -
                  {path.end_date}
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              { path && path.path_units.map((unit) => (
                <div key={unit.name} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="inline-flex">
                    <dt className="text-sm font-medium text-gray-900 mr-2">{parsePolarity(unit.polarity)}</dt>
                    <dt className="text-sm font-medium text-gray-900">{unit.name}</dt>
                  </div>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parsedSchedule(unit.schedule)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );
    }

    return <FullScreenLoading />;
  };

  return content();
}

export default CurrentUserPath;
