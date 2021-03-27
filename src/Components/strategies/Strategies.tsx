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

  const [strategyState, setStrategyState] = useState<Strategies>({
    strategies: []
  });

  const [addModalOpen, setAddModalOpen] = React.useState(false);

  const handleClose = ()=> {
    setAddModalOpen(false)
  } 

  const connectedStrategies = () => {
    const { strategies } = strategyState
    console.log(strategies)
    let connectedStrategies = []
    strategies.forEach(strategy => {
      connectedStrategies.push(
        <ul>
        <li>{strategy.name}</li>
        <li>{strategy.pair}</li>
        <li>{strategy.current_currency}</li>
        <li>{strategy.current_balance}</li>
        </ul>
      )
    })
    return connectedStrategies
  }
     
    return <>
    <div className="h-screen flex overflow-hidden bg-gray-100">
    <Nav />
    <div className="flex flex-col w-0 flex-1 overflow-hidden"> 
    <h1>Strategies</h1>
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
        Connected
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button onClick={() => setAddModalOpen(true)} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New
          </button>
        </div>
      </div>
    }
    {props.connectedExchanges.length < 1 ?
      <h3>Please connect with an exchange first</h3>    
      :
      <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
    
    }
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