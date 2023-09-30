/* eslint-disable */
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFlash } from '../../features/notifications/notificationsSlice';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Notificaton({ message, icon, title }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const dismiss = () => {
    dispatch(clearFlash());
    setShow(false);
  }

  const renderIcon = () => {
    switch (icon) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {renderIcon()}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        dismiss()
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
