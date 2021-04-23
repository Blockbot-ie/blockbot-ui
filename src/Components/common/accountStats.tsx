import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getDashboardData } from '../../actions/common';

type DashboardData = {
    balance: number,
    incOrDecVsHodl: number,
    activeStrategies: number
}

const AccountStats = (props: any) => {

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        balance: 0,
        incOrDecVsHodl: 0,
        activeStrategies: 0
    })

    useEffect(() => {
        if (props.dashboardData.length < 1) props.getDashboardData();
    }, [])

    useEffect(() => {
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

    return <>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-3 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-300 truncate">
                Balance
            </dt>
            <dd className="mt-1 text-3xl font-semibold dark:text-white">
                {dashboardData.balance != null ?
                   <p>${dashboardData.balance.toFixed(2)}</p>
                :
                <p>$0</p>
                }
                
            </dd>
            </div>

            <div className="px-4 py-3 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-300 truncate">
                Inc/Dec vs HODL
            </dt>
            <dd className="mt-1 text-3xl font-semibold dark:text-white">
            {dashboardData.incOrDecVsHodl != null ?
                   <p>{dashboardData.incOrDecVsHodl.toFixed(2)}%</p>
                :
                <p>0%</p>
                }
            </dd>
            </div>

            <div className="px-4 py-3 dark:bg-gray-700 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-300 truncate">
                Active Strategies
            </dt>
            <dd className="mt-1 text-3xl font-semibold dark:text-white">
                {dashboardData.activeStrategies}
            </dd>
            </div>
        </dl>
    </>
}

const mapStateToProps = (state) => ({
    dashboardData: state.common.dashboardData
})

export default connect(mapStateToProps, { getDashboardData })(AccountStats);