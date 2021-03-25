import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ConnectExchangeForm from "../forms/connectExchangeForm";
import ConnectStrategyForm from "../forms/connectStrategyForm";
import Review from "./review";


const UserStoryMain = () => {

    const [step, setStep] = useState(1)

    const next = () => {
        setStep(step + 1)
    }

    const back = () => {
        setStep(step - 1)
    }

    return <>
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
        
        <nav aria-label="Progress">
        <ol className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
            <li className="relative md:flex-1 md:flex">
            
            <a href="#" className="group flex items-center w-full">
                {step == 1 ?
                    <div>
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                    <span className="text-indigo-600">01</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">Connect Exchange</span>
                    </div>
                    :
                    
                        <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                            {/* <!-- Heroicon name: solid/check --> */}
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">Connect Exchange</span>
                        </span>
                    
                }
            </a>
            <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                </svg>
            </div>
            </li>

            <li className="relative md:flex-1 md:flex">
            
            <a href="#" className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
                {step == 1 &&
                <div>
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">02</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">Connect Strategy Pair</span>
                    </span>
                </div>
                }
                {step == 2 &&
                <div>
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                    <span className="text-indigo-600">02</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">Connect Strategy Pair</span>
                </div>
}
                {step == 3 &&
                    <span className="px-6 py-4 flex items-center text-sm font-medium">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                            {/* <!-- Heroicon name: solid/check --> */}
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">Connect Strategy Pair</span>
                        </span>
                }
                    
            </a>
            <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                </svg>
            </div>
            </li>

            <li className="relative md:flex-1 md:flex">
            <a href="#" className="group flex items-center">
                {step == 3 ?
                <div>
                    <div>
                    <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                    <span className="text-indigo-600">03</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-indigo-600">Review</span>
                </div>
                </div>
                :
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">03</span>
                </span>
                <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">Review</span>
                </span>
                }
                
            </a>
            </li>
        </ol>
        </nav>
        </div>
        {step == 1 &&
        <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <ConnectExchangeForm next={next}/>
        </div>
        }
        {step == 2 &&
        <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <ConnectStrategyForm next={next} back={back}/>
        </div>
        }
        {step == 3 &&
        <div>
            <Review />
        </div>
        }
    </div>

    </>
}

export default connect()(UserStoryMain);