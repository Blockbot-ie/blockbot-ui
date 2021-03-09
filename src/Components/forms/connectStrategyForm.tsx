import { symbol } from "prop-types";
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getStrategies, connectStrategy } from '../../actions/common';

type ConnectStrategy = {
    strategy: String,
    user_exchange_account: String,
    pair: String,
    initial_first_symbol_balance: Number,
    initial_second_symbol_balance: Number,
    current_currency: String,
    current_currency_balance: Number
  }

type ExchangeAccount = {
    exchange_id: String,
}

const ConnectStrategyForm = (props: any) => {
    const [exchaneAccount, setExchangeAccount] = useState(0)

    useEffect(() => {
        console.log(props)
        if (props.strategies.length < 1){
            props.getStrategies()
        }
        if (props.strategyPairs.length > 0) {
            const strategyPairs = props.strategyPairs.filter(x => x.strategy == props.strategies[0].strategy_id)
            let i = strategyPairs[0].pair.indexOf('/')
            let symbol1 = strategyPairs[0].pair.substring(0, i);
            let symbol2 = strategyPairs[0].pair.substring(i+1, strategyPairs[0].length);
            setPairs({
                ...pairs,
                pairs: strategyPairs,
                symbol1: symbol1,
                symbol2: symbol2
            })
            setConnectedStrategyState({
                ...connectedStrategyState,
                current_currency: symbol2
            })
        }
    }, [props.strategies])


    const [pairs, setPairs] = useState({
        pairs: [],
        symbol1: '',
        symbol2: ''
    })

    const [connectedStrategyState, setConnectedStrategyState] = useState<ConnectStrategy>({
        strategy: props.strategies[0].strategy_id,
        user_exchange_account: props.connectExchanges[0].user_exchange_account_id,
        pair: pairs.pairs[0],
        initial_first_symbol_balance: null,
        initial_second_symbol_balance: null,
        current_currency: '',
        current_currency_balance: 0
      })


    const strategyList = props.strategies.map((strategy, i) => 
        <option key={i} value={strategy.strategy_id.toString()}>{strategy.name}</option>
    )

    const connectedExchangeAccounts = props.connectExchanges.map((exchange, i) => 
        <option key={i} value={exchange.user_exchange_account_id}>{exchange.name}</option>
    )

    const exchangePairs = pairs.pairs.map((pair, i) => 
        <option key={i} value={pair.pair}>{pair.pair}</option>
    )

    const onStrategyChange = (e: any) => {
        console.log(e.target.value)
        if (props.strategyPairs.length > 0) {
            const strategyPairs = props.strategyPairs.filter(x => x.strategy == e.target.value)
            console.log(strategyPairs)
            let i = strategyPairs[0].pair.indexOf('/')
            let symbol1 = strategyPairs[0].pair.substring(0, i);
            let symbol2 = strategyPairs[0].pair.substring(i+1, strategyPairs[0].pair.length);
            setPairs({
                ...pairs,
                pairs: strategyPairs,
                symbol1: symbol1,
                symbol2: symbol2
            })
        }
    }

    const onPairChange = (e: any) => {
        let i = e.target.value.indexOf('/')
        let symbol1 = e.target.value.substring(0, i);
        let symbol2 = e.target.value.substring(i+1, e.target.value.length);
        setPairs({
            ...pairs,
            symbol1: symbol1,
            symbol2: symbol2 
        })

        setConnectedStrategyState({
            ...connectedStrategyState,
            current_currency: symbol2
        })
    }

    const showState = () => {
        console.log(connectedStrategyState)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectStrategy({ connectedStrategyState }) 
    }
    return <>
    <div className="mt-5 md:mt-0 md:col-span-2">
    <form onSubmit={handleSubmit} method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6 sm:col-span-3">
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
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
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
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="pair" className="block text-sm font-medium text-gray-700">Pair</label>
              <select
                onChange={(e: any): void => {
                  onPairChange(e)
                  const trimmed = e.target.value.trim()
                  setConnectedStrategyState({ ...connectedStrategyState, pair: trimmed })}
                }
              id="pair" name="pair" autoComplete="pair" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {exchangePairs}
              </select>
            </div>
          </div>
          <p id="symbols">
          <label><input type="radio" name="current_currency" value={pairs.symbol1} 
            onChange={(e: any): void =>
            setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0})} 
            />
             <span>{pairs.symbol1}</span></label>
          <label><input type="radio" name="current_currency" value={pairs.symbol2} 
            onChange={(e: any): void =>
            setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value, current_currency_balance: 0})} 
            defaultChecked/>
          <span>{pairs.symbol2}</span></label>
          </p>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
            <label htmlFor="current_currency_balance" className="block text-sm font-medium text-gray-700">Initial {connectedStrategyState.current_currency} balance</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const pair = connectedStrategyState.pair;
                    let i = pair.indexOf('/');
                    let symbol1 = pair.substring(0, i);
                    let symbol2 = pair.substring(i+1, pair.length);
                    if (connectedStrategyState.current_currency == symbol1) {
                        setConnectedStrategyState({ ...connectedStrategyState, initial_first_symbol_balance: parseInt(e.target.value), current_currency_balance: parseInt(e.target.value) })
                    }
                    if (connectedStrategyState.current_currency == symbol2) {
                        setConnectedStrategyState({ ...connectedStrategyState, initial_second_symbol_balance: parseInt(e.target.value), current_currency_balance: parseInt(e.target.value) })
                    }
                }
              }
              value={connectedStrategyState.current_currency_balance.toString()}
              type="number" name="current_currency_balance" id="current_currency_balance" autoComplete="current_currency_balance" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
    <button onClick={showState} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Show
          </button>
    </div>
</>

}

const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
    connectExchanges: state.common.connectedExchanges,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getStrategies, connectStrategy })(ConnectStrategyForm);