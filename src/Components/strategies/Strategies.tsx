import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { connect } from 'react-redux';
import { getConnectedExchanges,getStrategies, getConnectedStrategies, getStrategyPairs, topUpStrategy } from '../../actions/common';
import ConnectStrategyModalForm from '../forms/connectStrategyModalForm';
import Nav from '../Nav';
import '../../fontawesome';
import logo from '../../close-icon.svg'
import Loader from 'react-loader-spinner';
import { createMessage } from '../../actions/messages';
import { Link } from 'react-router-dom';

const Strategies = (props: any) => {

  const [currentStrategy, setCurrentStrategyState] = useState({
    strategy_pair_id: '',
    strategy_id: '',
    pair: '',
    current_currency: null
  });

  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const [topUpModalOpen, setTopUpModalOpen] = React.useState(false);

  const [topUpAmount, setTopUpAmount] = useState({
    strategy_pair_id: '',
    currency: '',
    amount: null,
    ticker_1: '',
    ticker_2: ''
  })

  useEffect(() => {

    if (props.connectedExchanges.length < 1) props.getConnectedExchanges();

    props.getConnectedStrategies();
    if (props.connectedStrategies.length > 0) {
      setCurrentStrategyState({
        ...currentStrategy,
        strategy_pair_id: props.connectedStrategies[0].id,
        strategy_id: props.connectedStrategies[0].strategy.strategy_id,
        pair: props.connectedStrategies[0].pair, 
        current_currency: props.connectedStrategies[0].current_currency
      })
    }
  }, [])

  useEffect(() => {
    if (props.connectedStrategies.length > 0) {
      setCurrentStrategyState({
        ...currentStrategy,
        strategy_pair_id: props.connectedStrategies[0].id,
        strategy_id: props.connectedStrategies[0].strategy.strategy_id,
        pair: props.connectedStrategies[0].pair,
        current_currency: props.connectedStrategies[0].current_currency
      })
      const pair = props.connectedStrategies[0].pair
      let i = pair.indexOf('/')
      let ticker_1 = pair.substring(0, i)
      let ticker_2 = pair.substring(i+1, pair.length)
      setTopUpAmount({
        ...topUpAmount,
        strategy_pair_id: props.connectedStrategies[0].id,
        currency: props.connectedStrategies[0].current_currency,
        ticker_1: ticker_1,
        ticker_2: ticker_2
    })
    }
    }, [props.connectedStrategies]);

    useEffect(() => { 
      setTopUpModalOpen(false)
    }, [props.formSubmitted])

    const handleChnange = (e: any) => {
      const strategy = props.connectedStrategies.filter(strategy => strategy.id == e)[0]
      setCurrentStrategyState({
        ...currentStrategy,
        strategy_pair_id: strategy.id,
        pair: strategy.pair,
        current_currency: strategy.current_currency
      })
      const pair = strategy.pair
      let i = pair.indexOf('/')
      let ticker_1 = pair.substring(0, i)
      let ticker_2 = pair.substring(i+1, pair.length)
      setTopUpAmount({
        ...topUpAmount,
        strategy_pair_id: strategy.id,
        currency: strategy.current_currency,
        amount: 0,
        ticker_1: ticker_1,
        ticker_2: ticker_2
    })
    }

    const handleOnChange = (e: any) => {
      setTopUpAmount({
          ...topUpAmount,
          currency: e.target.value
      })
    }

    const handleClose = ()=> {
      setAddModalOpen(false)
      setTopUpModalOpen(false)
    }
  
    const handleSubmit = (e: any) => {
      e.preventDefault()
      const pairDetails = props.strategyPairs.filter(x => x.strategy_id == currentStrategy.strategy_id && x.symbol == currentStrategy.pair)[0]
      
      if (currentStrategy.current_currency != topUpAmount.currency) {
        if (topUpAmount.ticker_1 == topUpAmount.currency) {
          if (topUpAmount.amount < pairDetails.ticker_1_min_value) {
            props.createMessage({ belowMinAmount: 'Please increase the inital amount' });
          }
          else {
            const dataToSend = {
              strategy_pair_id: topUpAmount.strategy_pair_id,
              currency: topUpAmount.currency,
              amount: topUpAmount.amount
            }
            props.topUpStrategy({ dataToSend })
          }
        }
        if (topUpAmount.ticker_2 == topUpAmount.currency) {
          if (topUpAmount.amount < pairDetails.ticker_2_min_value) {
            props.createMessage({ belowMinAmount: 'Please increase the inital amount' });
          }
          else {
            const dataToSend = {
              strategy_pair_id: topUpAmount.strategy_pair_id,
              currency: topUpAmount.currency,
              amount: topUpAmount.amount
            }
            props.topUpStrategy({ dataToSend })
          }
        }
      }
      else {
        const dataToSend = {
          strategy_pair_id: topUpAmount.strategy_pair_id,
          currency: topUpAmount.currency,
          amount: topUpAmount.amount
        }
        props.topUpStrategy({ dataToSend })
      }

      
      
    }
  
  const connectedStrategies = props.connectedStrategies.map((strategy, i) => 
    <option key={i} value={strategy.id}>{strategy.pair} - {strategy.strategy.name}</option>
  )

  const strategyDetails = () => {
    return props.connectedStrategies.map((strategy) =>
      strategy.id == currentStrategy.strategy_pair_id &&
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Strategy Pair Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
          <button onClick={() => setTopUpModalOpen(true)} type="submit" className="float-right inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Top up
        </button>
        </p>    
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Strategy
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {strategy.strategy.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Account Name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {strategy.user_exchange_account.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Pair
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {strategy.pair}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Current Currency
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {strategy.current_currency}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Current Currency Balance
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {strategy.current_currency_balance}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    )
  }
     
    return <>
    {(props.connectedExchanges.length < 1) ?
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <header className="max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between md:h-16">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">Strategy Manager</h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              <Link to="/connect-exchange" type="button" className="flex-shrink-0 inline-flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition border-transparent font-medium  px-6 py-3 relative rounded-md shadow-sm text-base text-white">
                <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-500 to-violet-500"></span>
                <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-600 dark:from-teal-400 to-violet-600 dark:to-violet-400 opacity-0 transition hover:opacity-100 active:opacity-0"></span>
                <span className="relative pointer-events-none">
                  <span className="flex-1 flex items-center justify-center space-x-2">Connect</span>
                </span>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
          <span className="flex justify-center mt-16">
            <span className="flex flex-col items-middle max-w-sm space-y-8">
              <span>
                <h3 className="w-full text-2xl leading-8 font-semibold dark:text-white">You have not connected with any Exchange</h3>
                <p className="w-full leading-6 font-normal dark:text-gray-400">Generate api keys from your preferred exchange to start adding strategies</p>
              </span>
              <div className="flex flex-col items-stretch">
                <Link to="/connect-exchange" className="flex-shrink-0 inline-flex items-center justify-center border-0 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition bg-violet-500 dark:bg-violet-500 active:bg-violet-500 dark:active:bg-violet-500 border-transparent font-medium  hover:bg-violet-600 dark:hover:bg-violet-400 px-4 py-2 rounded-md shadow-sm text-base text-white">
                  <span className="flex-1 flex items-center justify-center space-x-2">Connect</span>
                </Link>
              </div>
            </span>
          </span>
        </div>
      </div>
      :
       props.connectedStrategies.length < 1 ?
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <header className="max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between md:h-16">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">Strategy Manager</h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                <Link to="/connect-strategy" type="button" className="flex-shrink-0 inline-flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition border-transparent font-medium  px-6 py-3 relative rounded-md shadow-sm text-base text-white">
                  <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-500 to-violet-500"></span>
                  <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-600 dark:from-teal-400 to-violet-600 dark:to-violet-400 opacity-0 transition hover:opacity-100 active:opacity-0"></span>
                  <span className="relative pointer-events-none">
                    <span className="flex-1 flex items-center justify-center space-x-2">Connect</span>
                  </span>
                </Link>
              </div>
            </div>
          </header>
          <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
            <span className="flex justify-center mt-16">
              <span className="flex flex-col items-middle max-w-sm space-y-8">
                <span>
                  <h3 className="w-full text-2xl leading-8 font-semibold dark:text-white">You have not connected with any Exchange</h3>
                  <p className="w-full leading-6 font-normal dark:text-gray-400">Generate api keys from your preferred exchange to start adding strategies</p>
                </span>
                <div className="flex flex-col items-stretch">
                  <Link to="/connect-strategy" className="flex-shrink-0 inline-flex items-center justify-center border-0 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition bg-violet-500 dark:bg-violet-500 active:bg-violet-500 dark:active:bg-violet-500 border-transparent font-medium  hover:bg-violet-600 dark:hover:bg-violet-400 px-4 py-2 rounded-md shadow-sm text-base text-white">
                    <span className="flex-1 flex items-center justify-center space-x-2">Connect</span>
                  </Link>
                </div>
              </span>
            </span>
          </div>
        </div>
        :
        <div>
        
        <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
          <div>
            <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true"
              onChange={(e: any): void => {
                const trimmed = e.target.value.trim()
                handleChnange(trimmed)
              }
              }>
              {/* <!-- Heroicon name: solid/chevron-down --> */}
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              {connectedStrategies}
            </select>
          </div>
        </div>
        {strategyDetails()}      
      </div>
       }
        {topUpModalOpen &&
      <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
      
      <button disabled={props.isLoading} onClick={() => handleClose()} className="float-right">
      <img src={logo} alt="My Happy SVG"/>
      </button>
      <p className="text-sm font-medium text-gray-500 truncate">We recommend topping up by your current currency</p>
        <form onSubmit={handleSubmit} method="POST">
            
            <div>
              <label htmlFor="price" className="block text-sm mt-3 font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <span className="text-gray-500 sm:text-sm">
                    $
                  </span> */}
                </div>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {setTopUpAmount({...topUpAmount, amount: parseFloat(e.target.value)})}}
                type="text" name="current_currency_balance" id="current_currency_balance" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="current_currency" className="sr-only">Currency</label>
                  <select onChange={handleOnChange} id="current_currency" name="current_currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option selected={topUpAmount.currency == topUpAmount.ticker_1}>{topUpAmount.ticker_1}</option>
                    <option selected={topUpAmount.currency == topUpAmount.ticker_2}>{topUpAmount.ticker_2}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-6">
                <button disabled={props.isLoading} type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                { props.isLoading ? <Loader type="Circles" color="#00BFFF" height={24} width={24}/> : <span>Submit</span>}
                </button>
            </div>
        </form>
      </div>
      </div>
      </div>
      
      }

    </>
  }

  const mapStateToProps = (state) => ({
    isLoading: state.common.isLoading,
    formSubmitted: state.common.formSubmitted,
    isAuthenticated: state.auth.isAuthenticated,
    strategies: state.common.strategies,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    connectedExchanges: state.common.connectedExchanges
  });
  
  export default connect(mapStateToProps, { createMessage, getStrategies, getConnectedExchanges, getConnectedStrategies, getStrategyPairs, topUpStrategy })(Strategies);