import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import TextBubble from '../../../assets/icons/TextBubble';
import PathStreakSection from './PathStreakSection';

function CurrentUserPathDescriptionSection({ details }) {
  CurrentUserPathDescriptionSection.propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      why: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
  };

  const {
    name, why, startDate, endDate,
  } = details;

  return (

    <div className="flex flex-row px-6 items-center justify-between rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
      <dl className="flex flex-col items-start">
        <div className="mt-6 inline-flex">
          <dt>
            <span className="sr-only">Client</span>
          </dt>
          <dd className="text-sm font-medium leading-6 text-gray-900">{name}</dd>
        </div>
        <div className="mt-4 inline-flex">
          <dt>
            <span className="sr-only">Start Date</span>
            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd className="text-sm leading-6 text-gray-500">
            <time dateTime={startDate}>{startDate}</time>
          </dd>
          <dd className="text-sm leading-6 text-gray-500">
            <time dateTime={endDate}>{endDate}</time>
          </dd>
        </div>
        <div className="mt-4 inline-flex">
          <dt className="">
            <span className="sr-only">Status</span>
          </dt>
          <TextBubble extraclasses="text-blue-300" />
          <dd className="text-sm leading-6 text-gray-500">{why}</dd>
        </div>
      </dl>
      <div className="w-1/8">
        <PathStreakSection />
      </div>
    </div>
  );
}

export default CurrentUserPathDescriptionSection;
