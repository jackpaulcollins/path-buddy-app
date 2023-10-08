/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  toDate, format, addDays, subDays,
} from 'date-fns';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useFetchPathMutation, useValidOnDateMutation, useCurrentStreakMutation } from '../../../features/paths/pathApiSlice';
import { setFlash } from '../../../features/notifications/notificationsSlice';
import { setDate } from '../../../features/paths/pathStatsSlice';
import CurrentUserPathDescriptionSection from './CurrentUserPathDescriptionSection';
import PathUnitSection from './PathUnitSection';
import LeftCarrot from '../../../assets/icons/LeftCarrot';
import RightCarrot from '../../../assets/icons/RightCarrot';
import FullScreenLoading from '../../general/FullScreenLoading';
import Check from '../../../assets/icons/Check';
import X from '../../../assets/icons/X';

function CurrentUserPath() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromRouteData = location.state?.data;
  const user = useSelector(selectCurrentUser);
  const [fetchPath] = useFetchPathMutation();
  const [fetchValidity] = useValidOnDateMutation();
  const [fetchStreak] = useCurrentStreakMutation();
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState(null);
  const [dateOffest, setDateOffset] = useState(0);
  const [validForDate, setValidForDate] = useState(null);
  const [reFetchState, setReFetchState] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(null);

  const reFetch = () => {
    setReFetchState((prevState) => !prevState);
  };

  const calculateDateFromOffest = () => {
    const currentDate = new Date();
    // eslint-disable-next-line max-len
    const offSetDate = dateOffest >= 0 ? addDays(currentDate, dateOffest) : subDays(currentDate, (dateOffest * -1));

    return format(toDate(offSetDate, { timeZone: user.time_zone }), 'MMMM d, yyyy');
  };

  const date = calculateDateFromOffest();

  const getCurrentUserPath = async () => {
    const response = await fetchPath(user.id).unwrap();
    if (response.status === 200) {
      setPath(response.data.path);
    } else if (response.status === 204) {
      dispatch(setFlash({ title: 'Information', message: "You haven't created a path yet!", icon: 'info' }));
      navigate('/dashboard/new-path');
    }
  };

  const getCurrentDateValidity = async (pathId, currDate) => {
    const response = await fetchValidity({ id: pathId, date: currDate }).unwrap();
    const { validity } = response.data;
    setValidForDate(validity);
  };

  const getCurrentStreak = async (pathId) => {
    const response = await fetchStreak({ id: pathId }).unwrap();
    const { streak } = response.data;
    setCurrentStreak(streak);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(setDate({ date }));

    const fetchData = async () => {
      if (!fromRouteData) {
        await getCurrentUserPath();
      } else {
        setPath(fromRouteData.path);
      }
    };

    fetchData();
    setLoading(false);
  }, [dateOffest]);

  const handleDateChange = (change) => {
    setDateOffset((prev) => prev + change);
  };

  useEffect(() => {
    const fetchValid = async () => {
      await getCurrentDateValidity(path.id, date);
    };

    const fetchCurrentStreak = async () => {
      await getCurrentStreak(path.id);
    };

    if (path) {
      fetchValid();
      fetchCurrentStreak();
    }
  }, [date, path, reFetchState]);

  const renderValidity = () => (validForDate ? <Check extraClasses="text-green-600" /> : <X extraClasses="text-red-600" />);

  const content = () => {
    if (path && !loading) {
      return (
        <div className="mt-6 overflow-hidden w-2/3 m-auto bg-white shadow sm:rounded-lg">
          <div className="inline-flex w-full justify-evenly">
            <div onClick={() => handleDateChange(-1)}><LeftCarrot /></div>
            <div className="inline-flex">
              {validForDate != null ? renderValidity() : ''}
              <h1 className="font-semibold">{calculateDateFromOffest()}</h1>
            </div>
            <div onClick={() => handleDateChange(1)}><RightCarrot /></div>
          </div>
          <CurrentUserPathDescriptionSection
            details={{
              name: path.name,
              why: path.why,
              startDate: path.start_date,
              endDate: path.end_date,
              streak: currentStreak,
            }}
          />
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              { path && path.path_units.map((unit) => (
                <PathUnitSection key={unit.name} unit={unit} reFetchPath={reFetch} />
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
