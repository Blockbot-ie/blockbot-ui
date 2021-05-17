import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getConnectedStrategies } from '../../actions/common';

const Review = (props: any) => {

    useEffect(() => {
        if (props.connectedStrategies.length < 1) {
            props.getConnectedStrategies()
        }
    }, [])
    
    return <>
    {props.connectedStrategies.length > 0 &&
        <div className="relative">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-white">
            Strategy Information
            </h3>
            <div className="mt-6">
                <div className="mt-6">
                    <div className="flex-col">
                        <span className="mb-5 mt-10 text-l leading-5 text-gray-200 flex whitespace-nowrap">Details about strategy</span>
                    </div>
                    <div className="shadow rounded-lg overflow-hidden bg-gray-800">
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">User</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{props.user.email}</dd>
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Strategy Name</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{props.strategies[0].name}</dd>
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Exchange Account</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{props.connectedExchanges[0].exchange.name}</dd>
                        </div>
                    
                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Selected Pair</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{props.connectedStrategies[0].pair}</dd>
                        </div>

                        <div className="grid grid-cols-3 gap-4 items-center px-6 py-3 border-b last:border-b-0 border-gray-700">
                            <dt className="text-sm leading-5 font-medium text-gray-300">Initial Balance</dt>
                            <dd className="text-sm leading-5 col-span-2 text-gray-300">{props.connectedStrategies[0].current_currency_balance} {props.connectedStrategies[0].current_currency} </dd>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-5 space-x-3">
            <Link to="/" className="flex-shrink-0 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-gray-700 transition bg-indigo-500 bg-indigo-500 active:bg-indigo-500 active:bg-indigo-500 border-transparent font-medium  hover:bg-indigo-600 hover:bg-indigo-400 px-4 py-2 rounded-md shadow-sm text-base text-white">
                Finish
            </Link>
            </div>
        </div>
    }
    </>
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
  });

export default connect(mapStateToProps, {getConnectedStrategies})(Review);