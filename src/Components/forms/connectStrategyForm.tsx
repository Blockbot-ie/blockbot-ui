import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getStrategies, connectStrategy, connectExchange, getConnectedExchanges } from '../../actions/common';
import { createMessage } from '../../actions/messages';
import logo from '../../close-icon.svg'
import Loader from 'react-loader-spinner';
import { setMaxListeners } from "node:process";

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

    const [strategyPairs, setStrategyPairs] = useState({
      pairs: []
    })

    useEffect(() => {
        if (props.connectedExchanges.length > 0) {
          const filteredPairs = props.strategyPairs.filter(x => x.strategy_id == props.strategies[0].strategy_id)
          setConnectedStrategyState({
            ...connectedStrategyState,
            strategy: props.strategies[0].strategy_id,
            user_exchange_account: props.connectedExchanges[0].exchange.user_exchange_account_id,
            pair: props.strategyPairs[0].symbol,
            current_currency: filteredPairs[0].ticker_2,
            ticker_1: filteredPairs[0].ticker_1,
            ticker_2: filteredPairs[0].ticker_2
          })
        }
    }, [props])


    useEffect(() => {
      const filteredPairs = props.strategyPairs.filter(x => x.strategy_id == props.strategies[0].strategy_id)

      setStrategyPairs({
        pairs: filteredPairs
      })
    }, [props.strategyPairs])

    useEffect(() => {
      if (props.connectedStrategies.length > 0 && !props.isModal) {
        props.next()
      }
    }, [props.connectedStrategies])

    const strategyList = props.strategies.map((strategy, i) => 
        <option key={i} value={strategy.strategy_id.toString()}>{strategy.name}</option>
    )

    const connectedExchangeAccounts = props.connectedExchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange.user_exchange_account_id}>{exchange.exchange.name}</option>
    )

    const stratPairs = strategyPairs.pairs.map((pair, i) => 
        <option key={i} value={pair.symbol}>{pair.symbol}</option>
    )

    const onStrategyChange = (e: any) => {
        if (props.strategyPairs.length > 0) {
            const filteredPairs = props.strategyPairs.filter(x => x.strategy_id == e.target.value)
            setStrategyPairs({
              pairs: filteredPairs
            })
            setConnectedStrategyState({
              ...connectedStrategyState,
              ticker_1: filteredPairs[0].ticker_1,
              ticker_2: filteredPairs[0].ticker_2
            })
        }
    }

    const handleOnChange = (e: any) => {
      setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0, initial_first_symbol_balance: 0, initial_second_symbol_balance: 0})
    }

    const handleCurrencyAmountChange = (e: any) => {
      const value = e.target.value
      const pair = connectedStrategyState.pair;
      let i = pair.indexOf('/');
      let symbol1 = pair.substring(0, i);
      let symbol2 = pair.substring(i+1, pair.length);
      if (connectedStrategyState.current_currency == symbol1) {
          setConnectedStrategyState({ ...connectedStrategyState, initial_first_symbol_balance: parseFloat(value), initial_second_symbol_balance: 0, current_currency_balance: parseFloat(value) })
      }
      if (connectedStrategyState.current_currency == symbol2) {
          setConnectedStrategyState({ ...connectedStrategyState, initial_second_symbol_balance: parseFloat(value), initial_first_symbol_balance: 0, current_currency_balance: parseFloat(value) })
      }
    }

    const setMax = () => {
      props.connectedExchanges.map(exchange => {
        if (exchange.exchange.user_exchange_account_id == connectedStrategyState.user_exchange_account) {
          console.log(exchange)
          setConnectedStrategyState({
            ...connectedStrategyState,
             current_currency_balance: exchange.available_balances[connectedStrategyState.current_currency.toString()]
          })
        }
      })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const pairDetails = props.strategyPairs.filter(x => x.strategy_id == connectedStrategyState.strategy && x.symbol == connectedStrategyState.pair)[0]
        if (connectedStrategyState.current_currency == pairDetails.ticker_1) {
          if (connectedStrategyState.current_currency_balance < pairDetails.ticker_1_min_value) {
            props.createMessage({ belowMinAmount: 'Please increase the inital amount' });
          }
          else {
            props.connectStrategy({ connectedStrategyState }) 
          }
        }
        if (connectedStrategyState.current_currency == pairDetails.ticker_2) {
          if (connectedStrategyState.current_currency_balance < pairDetails.ticker_2_min_value) {
            props.createMessage({ belowMinAmount: 'Please increase the inital amout' });
          }
          else {
            props.connectStrategy({ connectedStrategyState }) 
          }
        }
    }
    return <>
    
        <div className="inline-block bg-white sm:mx-auto sm:w-full sm:max-w-md rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6">
          {props.isModal && 
          <button disabled={props.isLoading} onClick={() => props.handleClose()} className="float-right">
          <img src={logo} alt="My Happy SVG"/>
          </button>
          }
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Connect with a Strategy to Start Trading
          </h3>
        </div>
        <form onSubmit={handleSubmit} method="POST">
            <div>
            <label htmlFor="strategy" className="block text-sm mt-3 font-medium text-gray-700">Strategy</label>
            <select
                onChange={(e: any): void => {
                onStrategyChange(e)
                const trimmed = e.target.value.trim()
                setConnectedStrategyState({ ...connectedStrategyState, strategy: trimmed })}
                }
            id="strategy" name="strategy" autoComplete="strategy" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {strategyList}
            </select>
            </div>
            <div>
            <label htmlFor="user_exchange_account" className="block text-sm mt-3 font-medium text-gray-700">Exchange Account</label>
            <select
                onChange={(e: any): void => {
                const trimmed = e.target.value.trim()
                setConnectedStrategyState({ ...connectedStrategyState, user_exchange_account: trimmed })}
                }
            id="user_exchange_account" name="user_exchange_account" autoComplete="user_exchange_account" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {connectedExchangeAccounts}
            </select>
            </div>
        
        
            <div>
            <label htmlFor="pair" className="block text-sm mt-3 font-medium text-gray-700">Pair</label>
            <select
                onChange={(e: any): void => {
                
                let symbol = e.target.value
                let i = symbol.indexOf('/');
                let ticker_1 = symbol.substring(0, i);
                let ticker_2 = symbol.substring(i+1, symbol.length);
                const trimmed = e.target.value.trim()
                setConnectedStrategyState({ ...connectedStrategyState, pair: trimmed, ticker_1: ticker_1, ticker_2: ticker_2, current_currency: ticker_2 })}
                }
            id="pair" name="pair" autoComplete="pair" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {stratPairs}
            </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm mt-3 font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                
                  <button type="button" onClick={() => setMax()} className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">Max</button>
                
                <input
                  value={isNaN(connectedStrategyState.current_currency_balance) ? 0.00 : connectedStrategyState.current_currency_balance}
                  onChange={handleCurrencyAmountChange}
                type="text" name="current_currency_balance" id="current_currency_balance" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="current_currency" className="sr-only">Currency</label>
                  <select onChange={handleOnChange} id="current_currency" name="current_currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option selected={connectedStrategyState.current_currency == connectedStrategyState.ticker_1}>{connectedStrategyState.ticker_1}</option>
                    <option selected={connectedStrategyState.current_currency == connectedStrategyState.ticker_2}>{connectedStrategyState.ticker_2}</option>
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
    
</>

}

const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    isLoading: state.common.isLoading
  });

export default connect(mapStateToProps, { createMessage, getStrategies, connectStrategy, connectExchange, getConnectedExchanges })(ConnectStrategyForm);