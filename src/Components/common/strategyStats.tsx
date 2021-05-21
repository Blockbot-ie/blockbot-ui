import { connect } from "react-redux"
import { Line, ComposedChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from 'react-loader-spinner';
import React, { Fragment, useEffect, useState } from "react";
import { getConnectedStrategies, getDailyBalances, getDashboardData } from '../../actions/common';
import { format } from "date-fns";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
  
type StrategyData = {
  balance: number,
  incOrDecVsHodl: number
}

type CurrentStrategy = {
  id: string,
  name: string,
  balance: number,
  incOrDecVsHodl: number
}

const intervals = ['1D', '1W', '1M', '3M', '6M']

const StrategyStats = (props: any) => {

  const [tabs, setTabs] = useState([])

  const [intervalState, setIntervalState] = useState('')

  const [currentTab, setCurrentTab] = useState<CurrentStrategy>({
    id: '',
    name: '',
    balance: 0,
    incOrDecVsHodl: 0
  })
  
  const [opacity, setOpacity] = useState({
    hodl_value: 0.5,
    strategy_value: 0.5
  })

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity({
      ...opacity,
      [dataKey]: 0.9
    });
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity({
      ...opacity,
      hodl_value: 0.5,
      strategy_value: 0.5
    });
  };
  
  useEffect(() => {

    setIntervalState('1D')
    
  }, [])

  useEffect(() => {
    if (props.connectedStrategies.length > 0) {
      if (tabs.length < 1) {
        props.connectedStrategies.map(strategy => {
          setTabs(tabs => [...tabs, {
            id: strategy.id,
            name: strategy.strategy.name
          }])
        })
      }
      setCurrentTab({
        ...currentTab,
        id: props.connectedStrategies[0].id,
        name: props.connectedStrategies[0].strategy.name
      })
    }
  }, [props.connectedStrategies])

  useEffect(() => {
    if (props.dashboardData.length > 0) {
      const stats = props.dashboardData[0].inc_or_dec_vs_hodl.filter(s => s.strategy_pair_id == currentTab.id)[0]
      if (stats) {
        setCurrentTab({
          ...currentTab,
          balance: stats.balance,
          incOrDecVsHodl: stats.inc_or_dec
        })
      } 
    }
  }, [props.dashboardData])

  useEffect(() => {

    if (currentTab.id != null && currentTab.id != '') {
      props.getDailyBalances(currentTab.id, intervalState)
    }
    
  }, [currentTab])

    const handleClick = (tab) => {
      const current = tabs.find(x => x.id == tab.id)
      const balance = props.dashboardData[0].inc_or_dec_vs_hodl.filter(s => s.strategy_pair_id == current.id)[0]
      setIntervalState('1D')
      setCurrentTab({
        id: current.id,
        name: current.name,
        balance: balance.balance,
        incOrDecVsHodl: balance.inc_or_dec
      })
      
      props.getDailyBalances(tab.id, intervalState)
    }

    let data = []

    const chartData = props.dailyBalances.map(strategy => {
      if (strategy.strategy_id == currentTab.id) {
        data = strategy.data
      }
    })

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

    const onIntervalChange = (e: any) => {
      setIntervalState(e.target.value)
      props.getDailyBalances(currentTab.id, e.target.value)
    }

    const dateFormatter = date => {
      if (date != null && date != undefined && date != 'auto') {
        return format(new Date(date), "PP");
      }
    };

    return <>
        <div className="flex flex-col items-center flex-1 relative z-0 pb-6 focus:outline-none md:pb-6">
            <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-10">
                <div className="bg-gray-900 bg-gray-900">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center xl:items-end md:justify-between">
                    <div className="flex flex-col mt-4">
                      <span className="mb-2 text-sm md:text-left leading-5 font-normal text-gray-400">Balance</span>
                      <div className="flex flex-wrap justify-center md:justify-left items-baseline">
                        <span className="text-4xl md:text-5xl text-white font-semibold">
                          <span className="flex-wrap md:flex-nowrap whitespace-nowrap truncate">${currentTab.balance.toFixed(2)}</span>
                        </span>
                        <span className="pl-4 text-green-400">
                          <span className={classNames(
                            currentTab.incOrDecVsHodl > 0
                              ? "text-green-400"
                              : "text-red-400", 
                              "flex-wrap md:flex-nowrap whitespace-nowrap truncate"
                          )}>
                          {currentTab.incOrDecVsHodl.toFixed(2)}%</span>
                        </span>
                        <span className="px-4 text-gray-200 text-gray-400 whitespace-nowrap">Past 1D</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                    <Listbox value={currentTab} onChange={handleClick}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="mb-2 text-sm md:text-left leading-5 text-center font-normal text-gray-400">Strategy</Listbox.Label>
                          <div className="mt-1 relative">
                            <Listbox.Button className="relative w-full bg-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <span className="flex items-center">
                                
                                <span className="ml-3 block truncate text-gray-200">{currentTab.name}</span>
                              </span>
                              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute z-50 mt-1 w-full bg-gray-700 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                              >
                                {tabs.map((tab) => (
                                  <Listbox.Option
                                    key={tab.id}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={tab}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate text-gray-200')}
                                          >
                                            {tab.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    </div>
                    <span className="flex flex-col-reverse xl:flex-row md:ml-6 items-center md:items-center">
                      <nav className="px-px flex flex-nowrap overflow-x-auto">
                        {intervals.map((interval, i) => (
                          <button
                          key={i}
                          className={classNames(
                            interval == intervalState
                            ? "bg-gray-500"
                            : "bg-gray-700",
                              "first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 text-white border border-gray-600 -ml-px first:rounded-l-md last:rounded-r-md z-10"
                            )}
                          onClick={onIntervalChange} value={interval} type="button" >{interval}</button>  
                        ))}
                      </nav>
                    </span>
                  </div>
                  <div className="h-96 flex items-center justify-center relative">
                  {props.dailyBalances.length > 0 ?
                    props.dailyBalances[0].data.length < 4 ?
                    <h3 className="text-white">We need {3 - props.dailyBalances[0].data.length} days to gather more data</h3>
                    :
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart width={800} height={300} data={data} margin={{top: 25, right: 30, left: 20, bottom: 5}}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="100%" y2="1">
                          <stop offset="5%" stopColor="#129a74" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                          <stop offset="5%" stopColor="#31C48D" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1A202E" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>

                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                      />
                      
                      <XAxis
                        dataKey="date"
                        
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={dateFormatter}
                        tick={{fill: 'white', fontSize: '13', textAnchor: 'right' }}
                      />
                      
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                      <Area name="HODL Value" type="monotone" dataKey="hodl_value" stroke="#006991" strokeWidth={2} fillOpacity={opacity.hodl_value} fill="url(#colorUv)" />
                      <Area name="Strategy Value" type="monotone" dataKey="strategy_value" stroke="#31C48D" strokeWidth={2} fillOpacity={opacity.strategy_value} fill="url(#colorUv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                    :
                    <Loader type="Circles" color="#00BFFF" height={24} width={24}/>
                    } 
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
}

const mapStateToProps = (state) => ({
    dashboardData: state.common.dashboardData,
    dailyBalances: state.common.dailyBalances,
    connectedStrategies: state.common.connectedStrategies
})
export default connect(mapStateToProps, { getDailyBalances, getConnectedStrategies, getDashboardData } )(StrategyStats);
