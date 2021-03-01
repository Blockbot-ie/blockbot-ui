import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import Select from 'react-select';

type Exchange = {
    exchange_id: String,
    display_name: String
}

type Exchanges = {
    exchanges: Exchange[]
}

const ConnectStrategy = (props: any) => {
    
    const [exchangeState, seteExchangeState] = useState<Exchanges>({
        exchanges: []
    });
    useEffect(() => {
        if (props.logged_in) {
          axios.get('http://localhost:8000/bb/exchanges/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => {
              const exchanges = res.data;
              seteExchangeState({
                  ...exchangeState,
                  exchanges: exchanges
              })
            })
        }
      }, [props.logged_in])
    
    const exchangeList = exchangeState.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )
    return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="exchange" className="block text-sm font-medium text-gray-700">Exchange</label>
                <select id="exchange" name="exchange" autoComplete="exchange" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {exchangeList}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">API Key</label>
                <input type="text" name="api_key" id="api_key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="api_secret" className="block text-sm font-medium text-gray-700">API Secret</label>
                <input type="text" name="api_secret" id="api_secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
        </div>
        </div>
      </form>
    </div>
    )
}

export default ConnectStrategy;