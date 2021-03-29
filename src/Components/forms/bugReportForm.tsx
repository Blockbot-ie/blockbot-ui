import { useState } from "react"
import { connect } from "react-redux"
import { submitBugReport } from '../../actions/common';


const BugReportForm = (props: any) => {

    const [bugReportForm, setBugReportForm] = useState({
        type: 'Bug',
        area: '',
        issue: ''
    })

    const handleChange = (event: any) => {
        setBugReportForm({
            ...bugReportForm,
            issue: event.target.value
        })
    }

    const handleSubmit = (e: any) => {
        console.log('Hello')
        e.preventDefault()
        props.submitBugReport({ bugReportForm })
    }

    const showState = () => {
        console.log(bugReportForm)
    }

    return <>
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
            Background overlay, show/hide based on modal state.

            Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
            Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* <!--
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
                <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Report Issue
                </h3>
                <div className="mt-2">
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                        onChange={(e: any): void => {
                            const trimmed = e.target.value.trim()
                            setBugReportForm({ ...bugReportForm, type: trimmed })}
                            }
                            id="type" name="type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option selected>Bug</option>
                            <option>Feature Suggestion</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                        <div className="mt-1">
                            <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                const trimmed = e.target.value.trim()
                                setBugReportForm({ ...bugReportForm, area: trimmed })}
                            }
                             type="text" name="area" id="area" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Specify area" aria-describedby="area-description" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500" id="email-description">Specify area i.e Orders, Account Stats</p>
                    </div>
                    <div>
                        <textarea
                        value={bugReportForm.issue}
                        onChange={handleChange}
                        cols={50}
                        rows={10}/>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                        Submit
                        </button>
                    </div>
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
        </div>
    </div>
    </>
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { submitBugReport }) (BugReportForm)