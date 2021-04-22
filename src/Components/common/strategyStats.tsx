import { connect } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Pie, PieChart } from 'recharts';
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
        <div className="bg-gray-900 px-4 py-5 border-b border-gray-200 sm:px-6">
            
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
            
            {/* {connectedStrategyDetails} */}
            <LineChart
                width={800}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="red" />
                      <stop offset={`${percentage}%`} stopColor="red" />
                      <stop offset={`${percentage}%`} stopColor="blue" />
                      <stop offset="100%" stopColor="blue" />
                    </linearGradient>
                  </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  domain={["dataMin", "dataMax + 1"]}
                 />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hodl_value" stroke="url(#gradient)" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="strategy_value" stroke="#82ca9d" />
                </LineChart>
                
            </div>
            {addModalOpen &&
            <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
            }
    </>
}

const mapStateToProps = (state) => ({
    connectedStrategies: state.common.connectedStrategies,
    connectedExchanges: state.common.connectedExchanges,
    dashboardData: state.common.dashboardData,
    dailyBalances: state.common.dailyBalances
})
export default connect(mapStateToProps, { getDailyBalances, getConnectedStrategies } )(StrategyStats);