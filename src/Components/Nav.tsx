import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import store from '../store';
import { logout } from '../actions/auth';
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline'
import Dashboard from './dashboard'
import ConnectExchange from './strategies/ConnectExchange';
import Strategies from './strategies/Strategies';
import PrivateRoute from '../Components/common/PrivateRoute';
import { getDashboardData, getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs, getDailyBalances } from '../actions/common';
import connectExchangeForm from './forms/connectExchangeForm';
import connectStrategyForm from './forms/connectStrategyForm';

const navigation = [
  { name: 'Dashboard', link: "/", icon: HomeIcon, current: true },
  { name: 'Exchanges', link: "/exchanges", icon: UsersIcon, current: false },
  { name: 'Strategies', link: "/strategies", icon: FolderIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = (props: any) => {

  useEffect(() => {
    console.log(location.pathname)
  }, []);

// useEffect(() => {
//   if (props.dashboardData.length > 0) {
//     props.getDashboardData()
//   }
  
// }, [props.connectedStrategies])

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const logoutClick = () => {
    if (props.isAuthenticated) {
      store.dispatch<any>(logout());
    }
  }


  return (
    <>
    {props.isAuthenticated && location.pathname != '/user-story' ?

      <div className="h-screen flex overflow-hidden bg-gray-900 bg-gray-900">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      to={item.link}
                      key={item.name}
                      className={classNames(
                        item.current
                          ? 'bg-gray-500 text-white hover:text-gray-900'
                          : 'text-white hover:bg-gray-500 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-500',
                          'mr-4 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                    </div>
                    <div className="ml-3">
                    {/* <p className="text-sm font-medium text-gray-500">{props.user.first_name} {props.user.last_name}</p> */}
                    <button type="button" onClick={() => logoutClick()} className="text-xs font-medium text-white hover:text-gray-700">Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-500 bg-gray-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-900 space-y-1">
                {navigation.map((item) => (
                  <Link
                    to={item.link}
                    className={classNames(
                      item.current ? 'bg-gray-500 text-white' : 'text-white hover:bg-gray-500 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-500',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-500 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="ml-3">
                    
                    {/* <p className="text-sm font-medium text-gray-500">{props.user.first_name} {props.user.last_name}</p> */}
                    <button type="button" onClick={() => logoutClick()} className="text-xs font-medium text-white hover:text-gray-700">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute path="/exchanges" component={ConnectExchange} />
              <PrivateRoute path="/strategies" component={Strategies} />
              <PrivateRoute path="/connect-exchange" component={connectExchangeForm} />
              <PrivateRoute path="/connect-strategy" component={connectStrategyForm} />
            
          </div>
        </main>
      </div>
      </div>
    :
      location.pathname != "/user-story" &&   
        <Redirect to="/login" />
    }
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  exchanges: state.common.exchanges,
  strategies: state.common.strategies,
  connectedExchanges: state.common.connectedExchanges,
  connectedStrategies: state.common.connectedStrategies,
  strategyPairs: state.common.strategyPairs,
  dailyBalances: state.common.dailyBalances,
  dashboardData: state.common.dashboardData
});
export default connect(mapStateToProps, { getDashboardData, getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies, getDailyBalances })(Nav);

