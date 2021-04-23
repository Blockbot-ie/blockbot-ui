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

  useEffect(() => {
    if (props.exchanges.length < 1) props.getExchanges();
  })

  const exchanges = []
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [selected, setSelected] = useState(null)

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

          if (props.currentExchange != null) {
            const currentExchangeProps = props.exchanges.filter(ex => ex.exchange_id == props.currentExchange)[0]
            setSelected({
              id: currentExchangeProps.exchange_id,
              name: currentExchangeProps.display_name,
              image: require('../../images/exchangeLogos/' + currentExchangeProps.name + '.png').default
            })
          } else {
            setSelected({
              id: props.exchanges[0].exchange_id,
              name: props.exchanges[0].display_name,
              image: require('../../images/exchangeLogos/' + props.exchanges[0].name + '.png').default
            })
          }
        }
      }, [props.exchanges]);

      useEffect(() => {
        // if (props.connectedExchanges.length > 0 && !props.isModal) {
        //   props.next()
        // }
      }, [props.connectedExchanges])

    const exchangeList = props.exchanges.map((exchange, i) => 
      exchanges.push({
        id: exchange.exchange_id,
        name: exchange.display_name,
        image: require('../../images/exchangeLogos/' + exchange.name + '.png').default
      })
    )
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setConnectedExchangeState({
          ...connectedExchangeState,
          exchange: selected.id
        })

        props.connectExchange({ connectedExchangeState })
    }

    return <>
    <div className="max-w-3xl mx-auto px-4 mt-8 sm:px-6 md:px-8">
      <div className="relative">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Connect with your Exchange</h3>
      </div>
      <div className="mt-2">
        <div className="space-y-6">
          {exchanges.length > 0 && selected != null ?
          <form onSubmit={handleSubmit}>
          <div>
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="iinline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">Exchange</Listbox.Label>
                    <div className="mt-1 relative">
                      <Listbox.Button className="relative w-full dark:bg-gray-700 border-0 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span className="flex items-center">
                          <img src={selected.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
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
                          {exchanges.map((exchange) => (
                            <Listbox.Option
                              key={exchange.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={exchange}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img src={exchange.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                    <span
                                      className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate dark:text-gray-200')}
                                    >
                                      {exchange.name}
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
          <div>
            <div className="flex align-middle mb-1 mt-3">
              <label htmlFor="api_key" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">API Key</label>
            </div>
            <div className="flex items-stretch relative">
              <input
                name="api_key" id="api_key" placeholder="Enter API Key"
                className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border-0 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
                type="text" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
              }/>
            </div>
          </div>
          <div>
            <div className="flex align-middle mb-1 mt-3">
              <label htmlFor="api_secret" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">API Secret</label>
            </div>
            <div className="flex items-stretch relative">
              <input
                name="api_secret" id="api_secret" placeholder="Enter API Secret" autoComplete="api_secret"
                className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border-0 dark:border-gray-700 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
                type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
              } />
            </div>
          </div>
          <div>
            <div className="flex align-middle mb-1 mt-3">
              <label htmlFor="passphrase" className="inline-flex text-sm font-medium leading-5 text-gray-700 dark:text-gray-200">Passphrase</label>
            </div>
            <div className="flex items-stretch relative">
              <input
                name="passphrase" id="passphrase" placeholder="Enter Passphrase" autoComplete="passphrase"
                className="block w-full py-2 rounded-md transition dark:bg-gray-800 disabled:opacity-25 border-0 focus:border-gray-400 focus:outline-none focus:ring-0 duration-150 ease-in-out sm:text-sm sm:leading-5 dark:text-white shadow-sm"
                type="password" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_password: trimmed })}
              }/>
            </div>
          </div>
            <div className="flex justify-end mt-8 pt-5 space-x-3">
              <button className="flex-shrink-0 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-700 transition bg-indigo-500 dark:bg-indigo-500 active:bg-indigo-500 dark:active:bg-indigo-500 border-transparent font-medium  hover:bg-indigo-600 dark:hover:bg-indigo-400 px-4 py-2 rounded-md shadow-sm text-base text-white" type="submit">
                  { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span className="flex-1 flex items-center justify-center space-x-2">Submit</span>}
              </button>
            </div>
          </form>
          :
          <Loader type="Circles" color="#00BFFF" height={24} width={24}/>
          }
        </div>
      </div>
    </div>
</>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading,
    formSubmitted: state.common.formSubmitted,
    connectedExchanges: state.common.connectedExchanges
  });

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExchangeForm);