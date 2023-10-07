/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toDate, format } from 'date-fns';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useFetchPathMutation } from '../../../features/paths/pathApiSlice';
import FullScreenLoading from '../../general/FullScreenLoading';
import { setFlash } from '../../../features/notifications/notificationsSlice';
import { setDate } from '../../../features/paths/pathStatsSlice';
import CurrentUserPathDescriptionSection from './CurrentUserPathDescriptionSection';
import PathUnitSection from './PathUnitSection';

function CurrentUserPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRouteData = location.state?.data;
  const user = useSelector(selectCurrentUser);
  const [fetchPath] = useFetchPathMutation();

  const [path, setPath] = useState(null);

  const date = format(toDate(new Date(), { timeZone: user.timeZone }), 'MMMM d, yyyy');

  useEffect(() => {
    dispatch(setDate({ date }));

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

  const content = () => {
    if (path) {
      return (
        <div className="mt-6 overflow-hidden w-2/3 m-auto bg-white shadow sm:rounded-lg">
          <CurrentUserPathDescriptionSection
            date={date}
            details={{
              name: path.name, why: path.why, startDate: path.start_date, endDate: path.end_date,
            }}
          />
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              { path && path.path_units.map((unit) => (
                <PathUnitSection key={unit.name} unit={unit} />
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
