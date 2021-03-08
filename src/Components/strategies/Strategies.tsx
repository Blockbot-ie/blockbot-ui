import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStrategies, getConnectedStrategies, getStrategyPairs } from '../../actions/common';
import ConnectStrategyForm from '../forms/connectStrategyForm';

type Strategy = {
    strategy_id: String,
    name: String
}

type Strategies = {
    strategies: Strategy[]
}

const Strategies = (props: any) => {

    const [strategyState, setStrategyState] = useState<Strategies>({
        strategies: []
    });

    const { next } = props.navigation;

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      console.log(props)
      if (props.strategies.length < 1){
        props.getStrategies()
      }
      if (props.strategies.length < 1){
        props.getConnectedStrategies()
        }
      if (props.strategyPairs.length < 1){
        props.getStrategyPairs()
        }
      
      }, []);
    
    // const listItems = props.strategies.map((strategy) =>
    //     <li key={strategy.strategy_id}><Link to={`/strategy/${strategy.strategy_id}`}>{strategy.name}</Link></li>
    // );
    return <>
    {(props.connectedStrategies.length < 1 || showForm) && props.isAuthenticated ?
      <ConnectStrategyForm />
      :
      <div>
        Connected
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button onClick={() => setShowForm(true)} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New
          </button>
        </div>
      </div>
    }
    </>
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    strategies: state.common.strategies,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    connectExchanges: state.common.connectedExchanges
  });
  
  export default connect(mapStateToProps, { getStrategies, getConnectedStrategies, getStrategyPairs })(Strategies);