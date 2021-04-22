import { connect } from "react-redux"
import { Line, ComposedChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Row } from "react-bootstrap";
import ConnectStrategyModalForm from "../forms/connectStrategyModalForm";
import { useEffect, useState } from "react";
import { getDailyBalances, getConnectedStrategies } from '../../actions/common';
  
type StrategyData = {
  balance: number,
  incOrDecVsHodl: number
}

type CurrentStrategy = {
  id: string,
  name: string
}

const StrategyStats = (props: any) => {

  const [tabs, setTabs] = useState([])

  const [currentTab, setCurrentTab] = useState<CurrentStrategy>({
    id: '',
    name: ''
  })
  
  const [opacity, setOpacity] = useState({
    hodl_value: 0.5,
    strategy_value: 0.5
  })

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    console.log(dataKey)
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
    if (props.connectedStrategies.length < 1) props.getConnectedStrategies()

    if (props.connectedStrategies.length > 0) {
      if (tabs.length < 1) {
        props.connectedStrategies.map(strategy => {
          debugger;
          setTabs(tabs => [...tabs, {
            id: strategy.id,
            name: strategy.strategy.name,
            current: true
          }])
        })
      }
      setCurrentTab({
        id: props.connectedStrategies[0].id,
        name: props.connectedStrategies[0].strategy.name
      })
    }
  }, [props.connectedStrategies])

    const [addModalOpen, setAddModalOpen] = useState(false);

    const handleClick = (strategy) => {
        setCurrentTab({
          ...currentTab,
          id: strategy.id,
          name: strategy.strategy.name
        })
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

    const handleClose = ()=> {
        setAddModalOpen(false)
    }

    const percentage = 100 - ((7 - 4 - 1) / (7 - 1)) * 100;

    return <>
        <div className="flex flex-col items-center flex-1 relative z-0 pb-6 focus:outline-none md:pb-6">
            
            <div>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={tabs.find((tab) => tab.current)}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-500">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap py-4 px-1 border-b font-medium text-sm'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            
            </div>
            <br/>
            

            <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-10">
                <div className="bg-gray-900 dark:bg-gray-900">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center xl:items-end md:justify-between">
                    <div className="flex flex-col">
                      <span className="mb-2 text-sm md:text-left leading-5 font-normal dark:text-gray-400">Balance</span>
                      <div className="flex flex-wrap justify-center md:justify-left items-baseline">
                        <span className="text-4xl md:text-5xl dark:text-white font-semibold">
                          <span className="flex-wrap md:flex-nowrap whitespace-nowrap truncate">$45000</span>
                        </span>
                        <span className="pl-4 text-green-400">
                          <span className="flex-wrap md:flex-nowrap whitespace-nowrap truncate dark:text-green-400">2.78%</span>
                        </span>
                        <span className="px-4 dark:text-gray-200 text-gray-400 whitespace-nowrap">Past 1D</span>
                      </div>
                    </div>
                    <span className="flex flex-col-reverse xl:flex-row md:ml-6 items-center md:items-center">
                      
                      <nav className="px-px flex flex-nowrap overflow-x-auto">
                        <button type="button" className="first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 dark:text-white dark:hover:bg-gray-700 border dark:border-gray-600 -ml-px dark:bg-gray-700 first:rounded-l-md last:rounded-r-md z-10">1D</button>
                        <button type="button" className="first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 dark:text-white dark:hover:bg-gray-700 border dark:border-gray-600 -ml-px dark:bg-gray-800 dark:active:bg-gray-700 first:rounded-l-md last:rounded-r-md">1W</button>
                        <button type="button" className="first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 dark:text-white dark:hover:bg-gray-700 border dark:border-gray-600 -ml-px dark:bg-gray-800 dark:active:bg-gray-700 first:rounded-l-md last:rounded-r-md">1M</button>
                        <button type="button" className="first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 dark:text-white dark:hover:bg-gray-700 border dark:border-gray-600 -ml-px dark:bg-gray-800 dark:active:bg-gray-700 first:rounded-l-md last:rounded-r-md">3M</button>
                        <button type="button" className="first:-ml-px relative focus:z-20 flex-shrink-0 inline-flex items-center justify-center overflow-hidden font-medium truncate focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-gray-800 focus-visible:ring-offset-gray-900 transition text-base leading-5 px-4 py-2 dark:text-white dark:hover:bg-gray-700 border dark:border-gray-600 -ml-px dark:bg-gray-800 dark:active:bg-gray-700 first:rounded-l-md last:rounded-r-md">6M</button>
                      </nav>
                    </span>
                  </div>
                  <div className="h-96 flex items-center justify-center relative">
                    
                  <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart width={800} height={300} data={data} margin={{top: 25, right: 30, left: 20, bottom: 5}}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="100%" y2="1">
                          <stop offset="5%" stopColor="#129a74" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                          <stop offset="5%" stopColor="#31C48D" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1A202E" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    <CartesianGrid
                      vertical={false}
                      horizontal={false}
                      strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      domain={["dataMin", "dataMax + 1"]}
                    />
                    
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                    <Area name="HODL Value" type="monotone" dataKey="hodl_value" stroke="#006991" strokeWidth={2} fillOpacity={opacity.hodl_value} fill="url(#colorUv)" />
                    <Area name="Strategy Value" type="monotone" dataKey="strategy_value" stroke="#31C48D" strokeWidth={2} fillOpacity={opacity.strategy_value} fill="url(#colorUv)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                  
                  </div>
                </div>
              </div>
            </div>
            
            
                
            </div>
            {/* {addModalOpen &&
            <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
            } */}
    </>
}

const mapStateToProps = (state) => ({
    connectedStrategies: state.common.connectedStrategies,
    connectedExchanges: state.common.connectedExchanges,
    dashboardData: state.common.dashboardData,
    dailyBalances: state.common.dailyBalances
})
export default connect(mapStateToProps, { getDailyBalances, getConnectedStrategies } )(StrategyStats);