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

const Dashboard = (props: any) => {

    useEffect(() => {
        if (props.exchanges.length < 1){
            props.getExchanges()
        }
        if (props.strategies.length < 1) {
            props.getStrategies()
        }
        if (props.connectedExchanges.length < 1){
            props.getConnectedExchanges();
        }
        if (props.strategyPairs.length < 1) {
            props.getStrategyPairs()
        }
        if (props.connectedStrategies.length < 1) {
            props.getConnectedStrategies()
        }
        if (props.dailyBalances.length < 1) {
          props.getDailyBalances()
        }
    }, []);

    useEffect(() => {
      if (props.connectedStrategies.length > 0) {
        props.getDashboardData()
      }
      
    }, [props.connectedStrategies])
    
    const [bugReportModalOpen, setBugReportModalOpen] = React.useState(false);

    const handleClose = () => {
        setBugReportModalOpen(false)
    }

    const [isOpen, setIsOpen] = useState(true)

    return <>
    <div className="h-screen flex overflow-hidden bg-gray-100">
        {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
        <Nav />
        <div className="flex flex-col w-0 flex-1 overflow-hidden"> 
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* <!-- Replace with your content --> */}
                    
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
            </main>
        </div>
        </div>
        {!props.user && isOpen && props.connectedStrategies.length < 1 &&
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="dialog-1-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <!--
                  Background overlay, show/hide based on modal state.
            
                  Entering: "ease-out duration-300"
                    From: "opacity-0"
                    To: "opacity-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100"
                    To: "opacity-0"
                --> */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                {/* <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> */}
            
                {/* <!--
                  Modal panel, show/hide based on modal state.
            
                  Entering: "ease-out duration-300"
                    From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    To: "opacity-100 translate-y-0 sm:scale-100"
                  Leaving: "ease-in duration-200"
                    From: "opacity-100 translate-y-0 sm:scale-100"
                    To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                --> */}
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
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs,
    dailyBalances: state.common.dailyBalances
  });

export default connect(mapStateToProps, { getDashboardData, getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies, getDailyBalances })(Dashboard);