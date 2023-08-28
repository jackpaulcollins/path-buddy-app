/* eslint-disable react/prop-types */
import { XCircleIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

function ErrorAlert({ messages, clearErrors }) {
  const show = messages.length > 0;
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon onClick={clearErrors} className="h-5 w-5 text-red-800 hover:cursor-pointer" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There was a problem:
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc space-y-1 pl-5">
                {messages.map((message) => <li key={message}>{message}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default ErrorAlert;
