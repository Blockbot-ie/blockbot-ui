import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux"


const TopUpStrategyForm = (props: any) => {

    const [topUpAmount, setTopUpAmount] = useState({
        stratgy_pair: '',
        currency: '',
        amount: null,
        ticker_1: '',
        ticker_2: ''
    })

    useEffect(() => {
        const pair = props.currentStrategy.pair
        let i = pair.indexOf('/')
        let ticker_1 = pair.substring(0, i)
        let ticker_2 = pair.substring(i+1, pair.length)
        setTopUpAmount({
            ...topUpAmount,
            stratgy_pair: props.currentStrategy.strategy_pair_id,
            currency: props.currentStrategy.current_currency,
            ticker_1: ticker_1,
            ticker_2: ticker_2
        })
    }, [])

    const handleOnChange = (e: any) => {
        setTopUpAmount({
            ...topUpAmount,
            currency: e.target.value
        })
      }
      const showState = () => {
        console.log(topUpAmount)
    }

    return <>
    {props.isOpen &&
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form method="POST">
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* <span className="text-gray-500 sm:text-sm">
                    $
                  </span> */}
                </div>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {setTopUpAmount({...topUpAmount, amount: parseFloat(e.target.value)})}}
                type="number" name="current_currency_balance" id="current_currency_balance" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="current_currency" className="sr-only">Currency</label>
                  <select onChange={handleOnChange} id="current_currency" name="current_currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                    <option >{topUpAmount.ticker_1}</option>
                    <option>{topUpAmount.ticker_2}</option>
                  </select>
                </div>
              </div>
            </div>
            <button disabled={props.isLoading} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            { props.isLoading && <FontAwesomeIcon icon={ faSpinner } /> }
            Submit
            </button>
        </form>
        <button type="submit" onClick={() => props.handleClose()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Close
        </button>
        <button type="submit" onClick={() => showState()} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Show
        </button>
        
        </div>
        </div>
        </div>
    </div>
}
    </>
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps) (TopUpStrategyForm)