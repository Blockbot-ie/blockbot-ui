import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ConnectExchangeForm from "../forms/connectExchangeForm";
import ConnectStrategyForm from "../forms/connectStrategyForm";
import ExchangeSignUp from "../common/exchangeSignUp";
import Review from "./review";
import { CheckIcon } from '@heroicons/react/solid'
import { propTypes } from "react-bootstrap/esm/Image";

const UserStoryMain = () => {

    const [currentExchange, setCurrentExchange] = useState('')

    const [step, setStep] = useState(1)

    const next = () => {
        handleStatusChange(step)
        setStep(step + 1)
    }

    const back = () => {
        setStep(step - 1)
    }

    const handleOnClick = () => {
        setStep(1)
    }
    
    const handleStep1 = (state) => {
        setCurrentExchange(state)
        next()
    }

    const handleStatusChange = (step) => {
        
        if (step === 1) {
            steps[0].status = 'complete'
            steps[1].status = 'current'

        }
        if (step === 2) {
            steps[1].status = 'complete'
            steps[2].status = 'current'
        }
        if (step === 3) {
            steps[2].status = 'complete'
            steps[3].status = 'current'
        }
        if (step === 4) {
            steps[3].status = 'complete'
            steps[4].status = 'current'
        }
    }

    const steps = [
        { name: 'Sign up to Exchange', href: '#', status: 'current' },
        { name: 'Connect Exchange', href: '#', status: 'upcoming' },
        { name: 'Connect Strategy', href: '#', status: 'upcoming' },
        { name: 'Review', href: '#', status: 'upcoming' },
      ]
      
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return <>

    <div className="relative flex-1 flex bg-gray-900 bg-gray-900">
        <div className="flex flex-col w-0 flex-1">
            <main className="flex flex-col items-center flex-1 relative z-0 pb-6 focus:outline-none md:pb-6">
                <header className="max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between md:h-16">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 text-white sm:text-3xl sm:truncate">Connect Exchange</h2>
                        </div>
                    </div>
                </header>
                <div className="flex-1 max-w-7xl w-full pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="p-8">
                        
                            <div className="flex flex-col md:flex-row justify-around">
                                <div className="w-full md:w-2/4"> 
                                    <ol className="">
                                        {steps.map((step, stepIdx) => (
                                        <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                                            {step.status === 'complete' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="relative flex items-start group">
                                                <span className="h-9 flex items-center">
                                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                                                    <CheckIcon className="w-5 h-5 text-gray-900" aria-hidden="true" />
                                                    </span>
                                                </span>
                                                <span className="ml-4 min-w-0">
                                                    <span className="text-sm leading-4 text-gray-500 text-gray-300">{step.name}</span>
                                                </span>
                                                </a>
                                            </>
                                            ) : step.status === 'current' ? (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-700" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="relative flex items-start group" aria-current="step">
                                                <span className="h-9 flex items-center" aria-hidden="true">
                                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-gray-700 border-2 border-indigo-600 rounded-full">
                                                    <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                                                    </span>
                                                </span>
                                                <span className="ml-4 min-w-0">
                                                    <span className="text-sm leading-4 text-indigo-600">{step.name}</span>
                                                </span>
                                                </a>
                                            </>
                                            ) : (
                                            <>
                                                {stepIdx !== steps.length - 1 ? (
                                                <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                                                ) : null}
                                                <a href={step.href} className="relative flex items-start group">
                                                <span className="h-9 flex items-center" aria-hidden="true">
                                                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-gray-700 border-2 border-gray-700 rounded-full group-hover:border-gray-400">
                                                    <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                                                    </span>
                                                </span>
                                                <span className="ml-4 min-w-0">
                                                    <span className="text-sm leading-4 text-gray-500 text-gray-300">{step.name}</span>
                                                    
                                                </span>
                                                </a>
                                            </>
                                            )}
                                        </li>
                                        ))}
                                    </ol>
                            
                                </div>
                                <div className="ml-8 mr-16 md:border-l md:border-gray-200 md:border-gray-800"></div>
                                <div className="w-full">
                                    <div className="h-full flex flex-col justify-between w-full relative">
                                        {step == 1 &&
                                        <ExchangeSignUp setCurrentExchange={handleStep1}/>
                                        }
                                        {step == 2 && 
                                            <ConnectExchangeForm next={next} currentExchange={currentExchange}/>
                                        }
                                        {step == 3 &&
                                        <ConnectStrategyForm next={next}/>
                                        }
                                        {step == 4 &&
                                        <Review />
                                        }
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
                
            </main>
        </div>
    </div>
    </>
}

export default connect()(UserStoryMain);