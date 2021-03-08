import { useState } from "react"
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

    const [connectedStrategyState, setConnectedStrategyState] = useState<ConnectStrategy>({
        strategy: '',
        user_exchange_account: '',
        pair: '',
        initial_first_symbol_balance: null,
        initial_second_symbol_balance: null,
        current_currency: '',
        current_currency_balance: null
      })

    const [exchaneAccount, setExchangeAccount] = useState(0)

    const [pairs, setPairs] = useState({
        pairs: []
    })


    const strategyList = props.strategies.map((strategy, i) => 
        <option key={i} value={strategy.strategy_id.toString()}>{strategy.name}</option>
    )

    const connectedExchangeAccounts = props.connectExchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange}>{exchange.name}</option>
    )

    const exchangePairs = pairs.pairs.map((pair, i) => 
        <option key={i} value={pair.pair}>{pair.pair}</option>
    )

    const onExchangeAccountChange = (e: any) => {
        console.log(props.strategyPairs)
        console.log(e.target.value)
        const exchangePairs = props.strategyPairs.filter(x => x.strategy == e.target.value)

        setPairs({
            ...pairs,
            pairs: exchangePairs
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectExchange({ connectedStrategyState })
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
                  onExchangeAccountChange(e)
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
                    console.log(e)
                  const trimmed = e.target.value.trim()
                  setConnectedStrategyState({ ...connectedStrategyState, pair: trimmed })}
                }
              id="pair" name="pair" autoComplete="pair" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {exchangePairs}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="initial_second_symbol_balance" className="block text-sm font-medium text-gray-700">API Password</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setConnectedStrategyState({ ...connectedStrategyState, current_currency: e.target.value.trim() })}
              }
              type="text" name="current_currency" id="current_currency" autoComplete="initial_second_symbol_balance" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="initial_first_symbol_balance" className="block text-sm font-medium text-gray-700">API Secret</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setConnectedStrategyState({ ...connectedStrategyState, initial_first_symbol_balance: parseInt(e.target.value) })}
              }
              type="number" name="initial_first_symbol_balance" id="initial_first_symbol_balance" autoComplete="initial_first_symbol_balance" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="initial_second_symbol_balance" className="block text-sm font-medium text-gray-700">API Password</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setConnectedStrategyState({ ...connectedStrategyState, initial_second_symbol_balance: parseInt(e.target.value) })}
              }
              type="number" name="initial_second_symbol_balance" id="initial_second_symbol_balance" autoComplete="initial_second_symbol_balance" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
</>

}

const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
    connectExchanges: state.common.connectedExchanges,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getStrategies, connectStrategy })(ConnectStrategyForm);