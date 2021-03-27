import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConnectStrategyModalForm from "./forms/connectStrategyModalForm";
import { getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs } from '../actions/common';
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Pie, PieChart } from 'recharts';
import { logout } from '../actions/auth';
import store from "../store";
import { Row } from "react-bootstrap";
import Orders from "./common/orders";
import AccountStats from "./common/accountStats";
import Nav from "./Nav";

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
    }, []);

    const [addModalOpen, setAddModalOpen] = React.useState(false);

    const handleClose = ()=> {
        setAddModalOpen(false)
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
                    <div>
                        <AccountStats />
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
                <Orders />
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
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies })(Dashboard);