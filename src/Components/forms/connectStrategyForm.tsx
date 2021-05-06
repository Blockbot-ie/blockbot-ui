import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { getStrategies, getStrategyPairs, connectStrategy, connectExchange, getConnectedExchanges, getConnectedStrategies } from '../../actions/common';
import { createMessage } from '../../actions/messages';
import logo from '../../close-icon.svg'
import Loader from 'react-loader-spinner';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

type ConnectStrategy = {
    strategy: String,
    user_exchange_account: String,
    pair: String,
    initial_first_symbol_balance: number,
    initial_second_symbol_balance: number,
    current_currency: String,
    current_currency_balance: number,
    ticker_1: string,
    ticker_2: string
  }

const ConnectStrategyForm = (props: any) => {
  
    const [connectedStrategyState, setConnectedStrategyState] = useState<ConnectStrategy>({
      strategy: '',
      user_exchange_account: '',
      pair: '',
      initial_first_symbol_balance: null,
      initial_second_symbol_balance: null,
      current_currency: '',
      current_currency_balance: 0.0,
      ticker_1: '',
      ticker_2: ''
    })

    const [strategies, setStrategies] = useState([])

    const [connectedExchanges, setConnectedExchanges] = useState([])

    const [strategyPairs, setStrategyPairs] = useState([])

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
  
    const [selectedStrategy, setSelectedStrategy] = useState(null)

    const [selectedExchangeAccount, setSelectedExchangeAccount] = useState(null)

    const [selectedStrategyPairs, setSelectedStrategyPairs] = useState(null)


    useEffect(() => {

      if (props.strategies.length < 1) props.getStrategies();

      if (props.strategyPairs.length < 1) props.getStrategyPairs();

      if (props.connectedExchanges.length < 1) props.getConnectedExchanges();

      if (props.connectedStrategies.length < 1) props.getConnectedStrategies();
    }, [])

    useEffect(() => {
      if (props.strategies.length > 0) {
        setConnectedStrategyState({
          ...connectedStrategyState,
          strategy: props.strategies[0].strategy_id,
        })

        props.strategies.map(strategy => {

          setStrategies(strategies => [...strategies, {
            id: strategy.strategy_id,
            name: strategy.name
          }])
        })

        setSelectedStrategy({
          id: props.strategies[0].strategy_id,
          name: props.strategies[0].name
        })
      }
    }, [props.strategies])

    useEffect(() => {
      if (props.connectedExchanges.length > 0) {
        setConnectedStrategyState({
          ...connectedStrategyState,
          user_exchange_account: props.connectedExchanges[0].exchange.user_exchange_account_id,
        })

        props.connectedExchanges.map(exchange => {
          setConnectedExchanges([...connectedExchanges, {
            id: exchange.exchange.user_exchange_account_id,
            name: exchange.exchange.name
          }])
        })

        setSelectedExchangeAccount({
          id: props.connectedExchanges[0].exchange.user_exchange_account_id,
          name: props.connectedExchanges[0].exchange.name,
        })

      }  
    }, [props.connectedExchanges])

    useEffect(() => {
      if (props.strategyPairs.length > 0) {
        const filteredPairs = props.strategyPairs.filter(x => x.strategy_id == props.strategies[0].strategy_id)
        setConnectedStrategyState({
          ...connectedStrategyState,
          pair: filteredPairs[0].symbol,
          current_currency: filteredPairs[0].ticker_2,
          ticker_1: filteredPairs[0].ticker_1,
          ticker_2: filteredPairs[0].ticker_2
        })
        props.strategyPairs.map((pair, i) => {

          setStrategyPairs(strategyPairs => [...strategyPairs, {
            id: pair.pair_id,
            strategy_id: pair.strategy_id,
            pair: pair.symbol
          }])
        })
        
        setSelectedStrategyPairs({
          id: filteredPairs[0].strategy_id,
          pair: filteredPairs[0].symbol
        })
      }  
    }, [props.strategyPairs])

    useEffect(() => {
      if (props.connectedStrategies.length > 0 && !props.isModal) {
        props.next()
      }
    }, [props.connectedStrategies])

    

    const onStrategyChange = (e: any) => {
      
      setSelectedStrategy(e)
      if (props.strategyPairs.length > 0) {
        
          const filteredPairs = props.strategyPairs.filter(x => x.strategy_id == e.id)

          setSelectedStrategyPairs({
            id: filteredPairs[0].strategy_id,
            strategy_id: filteredPairs[0].strategy_id,
            pair: filteredPairs[0].symbol
          })
          
          setConnectedStrategyState({
            ...connectedStrategyState,
            strategy: e.id,
            ticker_1: filteredPairs[0].ticker_1,
            ticker_2: filteredPairs[0].ticker_2,
            current_currency: filteredPairs[0].ticker_2,
            current_currency_balance: 0.00
          })
          console.log(selectedStrategyPairs)
      }
    }

    const handleCurrentCurrencyChange = (e: any) => {
      setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0, initial_first_symbol_balance: 0, initial_second_symbol_balance: 0})
    }

    const handleExchangeAccountChange = (e: any) => {
      console.log(e)
      setConnectedStrategyState({ ...connectedStrategyState, user_exchange_account: e.id, current_currency_balance: 0.00 })
      setSelectedExchangeAccount(e)
    }

    const handleStrategyPairChange = (e: any) => {
      console.log(e)
      let symbol = e.pair
      let i = symbol.indexOf('/');
      let ticker_1 = symbol.substring(0, i);
      let ticker_2 = symbol.substring(i+1, symbol.length);
      const trimmed = e.pair.trim()
      setConnectedStrategyState({ ...connectedStrategyState, pair: trimmed, ticker_1: ticker_1, ticker_2: ticker_2, current_currency: ticker_2, current_currency_balance: 0.00 })
      setSelectedStrategyPairs(e)
    }


    const handleCurrencyAmountChange = (e: any) => {
      const value = e.target.value
      const pair = connectedStrategyState.pair;
      let i = pair.indexOf('/');
      let symbol1 = pair.substring(0, i);
      let symbol2 = pair.substring(i+1, pair.length);
      if (connectedStrategyState.current_currency == symbol1) {
          setConnectedStrategyState({ 
          ...connectedStrategyState, 
          initial_first_symbol_balance: parseFloat(value), 
          initial_second_symbol_balance: 0, 
          current_currency_balance: parseFloat(value) 
        })
      }
      if (connectedStrategyState.current_currency == symbol2) {
        setConnectedStrategyState({ 
          ...connectedStrategyState, 
          initial_second_symbol_balance: parseFloat(value), 
          initial_first_symbol_balance: 0,
          current_currency_balance: parseFloat(value) 
        })
      }
    }

    const setMax = () => {
      props.connectedExchanges.map(exchange => {
        if (exchange.exchange.user_exchange_account_id == connectedStrategyState.user_exchange_account) {
          const pair = connectedStrategyState.pair;
          let i = pair.indexOf('/');
          let symbol1 = pair.substring(0, i);
          let symbol2 = pair.substring(i+1, pair.length);
          if (connectedStrategyState.current_currency == symbol1) {
            setConnectedStrategyState({
              ...connectedStrategyState,
              current_currency_balance: exchange.available_balances[connectedStrategyState.current_currency.toString()],
              initial_first_symbol_balance: exchange.available_balances[connectedStrategyState.current_currency.toString()],
              initial_second_symbol_balance: 0,
            })
          }
          if (connectedStrategyState.current_currency == symbol2) {
            setConnectedStrategyState({ 
              ...connectedStrategyState,
              current_currency_balance: exchange.available_balances[connectedStrategyState.current_currency.toString()],
              initial_first_symbol_balance: 0,
              initial_second_symbol_balance: exchange.available_balances[connectedStrategyState.current_currency.toString()],
            })
          } 
        }
      })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const pairDetails = props.strategyPairs.filter(x => x.strategy_id == connectedStrategyState.strategy && x.symbol == connectedStrategyState.pair)[0]
        console.log(pairDetails)
        if (connectedStrategyState.current_currency == pairDetails.ticker_1) {
          if (connectedStrategyState.current_currency_balance < pairDetails.ticker_1_min_value) {
            props.createMessage({ belowMinAmount: 'Minimum Amount is ' + pairDetails.ticker_1_min_value + pairDetails.ticker_1});
          }
          else {
            props.connectStrategy({ connectedStrategyState }) 
          }
        }
        if (connectedStrategyState.current_currency == pairDetails.ticker_2) {
          if (connectedStrategyState.current_currency_balance < pairDetails.ticker_2_min_value) {
            props.createMessage({ belowMinAmount: 'Minimum Amount is '  + pairDetails.ticker_2_min_value + pairDetails.ticker_2});
          }
          else {
            props.connectStrategy({ connectedStrategyState }) 
          }
        }
    } 
    return <>
    <div className="max-w-3xl px-4 sm:px-6 md:px-8">
      <div className="relative">
        <h3 className="text-lg leading-6 font-medium text-gray-900 text-white">Connect with a Strategy</h3>
      </div>
      <div className="mt-2">
        <div className="space-y-6">
        <form onSubmit={handleSubmit}>
        <div>
        {strategies.length > 0 && selectedStrategy != null ?
            <Listbox value={selectedStrategy} onChange={onStrategyChange}>
              {({ open }) => (
                <>
                  <Listbox.Label className="iinline-flex text-sm font-medium leading-5 text-white">Strategy</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-gray-700 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <img src={selectedStrategy.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                        <span className="ml-3 block truncate text-gray-200">{selectedStrategy.name}</span>
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
                        className="absolute z-50 mt-1 w-full bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {strategies.map((strategy) => (
                          <Listbox.Option
                            key={strategy.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={strategy}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-gray-200')}
                                  >
                                    {strategy.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
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
            :
            <Loader type="Circles" color="#00BFFF" height={24} width={24}/>
            }
        </div>
        <div>
        {connectedExchanges.length > 0 && selectedExchangeAccount != null ?
            <Listbox value={selectedExchangeAccount} onChange={handleExchangeAccountChange}>
              {({ open }) => (
                <>
                  <Listbox.Label className="iinline-flex text-sm mt-4 font-medium leading-5 text-white">Exchange Account</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-gray-700 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate text-gray-200">{selectedExchangeAccount.name}</span>
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
                        className="absolute z-50 mt-1 w-full bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {connectedExchanges.map((exchange) => (
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
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-gray-200')}
                                  >
                                    {exchange.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
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
            :
            <Loader type="Circles" color="#00BFFF" height={24} width={24}/>
            }
        </div>
        <div>
        {strategyPairs.length > 0 && selectedStrategyPairs != null ?
            <Listbox value={selectedStrategyPairs} onChange={handleStrategyPairChange}>
              {({ open }) => (
                <>
                  <Listbox.Label className="iinline-flex text-sm mt-4 font-medium leading-5 text-white">Pair</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-gray-700 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        
                        <span className="ml-3 block truncate text-gray-200">{selectedStrategyPairs.pair}</span>
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
                        className="absolute z-50 mt-1 w-full bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {strategyPairs.filter(x => x.strategy_id == selectedStrategy.id).map((pair) => (
                          <Listbox.Option
                            key={pair.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={pair}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-gray-200')}
                                  >
                                    {pair.pair}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
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
            :
            <Loader type="Circles" color="#00BFFF" height={24} width={24}/>
            }
        </div>
        <div>
          <div className="flex align-middle mb-1 mt-3">
            <label htmlFor="price" className="inline-flex text-sm font-medium leading-5 text-white">Amunt</label>
          </div>
          <div className="mt-1 relative rounded-md shadow-sm">
              {/* <button type="button" onClick={() => setMax()} className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">Max</button> */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <a className="text-white sm:text-sm" onClick={setMax}>Max</a>
              </div>
              
            <input
            
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm bg-gray-700 text-white border-gray-300 rounded-md"
              value={isNaN(connectedStrategyState.current_currency_balance) ? 0.00 : connectedStrategyState.current_currency_balance}
              onChange={handleCurrencyAmountChange}
              step={0.000001}
              type="number" name="current_currency_balance" id="current_currency_balance" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="current_currency" className="sr-only">Currency</label>
              <select onChange={handleCurrentCurrencyChange} id="current_currency" name="current_currency" className="focus:ring-gray-300 focus:border-gray-300 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-white sm:text-sm rounded-md">
                <option selected={connectedStrategyState.current_currency == connectedStrategyState.ticker_1}>{connectedStrategyState.ticker_1}</option>
                <option selected={connectedStrategyState.current_currency == connectedStrategyState.ticker_2}>{connectedStrategyState.ticker_2}</option>
              </select>
            </div>
          </div>
        </div>
          <div className="flex justify-end mt-8 pt-5 space-x-3">
            <button className="flex-shrink-0 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-gray-700 transition bg-indigo-500 bg-indigo-500 active:bg-indigo-500 active:bg-indigo-500 border-transparent font-medium  hover:bg-indigo-600 hover:bg-indigo-400 px-4 py-2 rounded-md shadow-sm text-base text-white" type="submit">
                { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span className="flex-1 flex items-center justify-center space-x-2">Submit</span>}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
</>
}

const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    isLoading: state.common.isLoading
  });

export default connect(mapStateToProps, { createMessage, getStrategies, getStrategyPairs, connectStrategy, connectExchange, getConnectedExchanges, getConnectedStrategies })(ConnectStrategyForm);