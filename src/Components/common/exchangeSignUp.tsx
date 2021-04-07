import { getExchanges } from '../../actions/common';
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import coinbasepro from "../../images/exchangeLogos/coinbasepro.png";

const ExchangeSignUp = (props: any) => {

    const handleOnClick = () => {
        props.next()
    }
    return <>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
            <div className="w-full flex items-center justify-between p-6 space-x-6">
            <img className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full" src={coinbasepro} alt="" />
            <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                <h3 className="text-gray-900 text-sm font-medium truncate">Coinbase Pro</h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">Create an account</p>
            </div>
            </div>
            <div>
            <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                <a href="https://www.coinbase.com/users/oauth_signup?client_id=2d06b9a69c15e183856ff52c250281f6d93f9abef819921eac0d8647bb2b61f9&meta%5Baccount%5D=all&redirect_uri=https%3A%2F%2Fpro.coinbase.com%2Foauth_redirect&response_type=code&scope=user+balance&state=a9f998f1-9468-4697-da75-95e3a52e897d" className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500" target="_blank">
                    <span className="ml-3">Sign Up</span>
                </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                <button onClick={handleOnClick} className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <span className="ml-3">Already have an account?</span>
                </button>
                </div>
            </div>
            </div>
        </li>

        
        </ul>

    </>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading
  });

export default connect(mapStateToProps, { getExchanges })(ExchangeSignUp);