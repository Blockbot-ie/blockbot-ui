import { unstable_batchedUpdates } from 'react-dom';
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getStrategies, connectStrategy, connectExchange, getConnectedExchanges } from '../../actions/common';
import ConnectStrategyForm from "./connectStrategyForm";
import { createMessage } from '../../actions/messages';

type ConnectStrategy = {
    strategy: String,
    user_exchange_account: String,
    pair: String,
    initial_first_symbol_balance: Number,
    initial_second_symbol_balance: Number,
    current_currency: String,
    current_currency_balance: Number,
    ticker_1: string,
    ticker_2: string
  }

type ExchangeAccount = {
    exchange_id: String,
}

const ConnectStrategyModalForm = (props: any) => {
    return <>
    {props.isOpen &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <ConnectStrategyForm isModal={true} handleClose={props.handleClose}/>
      </div>
    </div>
}
    
</>

}

const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    isLoading: state.common.isLoading
  });

export default connect(mapStateToProps, { createMessage, getStrategies, connectStrategy, connectExchange, getConnectedExchanges })(ConnectStrategyModalForm);