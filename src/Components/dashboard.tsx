import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BugReportForm from "./forms/bugReportForm";
import { getDashboardData, getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs, getDailyBalances } from '../actions/common';
import { Link } from "react-router-dom";
import Orders from "./common/orders";
import StrategyStats from "./common/strategyStats";
import AccountStats from "./common/accountStats";
import TopStrategies from "./common/topStrategies";
import Nav from "./Nav";
import Loader from "react-loader-spinner";

const Dashboard = (props: any) => {
    
    const [bugReportModalOpen, setBugReportModalOpen] = React.useState(false);

    useEffect(() => {
      props.nav[0].current = true
      props.nav[1].current = false
      props.nav[2].current = false

      props.getDashboardData()
      props.getConnectedExchanges()
      props.getConnectedStrategies()
    }, [])

    const handleClose = () => {
        setBugReportModalOpen(false)
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      if (props.connectedStrategies.length < 1 && props.isLoading) setIsOpen(true)
    }, [props.connectedStrategies])

    return <>
    {props.isLoading ?
    <div className="flex h-screen">
      <div className="m-auto">
          <Loader type="Circles" color="#00BFFF" height={64} width={64}/>
      </div>
    </div> :
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <AccountStats />

            <StrategyStats />
            <br/>
            
            <TopStrategies />
            <br/>

            <Orders />

        <button onClick={() => setBugReportModalOpen(true)} type="button" className="sticky bottom-0 right-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> 
            <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Report Issue
        </button>
        </div>     
      }
        {isOpen &&
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="dialog-1-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      {/* <!-- Heroicon name: outline/check --> */}
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="dialog-1-title">
                        Get Started
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Select continue to connect your exchange and start trading
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <Link to="/user-story" type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                    Connect
                    </Link>
                    <button onClick={() => setIsOpen(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    I'll do it later
                    </button>
                </div>
                </div>
              </div>
            </div>
        }
        {bugReportModalOpen &&
            <BugReportForm isOpen={bugReportModalOpen} handleClose={handleClose} />
        }
    </>
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.common.isLoading,
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    dailyBalances: state.common.dailyBalances
  });

export default connect(mapStateToProps, { getDashboardData, getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies, getDailyBalances })(Dashboard);