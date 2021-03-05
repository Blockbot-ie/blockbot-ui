import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { getExchanges, connectExchange } from '../../actions/common';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

type Exchange = {
    exchange_id: String,
    display_name: String
}

type Exchanges = {
    exchanges: Exchange[]
}

type ConnectExchange = {
  exchange: String,
  api_key: String,
  api_secret: String
}

const ConnectExhange = (props: any) => {
    const [exchangeState, setExchangeState] = useState<Exchanges>({
        exchanges: []
    });

    const [connectedExchangeState, setConnectedExchangeState] = useState<ConnectExchange>({
      exchange: '',
      api_key: '',
      api_secret: ''
    })

    useEffect(() => {
      if (props.exchanges.length < 1){
        props.getExchanges()
        }
      }, []);

      const { next } = props.navigation;
      const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectExchange({ connectedExchangeState })

        if (props.connectedExchange) {

        }

      }
    
    const exchangeList = props.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )
    return <>
    <div className="mt-5 md:mt-0 md:col-span-2">
    <form onSubmit={handleSubmit} method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="exchange" className="block text-sm font-medium text-gray-700">Exchange</label>
              <select
                onChange={(e: any): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, exchange: trimmed })}
                }
              id="exchange" name="exchange" autoComplete="exchange" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {exchangeList}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">API Key</label>
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
              }
              type="text" name="api_key" id="api_key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="api_secret" className="block text-sm font-medium text-gray-700">API Secret</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
              }
              type="text" name="api_secret" id="api_secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {!props.connectedExchange &&
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
          }
        </div>
      </div>
      </div>
    </form>
    {props.connectedExchange &&
          <button onClick={next} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Next
          </button>
    }
  </div>
    </>
}

const mapStateToProps = (state) => ({
  exchanges: state.common.exchanges,
  connectedExchange: state.common.connectedExchange
});

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExhange);