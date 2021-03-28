import { useState, useEffect } from "react"
import { connect } from "react-redux"

type DashboardData = {
    balance: number,
    incOrDecVsHodl: number,
    activeStrategies: number
}

const TopStrategies = (props: any) => {

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        balance: 0,
        incOrDecVsHodl: 0,
        activeStrategies: 0
    })

    useEffect(() => {
        console.log(props.dashboardData)
        if (props.dashboardData.length > 0) {
            let totalIncOrDec = 0
            let totalBalance = 0
            props.dashboardData[0].inc_or_dec_vs_hodl.map(pair => {
                totalIncOrDec += pair.inc_or_dec
                totalBalance += pair.balance
            })

            totalIncOrDec = totalIncOrDec / props.dashboardData[0].inc_or_dec_vs_hodl.length

            setDashboardData({
                ...dashboardData,
                balance: totalBalance,
                incOrDecVsHodl: totalIncOrDec,
                activeStrategies: props.dashboardData[0].active_strategies
            })   
        }
    }, [props.dashboardData])

    const strats = () => {
        if (props.dashboardData.length > 0) {
            let sortedStrategies = props.dashboardData[0].inc_or_dec_vs_hodl.sort((a, b) => 
            b.inc_or_dec - a.inc_or_dec
            )

            return sortedStrategies.map((pair, i) => (
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pair.strategy_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pair.pair}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pair.inc_or_dec.toFixed(2)}
                    </td>
                </tr>
            ))
        }
        
    }

    return <>
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            %
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {strats()}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </>
}

const mapStateToProps = (state) => ({
    dashboardData: state.common.dashboardData
})

export default connect(mapStateToProps)(TopStrategies)