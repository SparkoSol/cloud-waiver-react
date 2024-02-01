import {Menu, Transition} from '@headlessui/react'
import {Fragment} from 'react'

export default function DropDown({data, Icon = null}) {
  return (
    <Menu as="div">
      <Menu.Button className="relative inline-block text-left mt-1 text-iconGray">
        <Icon
          className="w-5 h-5 hover:text-blue-400"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute z-[1] right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({active}) => (
                <>
                  {data.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.func}
                      className={`${
                        active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {item.text}
                    </button>
                  ))}
                </>
              )}
            </Menu.Item>

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}