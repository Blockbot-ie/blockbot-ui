import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getExchanges, connectExchange } from '../../actions/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

      useEffect(() => {
        console.log(props)
        if (props.exchanges.length > 0) {
          setConnectedExchangeState({
            ...connectedExchangeState,
            exchange: props.exchanges[0].exchange_id
          })
        }
      }, []);

    const exchangeList = props.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        props.connectExchange({ connectedExchangeState })
    }

    const showState = () => {
      console.log(props)
  }
    return <>
    {!props.formSubmitted &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} method="POST">
              <div>
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
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setConnectedExchangeState({ ...connectedExchangeState, name: trimmed })}
                }
                type="text" name="name" id="name" autoComplete="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">API Key</label>
                <input 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
                }
                type="text" name="api_key" id="api_key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div> 
              <div>
                <label htmlFor="api_secret" className="block text-sm font-medium text-gray-700">API Secret</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
                }
                type="text" name="api_secret" id="api_secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="api_password" className="block text-sm font-medium text-gray-700">API Password</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    const trimmed = e.target.value.trim()
                    setConnectedExchangeState({ ...connectedExchangeState, api_password: trimmed })}
                }
                type="password" name="api_password" id="api_password" autoComplete="api_password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <button disabled={props.isLoading} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              { props.isLoading && <FontAwesomeIcon icon={ faSpinner } /> }
                Save
              </button>
            </form>
            <button type="submit" onClick={() => props.handleClose()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
}
</>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading,
    formSubmitted: state.common.formSubmitted
  });

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExchangeForm);