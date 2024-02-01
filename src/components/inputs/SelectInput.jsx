'use client'
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {Fragment} from "react";

const SelectInput = ({options, state, setState, extraClasses, label, isRelative = true}) => {
  const truncatedState = state?.length > 15 ? `${state.substring(0, 9)}...` : state;
  const displayText = truncatedState ? truncatedState : '--Choose--';

  return (
    <div className={`${extraClasses}`}>
      <Listbox value={state} onChange={setState}>
        <div className={isRelative ? 'relative' : ''}>
          {label &&
            <label className='block text-sm font-medium text-gray-500 mb-2 text-start'>{label}</label>}
          <Listbox.Button
            className="relative block w-full p-2.5 rounded-md border border-gray-300 bg-gray-200 focus:border-gray-300 focus-visible:outline-none text-sm text-gray-500 text-start">
            <span className="truncate">{displayText}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-[5] mt-1 max-h-60 min-w-[140px] overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
              {options.map((opt, index) => {
                return <Listbox.Option
                  key={index}
                  className={({active}) =>
                    `relative select-none py-2 cursor-pointer px-4 overflow-ellipsis ${
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                    }`
                  }
                  value={opt}
                >
                  {({selected}) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {opt.name || opt}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectInput;