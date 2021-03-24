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

type ExchangeAccount = {
    exchange_id: String,
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

    const [pairs, setPairs] = useState({
      symbols: []
    })

    const [strategyPairs, setStrategyPairs] = useState({
      pairs: []
    })

    const [tickers, setTickers] = useState({
      ticker_1: '',
      ticker_2: ''
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
            props.createMessage({ belowMinAmount: 'Please increase the inital amount' });
          }
          else {
            props.connectStrategy({ connectedStrategyState }) 
          }
        }
    }
    return <>
    {props.isOpen &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <ConnectStrategyForm />
        <button type="submit" onClick={() => props.handleClose()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Close
        </button>
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

export default connect(mapStateToProps, { createMessage, getStrategies, connectStrategy, connectExchange, getConnectedExchanges })(ConnectStrategyForm);