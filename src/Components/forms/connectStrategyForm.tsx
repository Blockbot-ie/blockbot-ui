import { unstable_batchedUpdates } from 'react-dom';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getStrategies, connectStrategy, connectExchange, getConnectedExchanges } from '../../actions/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { isPropertySignature } from "typescript";
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
            user_exchange_account: props.connectedExchanges[0].user_exchange_account_id,
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
      console.log(props)
      if (props.connectedStrategies.length > 0 && !props.isModal) {
        props.next()
      }
    }, [props.connectedStrategies])

    const strategyList = props.strategies.map((strategy, i) => 
        <option key={i} value={strategy.strategy_id.toString()}>{strategy.name}</option>
    )

    const connectedExchangeAccounts = props.connectedExchanges.map((exchange, i) => 
        <option key={i} value={exchange.user_exchange_account_id}>{exchange.name}</option>
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

    const showState = () => {
        console.log(connectedStrategyState)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const pairDetails = props.strategyPairs.filter(x => x.strategy_id == connectedStrategyState.strategy && x.symbol == connectedStrategyState.pair)[0]
        console.log(connectedStrategyState.current_currency)
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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} method="POST">
            <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-700">Strategy</label>
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
            <label htmlFor="user_exchange_account" className="block text-sm font-medium text-gray-700">Exchange Account</label>
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
            <label htmlFor="pair" className="block text-sm font-medium text-gray-700">Pair</label>
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
        
            <p id="symbols">
            <label><input type="radio" name="current_currency" value={connectedStrategyState.ticker_1} checked={connectedStrategyState.current_currency == connectedStrategyState.ticker_1}
            onChange={(e: any): void =>
            setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0, ticker_1: e.target.value})} 
            />
            <span>{connectedStrategyState.ticker_1}</span></label>
            <label><input type="radio" name="current_currency" value={connectedStrategyState.ticker_2} checked={connectedStrategyState.current_currency == connectedStrategyState.ticker_2}
            onChange={(e: any): void =>
            setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0, ticker_2: e.target.value})} 
            defaultChecked/>
            <span>{connectedStrategyState.ticker_2}</span></label>
            </p>
        
            <div>
            <label htmlFor="current_currency_balance" className="block text-sm font-medium text-gray-700">Initial {connectedStrategyState.current_currency} balance</label>
                <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const pair = connectedStrategyState.pair;
                    let i = pair.indexOf('/');
                    let symbol1 = pair.substring(0, i);
                    let symbol2 = pair.substring(i+1, pair.length);
                    if (connectedStrategyState.current_currency == symbol1) {
                        setConnectedStrategyState({ ...connectedStrategyState, initial_first_symbol_balance: parseFloat(e.target.value), initial_second_symbol_balance: 0, current_currency_balance: parseFloat(e.target.value) })
                    }
                    if (connectedStrategyState.current_currency == symbol2) {
                        setConnectedStrategyState({ ...connectedStrategyState, initial_second_symbol_balance: parseFloat(e.target.value), initial_first_symbol_balance: 0, current_currency_balance: parseFloat(e.target.value) })
                    }
                }
                }
                value={connectedStrategyState.current_currency_balance.toString()}
                type="number" step={0.0001} name="current_currency_balance" id="current_currency_balance" autoComplete="current_currency_balance" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <button disabled={props.isLoading} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            { props.isLoading && <FontAwesomeIcon icon={ faSpinner } /> }
            Submit
            </button>
        </form>
        {props.isModal &&
        <button type="submit" onClick={() => props.handleClose()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Close
        </button>
        }
        </div>
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