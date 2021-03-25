import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConnectStrategyModalForm from "./forms/connectStrategyModalForm";
import { getDashboardData, getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs } from '../actions/common';
import { Link, Route } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Pie, PieChart } from 'recharts';
import { logout } from '../actions/auth';
import store from "../store";
import { Row } from "react-bootstrap";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type DashboardData = {
    balance: number,
    activeStrategies: number
}

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
        if (props.dashboardData.length < 1) {
            props.getDashboardData()
        }
    }, []);

    useEffect(() => {
        props.getDashboardData()
    }, [props.connectedStrategies])

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        balance: 0,
        activeStrategies: 0
    })

    useEffect(() => {
        if (props.dashboardData.length > 0) {
            setDashboardData({
                ...dashboardData,
                balance: props.dashboardData[0].balance.current_currency_balance__sum,
                activeStrategies: props.dashboardData[0].active_strategies
            })   
        }
    }, [props.dashboardData])

    const [addModalOpen, setAddModalOpen] = React.useState(false);

    const handleClose = ()=> {
        setAddModalOpen(false)
    }

    const logoutClick = () => {
        if (props.isAuthenticated) {
          store.dispatch<any>(logout());
        }
      }

      const [isOpen, setIsOpen] = useState(true)

    return <>
    <div className="h-screen flex overflow-hidden bg-gray-100">
        {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
        <div className="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
            {/* <!--
            Off-canvas menu overlay, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

            {/* <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            --> */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            {/* <!--
                Close button, show/hide based on off-canvas menu state.

                Entering: "ease-in-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-300"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Close sidebar</span>
                {/* <!-- Heroicon name: outline/x --> */}
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>

            <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                    <!-- Heroicon name: outline/home --> */}
                    <svg className="text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </a>

                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/users --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Team
                </a>

                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/folder --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    Projects
                </a>

                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/calendar --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Calendar
                </a>

                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/inbox --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    Documents
                </a>

                <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/chart-bar --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-4 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Reports
                </a>
                </nav>
            </div>
            </div>

            <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
            </div>
        </div>

        {/* <!-- Static sidebar for desktop --> */}
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow" />
                </div>
                <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 bg-white space-y-1">
                    {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                    <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                    <!-- Heroicon name: outline/home --> */}
                    <svg className="text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                    </a>

                    <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/users --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Team
                    </a>

                    <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/folder --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    Projects
                    </a>

                    <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/calendar --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Calendar
                    </a>

                    <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/inbox --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    Documents
                    </a>

                    <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    {/* <!-- Heroicon name: outline/chart-bar --> */}
                    <svg className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Reports
                    </a>
                </nav>
                </div>
            </div>
            </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
                <span className="sr-only">Open sidebar</span>
                {/* <!-- Heroicon name: outline/menu-alt-2 --> */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            </button>
            <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex">
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    {/* <!-- Heroicon name: outline/bell --> */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* <!-- Profile dropdown --> */}
                <div className="ml-3 relative">
                    <div>
                    <button type="button" className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=lJQCsnRiro&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                    </div>

                    {/* <!--
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>

                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>

                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => logoutClick()}>Logout</button>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <main className="flex-1 relative overflow-y-auto focus:outline-none">
            
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* <!-- Replace with your content --> */}
                    <div>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            Balance
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            $ {dashboardData.balance}
                        </dd>
                        </div>

                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            Inc/Dec vs HODL
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            +24%
                        </dd>
                        </div>

                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">
                            Active Strategies
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                            {dashboardData.activeStrategies}
                        </dd>
                        </div>
                    </dl>
                    </div>
                    {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                        <div>
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">Select a tab</label>
                            <select id="tabs" name="tabs" className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>20 Week SMA</option>
                            <option selected>20 Week SMA +</option>
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="flex space-x-4" aria-label="Tabs">
                            {/* <!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" --> */}
                            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md">
                                20 Week SMA
                            </a>

                            <a href="#" className="bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md" aria-current="page">
                                20 Week SMA +
                            </a>
                            </nav>
                        </div>
                        </div>

                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                        <button onClick={() => setAddModalOpen(true)} type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add New Strategy
                        </button>
                        </div>
                    </div>
                    <br/>
                    <Row>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>

                        <PieChart width={400} height={200}>
                            <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                        </Row>
                    </div>
                    <br/>
                    <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Position
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Strategy
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pair
                                </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    1
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    20 Week SMA +
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    BTC/USDC
                                </td>
                                </tr>
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    2
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    20 Week SMA
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    BTC/USDC
                                </td>
                                </tr>
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    3
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    20 Week SMA +
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ETH/USDC
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <br/>
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                        <div>
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">Select a tab</label>
                            <select id="tabs" name="tabs" className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Open</option>
                            <option selected>Filled</option>
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <nav className="flex space-x-4" aria-label="Tabs">
                            {/* <!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" --> */}
                            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md">
                                Open
                            </a>

                            <a href="#" className="bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md" aria-current="page">
                                Filled
                            </a>
                            </nav>
                        </div>
                        </div>

                        </div>
                    </div>
                    <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Side
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Market
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Size
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Filled
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Filled Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fee
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Buy
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    BTC/USDC
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    15.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    0.000273
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $54,245
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $0.07
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Mar 23, 2021
                                </td>
                                </tr>
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Sell
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    BTC/USDC
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    0.000273
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    0.000273
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $50,575
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $0.07
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Mar 25, 2021
                                </td>
                                </tr>
                                <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Buy
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    BTC/USDC
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    15.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    0.000273
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $54,245
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    $0.07
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Mar 23, 2021
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>


                {/* <!-- /End replace --> */}
                </div>
            
            </main>
        </div>
        </div>
        {!props.user.is_connectected && isOpen && props.connectedStrategies.length < 1 &&
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
                    <button onClick={() => setIsOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    I'll do it later
                    </button>
                </div>
                </div>
              </div>
            </div>
        }
        {addModalOpen &&
            <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
        }
    </>
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    dashboardData: state.common.dashboardData,
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getDashboardData, getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies })(Dashboard);