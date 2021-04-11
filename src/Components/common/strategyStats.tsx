import { connect } from "react-redux"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Pie, PieChart } from 'recharts';
import { Row } from "react-bootstrap";
import ConnectStrategyModalForm from "../forms/connectStrategyModalForm";
import { useEffect, useState } from "react";
import { cpuUsage } from "node:process";

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

type StrategyData = {
    balance: number,
    incOrDecVsHodl: number
}

const StrategyStats = (props: any) => {

    const [strategyData, setStrategyData] = useState<StrategyData>({
        balance: 0,
        incOrDecVsHodl: 0
    })

    const [currentTab, setCurrentTab] = useState("")

    const [addModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        if (props.connectedStrategies.length > 0) {
            
            setCurrentTab(props.connectedStrategies[0].strategy.name)
        }
    }, [props.connectedStrategies])

    const handleClick = (strategy) => {
        
        setCurrentTab(strategy)
    }

    const connectedStrategies = props.connectedStrategies.map((strategy, i) => 
        <button onClick={() => handleClick(strategy.strategy.name)} className={(currentTab == strategy.strategy.name ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700") + " px-3 py-2 font-medium text-sm rounded-md"}>
            {strategy.strategy.name}
        </button> 
    )

    const connectedStrategyDetails = props.dashboardData.map((strategy) => 
        strategy.inc_or_dec_vs_hodl[0].strategy_name == currentTab &&
        <div>
            <p> Inc/Dec vs HODL: {strategy.inc_or_dec_vs_hodl[0].inc_or_dec.toFixed(2)}%</p>
            <p>Balance: ${strategy.balance.toFixed(2)}</p>
        </div>
    )

    const handleClose = ()=> {
        setAddModalOpen(false)
    }

    return <>
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
                    {connectedStrategies}
                    </nav>
                </div>
                </div>

                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                <button disabled={props.connectedExchanges.length < 1} onClick={() => setAddModalOpen(true)} type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add New Strategy
                </button>
                </div>
            </div>
            <br/>
            <Row>
            {connectedStrategyDetails}
            {/* <LineChart
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
                </PieChart> */}
                </Row>
            </div>
            {addModalOpen &&
            <ConnectStrategyModalForm isOpen={addModalOpen} handleClose={handleClose} />
            }
    </>
}

const mapStateToProps = (state) => ({
    connectedStrategies: state.common.connectedStrategies,
    connectedExchanges: state.common.connectedExchanges,
    dashboardData: state.common.dashboardData
})
export default connect(mapStateToProps )(StrategyStats);