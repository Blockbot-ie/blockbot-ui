import { useState } from "react"
import { connect } from "react-redux"
import { getExchanges, connectExchange } from '../../actions/common';

type ConnectExchange = {
    exchange: String,
    name: String,
    api_key: String,
    api_secret: String,
    api_password: String
  }

const ConnectExchangeForm = (props: any) => {

    const [connectedExchangeState, setConnectedExchangeState] = useState<ConnectExchange>({
        exchange: '',
        name: '',
        api_key: '',
        api_secret: '',
        api_password: ''
      })

    const exchangeList = props.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )

    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectExchange({ connectedExchangeState })
    }
    return <>
    <div className="mt-5 md:mt-0 md:col-span-2">
    <form onSubmit={handleSubmit} method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="exchange" className="block text-sm font-medium text-gray-700">Exchange</label>
              <select
                onChange={(e: any): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, exchange: trimmed })}
                }
              id="exchange" name="exchange" autoComplete="exchange" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {exchangeList}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, name: trimmed })}
              }
              type="text" name="name" id="name" autoComplete="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">API Key</label>
              <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
              }
              type="text" name="api_key" id="api_key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="api_secret" className="block text-sm font-medium text-gray-700">API Secret</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
              }
              type="text" name="api_secret" id="api_secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="api_password" className="block text-sm font-medium text-gray-700">API Password</label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const trimmed = e.target.value.trim()
                  setConnectedExchangeState({ ...connectedExchangeState, api_password: trimmed })}
              }
              type="password" name="api_password" id="api_password" autoComplete="api_password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
    exchanges: state.common.exchanges
  });

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExchangeForm);