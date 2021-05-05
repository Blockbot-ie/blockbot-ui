import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { getExchanges, connectExchange, getConnectedExchanges, getStrategyPairs } from '../../actions/common';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ConnectExchangeModalForm from '../forms/connectExchangeModalForm';
import Nav from '../Nav';
import Loader from 'react-loader-spinner';

const ConnectExhange = (props: any) => {

    const [currentExchange, setCurrentExchangeState] = useState(null);

    useEffect(() => {
      if (props.connectedExchanges.length < 1) props.getConnectedExchanges();
    }, [])

    useEffect(() => {
      if (props.connectedExchanges.length > 0) {
        setCurrentExchangeState(props.connectedExchanges[0].exchange.user_exchange_account_id)
      }
      }, [props.connectedExchanges]);

    
    const connectedExchanges = props.connectedExchanges.map((exchange, i) => 
      <option key={i} value={exchange.exchange.user_exchange_account_id}>{exchange.exchange.name}</option>
    )

    const exchangeAccountDetails = () => {

      return props.connectedExchanges.map((exchange) =>
        exchange.exchange.user_exchange_account_id == currentExchange &&
        <div className="relative">
            <div className="mt-6">
                <div className="mt-6">
                    <div className="flex-col">
                        <span className="mb-5 mt-10 text-l leading-5 text-gray-200 flex whitespace-nowrap">Exchange Account Details</span>
                    </div>
                    <div className="shadow rounded-lg overflow-hidden bg-gray-800">
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Exchange</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{exchange.exchange.exchange.name}</dd>
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Account Name</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{exchange.exchange.name}</dd>
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Number of Connected Strategies</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{exchange.strategy_count}</dd>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-5 space-x-3">
            <Link to="/connect-exchange" className="flex-shrink-0 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-gray-700 transition bg-indigo-500 bg-indigo-500 active:bg-indigo-500 active:bg-indigo-500 border-transparent font-medium  hover:bg-indigo-600 hover:bg-indigo-400 px-4 py-2 rounded-md shadow-sm text-base text-white">
                Add new Exchange
            </Link>
            </div>
        </div>
    )
  }
    
    return <>

    {props.isLoading ?
    <div className="flex h-screen">
      <div className="m-auto">
          <Loader type="Circles" color="#00BFFF" height={64} width={64}/>
      </div>
    </div>
    :
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          {(props.connectedExchanges.length < 1) ?
            <div>
              <header className="max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between md:h-16">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 text-white sm:text-3xl sm:truncate">Exchange Manager</h2>
                  </div>
                  <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
                    <Link to="/connect-exchange" type="button" className="flex-shrink-0 inline-flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-gray-700 transition border-transparent font-medium  px-6 py-3 relative rounded-md shadow-sm text-base text-white">
                      <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-500 to-violet-500"></span>
                      <span className="-m-px absolute inset-0 rounded-md bg-gradient-to-r from-teal-600 from-teal-400 to-violet-600 to-violet-400 opacity-0 transition hover:opacity-100 active:opacity-0"></span>
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
                      <h3 className="w-full text-2xl leading-8 font-semibold text-white">You have not connected with any Exchange</h3>
                      <p className="w-full leading-6 font-normal text-gray-400">Generate api keys from your preferred exchange to start adding strategies</p>
                    </span>
                    <div className="flex flex-col items-stretch">
                      <Link to="/connect-exchange" className="flex-shrink-0 inline-flex items-center justify-center border-0 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-gray-700 transition bg-violet-500 bg-violet-500 active:bg-violet-500 active:bg-violet-500 border-transparent font-medium  hover:bg-violet-600 hover:bg-violet-400 px-4 py-2 rounded-md shadow-sm text-base text-white">
                        <span className="flex-1 flex items-center justify-center space-x-2">Connect</span>
                      </Link>
                    </div>
                  </span>
                </span>
              </div>
            </div>
          :
          <div>
            <div className="px-4 py-3 bg-gray-900 text-center sm:px-6">
              <div>
                <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true"
                  onChange={(e: any): void => {
                    const trimmed = e.target.value.trim()
                    setCurrentExchangeState(trimmed)}
                  }>
                  {/* <!-- Heroicon name: solid/chevron-down --> */}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  {connectedExchanges}
                </select>
              </div>
            </div>
            {exchangeAccountDetails()}      
          </div> 
          }
          </div>
        }
    </>
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.common.isLoading,
  exchanges: state.common.exchanges,
  connectedExchanges: state.common.connectedExchanges,
  connectedStrategies: state.common.connectedStrategies,
  strategies: state.common.strategies
});

export default connect(mapStateToProps, { getExchanges, connectExchange, getConnectedExchanges, getStrategyPairs })(ConnectExhange);