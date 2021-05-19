import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOrders } from '../../actions/common';
import Moment from 'moment';

const Orders = (props: any) => {

    useEffect(() => {
        props.getOrders()
    }, [])

    const [tab, setTab] = useState('Open')

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const openOrders = () => {
        if (props.orders.filter(order => order.status == 'open').length < 1) {
            return <span className="text-sm font-medium text-white truncate">No open orders</span>
        }
        else {
            return props.orders.filter(order => order.status == 'open').map(openOrder => (
                <tr>
                    <td className={classNames(
                        openOrder.side == 'buy'
                        ? "text-buyGreen"
                        : "text-red-500"
                        ,"px-6 py-4 whitespace-nowrap text-sm font-medium"
                    )}>
                        {capitalizeFirstLetter(openOrder.side)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {openOrder.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {openOrder.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {openOrder.filled}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        ${openOrder.filled_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        ${openOrder.fee.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {openOrder.created_on}
                    </td>
                </tr>
            ))}
    }

    const filledOrders = () => {
        if (props.orders.filter(order => order.status == 'closed').length < 1) {
            return <p className="text-sm font-medium text-white truncate">No filled orders</p>
        }
        else {
            return props.orders.filter(order => order.status == 'closed').map(filledOrder => (
                <tr>
                    <td className={classNames(
                        filledOrder.side == 'buy'
                        ? "text-buyGreen"
                        : "text-red-600"
                        ,"px-6 py-4 whitespace-nowrap text-sm font-medium"
                    )}>
                        {capitalizeFirstLetter(filledOrder.side)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {filledOrder.market}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {filledOrder.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {filledOrder.filled}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        ${filledOrder.filled_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        ${filledOrder.fee.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {filledOrder.created_on}
                    </td>
                </tr>
            ))}
    }

    return <>
    <div className="mt-5">
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
                <button onClick={() => setTab('Open')} className={tab == 'Open' ? 'bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md' : 'bg-gray-700 text-white hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md'}>
                    Open
                </button>

                <button onClick={() => setTab('Filled')} className={tab == 'Filled' ? 'bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md' : 'bg-gray-700 text-white hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md'} aria-current="page">
                    Filled
                </button>
                </nav>
            </div>
            </div>
            </div>
        </div>
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-900">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Side
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Market
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Filled
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Filled Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Date
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-200">
                    {tab == 'Open' ?
                        openOrders()
                    :
                        filledOrders()
                    }
                </tbody>
            </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    </>
}


const mapStateToProps = (state) => ({
    orders: state.common.orders
  });

export default connect(mapStateToProps, { getOrders })(Orders);