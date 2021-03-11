import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { getExchanges, connectExchange, getConnectedExchanges, getStrategyPairs } from '../../actions/common';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ConnectExchangeForm from '../forms/connectExchangeForm';

type Exchange = {
    exchange_id: String,
    display_name: String
}

type Exchanges = {
    exchanges: Exchange[]
}

const ConnectExhange = (props: any) => {
    const [exchangeState, setExchangeState] = useState<Exchanges>({
        exchanges: []
    });

    const [addModalOpen, setAddModalOpen] = React.useState(false);

    const handleClose = ()=> {
      setAddModalOpen(false)
    } 

    useEffect(() => {

      }, []);

    
    return <>
    {(props.connectedExchanges.length < 1 || addModalOpen) && props.isAuthenticated ?
    <ConnectExchangeForm isOpen={addModalOpen} handleClose={handleClose}/>
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
    </>
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  exchanges: state.common.exchanges,
  connectedExchanges: state.common.connectedExchanges,
  connectedStrategies: state.common.connectedStrategies,
  strategies: state.common.strategies
});

export default connect(mapStateToProps, { getExchanges, connectExchange, getConnectedExchanges, getStrategyPairs })(ConnectExhange);