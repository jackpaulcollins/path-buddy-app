/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectCurrentPathDate } from '../../../features/paths/pathStatsSlice';
import CircleCheck from '../../../assets/icons/CircleCheck';
import CircleX from '../../../assets/icons/CircleX';
import ThumbsUp from '../../../assets/icons/ThumbsUp';
import ThumbsDown from '../../../assets/icons/ThumbsDown';
import PathScheduleParser from '../../../utils/PathScheduleParser';
import { useCreatePathUnitReportMutation, useGetPathUnitReportMutation } from '../../../features/path_unit_reports/pathUnitReportApiSlice';
import ComponentLoading from '../../general/ComponentLoading';

function PathUnitSection({ unit }) {
  PathUnitSection.propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      polarity: PropTypes.string.isRequired,
    }),
  };

  const [createReport] = useCreatePathUnitReportMutation();
  const [getReport] = useGetPathUnitReportMutation();
  const [reportState, setReportState] = useState();
  const [loading, setLoading] = useState(true);
  const date = useSelector(selectCurrentPathDate);

  const {
    id, name, schedule, polarity,
  } = unit;

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await getReport({
        id,
        date,
      }).unwrap();
      const { report } = response.data;
      setReportState(report?.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchReport();
    setLoading(false);
  }, [date]);

  const createNewReport = async (status) => {
    await createReport({
      path_unit_report: {
        path_unit_id: id,
        date,
        status,
      },
    });
    fetchReport();
  };

  const parsedSchedule = (unitSchedule, unitPolarity) => {
    if (!unitSchedule.startsWith('custom=')) {
      return new PathScheduleParser(unitSchedule, unitPolarity).periodDisplay();
    }

    return new PathScheduleParser(schedule, polarity).parse();
  };

  const maybeMarkSelected = (passOrFail) => (passOrFail === reportState ? '#7173f5' : 'none');

  const renderPathActionSection = () => (
    <div className="w-1/2 inline-flex justify-evenly">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          alert('are you sure you want to mark this completed?');
          createNewReport('pass');
        }}
      >
        <ThumbsUp extraClasses={maybeMarkSelected('pass')} />
      </div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          alert('are you sure you want to mark this failed?');
          createNewReport('fail');
        }}
      >
        <ThumbsDown extraClasses={maybeMarkSelected('fail')} />
      </div>
    </div>
  );

  const parsePolarity = (unitPolarity) => (unitPolarity === 'positive' ? <CircleCheck extraClasses="text-green-600" /> : <CircleX extraClasses="text-red-600" />);

  if (loading) {
    return (
      <div className="h-full p-2 flex justify-center w-full">
        <ComponentLoading />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-48 sm:px-6">
      <div className="inline-flex sm:grid-cols-2 gap-4">
        <div>{parsePolarity(polarity)}</div>
        <dt className="text-sm font-medium text-gray-900">{name}</dt>
      </div>
      <div className="inline-flex">
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parsedSchedule(schedule, polarity)}</dd>
      </div>
      <div>{renderPathActionSection()}</div>
    </div>
  );
}

export default PathUnitSection;
