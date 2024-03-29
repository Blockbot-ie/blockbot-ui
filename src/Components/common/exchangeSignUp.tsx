import { getExchanges } from '../../actions/common';
import { useEffect } from "react"
import { connect } from "react-redux"

const ExchangeSignUp = (props: any) => {

    useEffect(() => {
        if (props.exchanges.length < 1) {
            props.getExchanges()
        }
    }, [])

    useEffect(() => {
        if (props.connectedExchanges.length > 0) {
            props.next()
          }
    }, [props.connectedExchanges])

    const exchanges = []

    const exchangeList = props.exchanges.map((exchange, i) => 
      exchanges.push({
        exchange_id: exchange.exchange_id,
        name: exchange.display_name,
        image: require('../../images/exchangeLogos/' + exchange.name + '.png').default,
        signUpUrl: exchange.sign_up_url
      })
    )

    const handleOnClick = (exchange) => {
        props.setCurrentExchange(exchange)
    }

    return <>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exchanges.map((exchange) => (
                <li key={exchange.exchange_id} className="col-span-1 bg-indigo-900 rounded-lg shadow divide-y divide-gray-900">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-white text-sm font-medium truncate">{exchange.name}</h3>
                    </div>
                    {/* <p className="mt-1 text-gray-500 text-sm truncate">{exchange.title}</p> */}
                    </div>
                    <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={exchange.image} alt="" />
                </div>
                <div>
                    <div className="-mt-px flex divide-x divide-gray-900">
                    
                    <div className=" w-0 flex-1 flex">
                        <a
                        onClick={() => handleOnClick(exchange.exchange_id)}
                        className="relative w-0 flex-1 inline-flex items-center justify-center bg-gray-700 hover:bg-gray-500 py-4 text-xs text-white font-medium rounded-b-lg hover:text-gray-500"
                        >
                        <span className="ml-3 mr-2">Continue</span>
                        </a>
                    </div>
                    </div>
                </div>
                </li>
            ))}
            </ul>
    </>
}

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    isLoading: state.common.isLoading,
    connectedExchanges: state.common.connectedExchanges
  });

export default connect(mapStateToProps, { getExchanges })(ExchangeSignUp);