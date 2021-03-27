import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStrategies, getConnectedStrategies, getStrategyPairs } from '../../actions/common';
import ConnectStrategyModalForm from '../forms/connectStrategyModalForm';
import Nav from '../Nav';

type Strategy = {
    strategy_id: String,
    name: String,
    pair: String,
    current_currency: String,
    current_balance: Number
}

type Strategies = {
  strategies: Strategy[]
}

const Strategies = (props: any) => {

  const [currentStrategy, setCurrentStrategyState] = useState("60a8615c-a178-4f34-89e9-43014144315c");

  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const handleClose = ()=> {
    setAddModalOpen(false)
  }

  useEffect(() => {
    console.log(props.connectedStrategies)
    console.log(currentStrategy)
    if (props.connectedStrategies.length < 1) {
      props.getConnectedStrategies()
    }
    }, [props.connectedStrategies]);

  
  const connectedStrategies = props.connectedStrategies.map((strategy, i) => 
    <option key={i} value={strategy.id}>{strategy.pair} - {strategy.strategy.name}</option>
  )

  const strategyDetails = () => {
    return props.connectedStrategies.map((strategy) =>
      strategy.id == currentStrategy &&
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Strategy Pair Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
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
    <div className="h-screen flex overflow-hidden bg-gray-100">
    <Nav />
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
    {(props.connectedStrategies.length < 1) ?
      <div>
        You have not connected with an exchange.
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button onClick={() => setAddModalOpen(true)} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New
          </button>
        </div>
      </div>
      :
      <div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button onClick={() => setAddModalOpen(true)} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New
          </button>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
          <div>
            <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true"
              onChange={(e: any): void => {
                const trimmed = e.target.value.trim()
                console.log(trimmed)
                setCurrentStrategyState(trimmed)}
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
    {props.connectedExchanges.length < 1 ?
      <h3>Please connect with an exchange first</h3>    
      :
      <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
    
    }
    </main>
    </div>
    </div>
    </>
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    strategies: state.common.strategies,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    connectedExchanges: state.common.connectedExchanges
  });
  
  export default connect(mapStateToProps, { getStrategies, getConnectedStrategies, getStrategyPairs })(Strategies);