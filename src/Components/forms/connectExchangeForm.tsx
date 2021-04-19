import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { getExchanges, connectExchange } from '../../actions/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import logo from '../../close-icon.svg'
import Loader from "react-loader-spinner";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import coinbasepro from "../../images/exchangeLogos/coinbasepro.png";

type ConnectExchange = {
    exchange: String,
    api_key: String,
    api_secret: String,
    api_password: String
  }

const ConnectExchangeForm = (props: any) => {

  const people = [
    {
      id: 1,
      name: 'Wade Cooper',
      avatar:
        coinbasepro,
    },
    {
      id: 2,
      name: 'Arlene Mccoy',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Devon Webb',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Coinbase Pro',
      avatar:
      coinbasepro,
    },
    {
      id: 5,
      name: 'Tanya Fox',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Hellen Schmidt',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Caroline Schultz',
      avatar:
        'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 8,
      name: 'Mason Heaney',
      avatar:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      name: 'Claudie Smitham',
      avatar:
        'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 10,
      name: 'Emil Schaefer',
      avatar:
        'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [selected, setSelected] = useState(people[3])

    const [connectedExchangeState, setConnectedExchangeState] = useState<ConnectExchange>({
        exchange: '',
        api_key: '',
        api_secret: '',
        api_password: ''
      })

      useEffect(() => {
        if (props.exchanges.length > 0) {
          setConnectedExchangeState({
            ...connectedExchangeState,
            exchange: props.exchanges[0].exchange_id
          })
        }
      }, []);

      useEffect(() => {
        if (props.connectedExchanges.length > 0 && !props.isModal) {
          props.next()
        }
      }, [props.connectedExchanges])

    const exchangeList = props.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectExchange({ connectedExchangeState })
    }

    return <>
    <div className="relative">
      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Connect with your Exchange</h3>
    </div>
    <div className="mt-6">
      <div className="mt-6 space-y-6">
        <div>
          <div className="">
            <div className="">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="iinline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">Exchange</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full dark:bg-gray-700 border dark:border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className="ml-3 block truncate dark:text-gray-200">{selected.name}</span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        static
                        className="absolute z-50 mt-1 w-full dark:bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {people.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate dark:text-gray-200')}
                                  >
                                    {person.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'dark:text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            </div>
          </div>
        </div>
        <div>
          <div className="flex align-middle mb-1">
            <label htmlFor="api_key" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">API Key</label>
          </div>
          <div className="flex items-stretch relative">
            <input
              name="api_key" id="api_key" placeholder="Enter API Key" autoComplete="api_key"
              className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border dark:border-gray-700 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
              type="text" />
          </div>
        </div>
        <div>
          <div className="flex align-middle mb-1">
            <label htmlFor="api_secret" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">API Secret</label>
          </div>
          <div className="flex items-stretch relative">
            <input
              name="api_secret" id="api_secret" placeholder="Enter API Secret" autoComplete="api_secret"
              className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border dark:border-gray-700 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
              type="text" />
          </div>
        </div>
        <div>
          <div className="flex align-middle mb-1">
            <label htmlFor="passphrase" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">Passphrase</label>
          </div>
          <div className="flex items-stretch relative">
            <input
              name="passphrase" id="passphrase" placeholder="Enter Passphrase" autoComplete="passphrase"
              className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border dark:border-gray-700 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
              type="text" />
          </div>
        </div>
        
      </div>
    </div>

    {/* <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        {props.isModal && 
          <button disabled={props.isLoading} onClick={() => props.handleClose()} className="float-right">
          <img src={logo} alt="My Happy SVG"/>
          </button>
          }
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Connect with your Coinbase Pro Account
            </h3>
          </div>
        <form onSubmit={handleSubmit} method="POST">
            <div>
            <label htmlFor="exchange" className="block text-sm mt-3 font-medium text-gray-700">Exchange</label>
            <select
                onChange={(e: any): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, exchange: trimmed })}
                }
            id="exchange" name="exchange" autoComplete="exchange" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {exchangeList}
            </select>
            </div>
            <div>
            <label htmlFor="api_key" className="block text-sm mt-3 font-medium text-gray-700">API Key</label>
            <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
            }
            type="text" name="api_key" id="api_key" placeholder="Enter API Key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div> 
            <div>
            <label htmlFor="api_secret" className="block text-sm mt-3 font-medium text-gray-700">API Secret</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
            }
            type="text" name="api_secret" id="api_secret" placeholder="Enter API Secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <div>
            <label htmlFor="api_password" className="block text-sm mt-3 font-medium text-gray-700">API Password</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_password: trimmed })}
            }
            type="password" name="api_password" id="api_password" placeholder="Enter API Password" autoComplete="api_password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <div className="mt-3 sm:mt-6">
                <button disabled={props.isLoading} type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span>Submit</span>}
                </button>
            </div>
        </form>
        
    </div> */}
</>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading,
    formSubmitted: state.common.formSubmitted,
    connectedExchanges: state.common.connectedExchanges
  });

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExchangeForm);