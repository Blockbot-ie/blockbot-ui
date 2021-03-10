import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm, useStep } from "react-hooks-helper";
import { connect } from "react-redux";
import ConnectExchange from "../strategies/ConnectExchange";
import Strategies from "../strategies/Strategies";
import { getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs } from '../../actions/common';
import { Link, Route } from "react-router-dom";

const steps = [
  { id: "connectExchange" },
  { id: "strategies" }
];

const Main = (props: any) => {
    const [formData, setForm] = useForm(0);
    const { step, navigation } = useStep({ initialStep: 0, steps });

    const [tabState, setTabState] = useState({
        tab: <div></div>
    })

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
        console.log(props)
    }, []);
    const change = (val: any) =>  {
        if (val == "1") {
            setTabState({
                ...tabState,
                tab: <ConnectExchange navigation={navigation} />
            })
        }
        if (val == "2"){
            setTabState({
                ...tabState,
                tab: <Strategies navigation={navigation} />
            })
        }
    }

    return <>
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                <nav className="space-y-1">
                    <a href="#" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!-- Heroicon name: outline/user-circle --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">
                        Profile
                    </span>
                    </a>

                    <Link to="/settings/accounts" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!-- Heroicon name: outline/cog --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">
                        Exchange Account
                    </span>
                    </Link>

                    <Link to="/settings/strategies" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!-- Heroicon name: outline/key --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span className="truncate">
                        Strategies
                    </span>
                    </Link>

                    <a href="#" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!-- Heroicon name: outline/bell --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="truncate">
                        Notifications
                    </span>
                    </a>

                    {/* <!-- Current: "bg-gray-50 text-orange-600 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" --> */}
                    <a href="#" className="bg-gray-50 text-orange-600 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page">
                    {/* <!-- Current: "text-orange-500", Default: "text-gray-400 group-hover:text-gray-500" --> */}
                    {/* <!-- Heroicon name: outline/credit-card --> */}
                    <svg className="text-orange-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="truncate">
                        Plan &amp; Billing
                    </span>
                    </a>

                    <a href="#" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!-- Heroicon name: outline/view-grid-add --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">
                        Integrations
                    </span>
                    </a>
                </nav>
                </aside>

                {/* <!-- Payment details --> */}
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <section aria-labelledby="payment_details_heading">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <Route path="/settings/accounts" component={ConnectExchange} />    
                        <Route path="/settings/strategies" component={Strategies} />
                    </div>
                </section>
                </div>
            </div>
        </main>
    </>
};

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies })(Main);