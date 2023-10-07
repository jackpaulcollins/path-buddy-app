/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  toDate, format, addDays, subDays,
} from 'date-fns';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useFetchPathMutation, useValidOnDateMutation } from '../../../features/paths/pathApiSlice';
import { setFlash } from '../../../features/notifications/notificationsSlice';
import { setDate } from '../../../features/paths/pathStatsSlice';
import CurrentUserPathDescriptionSection from './CurrentUserPathDescriptionSection';
import PathUnitSection from './PathUnitSection';
import LeftCarrot from '../../../assets/icons/LeftCarrot';
import RightCarrot from '../../../assets/icons/RightCarrot';
import ComponentLoading from '../../general/ComponentLoading';

function CurrentUserPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRouteData = location.state?.data;
  const user = useSelector(selectCurrentUser);
  const [fetchPath] = useFetchPathMutation();
  const [fetchValidity] = useValidOnDateMutation();
  const [loading, setLoading] = useState(null);
  const [path, setPath] = useState(null);
  const [dateOffest, setDateOffset] = useState(0);

  const calculateDateFromOffest = () => {
    const currentDate = new Date();

    // eslint-disable-next-line max-len
    const offSetDate = dateOffest >= 0 ? addDays(currentDate, dateOffest) : subDays(currentDate, (dateOffest * -1));

    return format(toDate(offSetDate, { timeZone: user.time_zone }), 'MMMM d, yyyy');
  };

  useEffect(() => {
    setLoading(true);
    const date = calculateDateFromOffest();
    dispatch(setDate({ date }));

    if (!fromRouteData) {
      const getCurrentUserPath = async () => {
        if (user) {
          const response = await fetchPath(user.id).unwrap();

          if (response.status === 200) {
            setPath(response.data.path);
          } else if (response.status === 204) {
            dispatch(setFlash({ title: 'Information', message: "You haven't created a path yet!", icon: 'info' }));
            navigate('/dashboard/new-path');
          }
        }
      };

      const getCurrentDateValidity = async (pathId) => {
        const valid = await fetchValidity({ id: pathId, date });
        console.log(valid);
      };

      getCurrentUserPath().then(() => {
        getCurrentDateValidity(path.id, date);
      });
    } else {
      setPath(fromRouteData.path);
      getCurrentDateValidity();
    }

    setLoading(false);
  }, [dateOffest]);

  const handleDateChange = (change) => {
    setDateOffset((prev) => prev + change);
  };

  const content = () => {
    if (path && !loading) {
      return (
        <div className="mt-6 overflow-hidden w-2/3 m-auto bg-white shadow sm:rounded-lg">
          <div className="inline-flex w-full justify-evenly">
            <div onClick={() => handleDateChange(-1)}><LeftCarrot /></div>
            <div className="inline-flex">
              <h1 className="font-semibold">{calculateDateFromOffest()}</h1>
            </div>
            <div onClick={() => handleDateChange(1)}><RightCarrot /></div>
          </div>
          <CurrentUserPathDescriptionSection
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

    return <ComponentLoading />;
  };

  return content();
}

export default CurrentUserPath;
