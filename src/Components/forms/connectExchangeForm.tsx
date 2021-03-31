import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getExchanges, connectExchange } from '../../actions/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import logo from '../../close-icon.svg'

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
        if (props.exchanges.length > 0) {
          setConnectedExchangeState({
            ...connectedExchangeState,
            exchange: props.exchanges[0].exchange_id
          })
        }
      }, []);

      useEffect(() => {
        console.log(props)
        if (props.connectedExchanges.length > 0 && !props.isModal) {
          props.next()
        }
      }, [props.connectedExchanges])

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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {props.isModal && 
          <button onClick={() => props.handleClose()} className="float-right">
          <img src={logo} alt="My Happy SVG"/>
          </button>
          }
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Connect with your Coinbase Pro Account
            </h3>
          </div>
        <form onSubmit={handleSubmit} method="POST">
            <div>
            <label htmlFor="exchange" className="block text-sm mt-3 font-medium text-gray-700">Exchange</label>
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
            <label htmlFor="name" className="block text-sm mt-3 font-medium text-gray-700">Portfolio Name</label>
            <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, name: trimmed })}
            }
            type="text" name="name" id="name" placeholder="Match the name of your Coinbase Portfolio" autoComplete="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <div>
            <label htmlFor="api_key" className="block text-sm mt-3 font-medium text-gray-700">API Key</label>
            <input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_key: trimmed })}
            }
            type="text" name="api_key" id="api_key" placeholder="Enter API Key" autoComplete="api_key" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div> 
            <div>
            <label htmlFor="api_secret" className="block text-sm mt-3 font-medium text-gray-700">API Secret</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_secret: trimmed })}
            }
            type="text" name="api_secret" id="api_secret" placeholder="Enter API Secret" autoComplete="api_secret" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <div>
            <label htmlFor="api_password" className="block text-sm mt-3 font-medium text-gray-700">API Password</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const trimmed = e.target.value.trim()
                setConnectedExchangeState({ ...connectedExchangeState, api_password: trimmed })}
            }
            type="password" name="api_password" id="api_password" placeholder="Enter API Password" autoComplete="api_password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
            </div>
            <div className="mt-3 sm:mt-6">
                <button disabled={props.isLoading} type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                { props.isLoading && <FontAwesomeIcon icon={ faSpinner } /> }
                  Submit
                </button>
            </div>
        </form>
        {/* <button onClick={props.next} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Next
        </button> */}
        </div>
    </div>
</>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading,
    formSubmitted: state.common.formSubmitted,
    connectedExchanges: state.common.connectedExchanges
  });

export default connect(mapStateToProps, { getExchanges, connectExchange })(ConnectExchangeForm);