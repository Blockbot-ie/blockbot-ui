import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getDashboardData } from '../../actions/common';


type DashboardData = {
    balance: number,
    activeStrategies: number
}

const AccountStats = (props: any) => {

    useEffect(() => {
        if (props.dashboardData.length < 1) {
            props.getDashboardData()
        }
    }, [])

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

    return <>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
                Balance
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                $ {dashboardData.balance.toFixed(2)}
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
    </>
}

const mapStateToProps = (state) => ({
    dashboardData: state.common.dashboardData
})

export default connect(mapStateToProps, { getDashboardData })(AccountStats);