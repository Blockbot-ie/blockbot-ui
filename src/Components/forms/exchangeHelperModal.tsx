import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { connect } from "react-redux"
import ModalVideo from 'react-modal-video'

const ExchangeHelperModal = (props: any) => {

  const [isOpen, setOpen] = useState(false)

    return <>
    <Transition.Root show={props.open}>
      <Dialog as="div" static className="fixed inset-0 overflow-y-auto" open={props.open} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
        
            <div className="inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Connect with {props.exchange}
                  </h3>
                  <div className="mt-2">
                    <h5 className="text-gray-500"><b>1. </b> Generate API Keys</h5>
                  </div>
                </div>
              </div>
              <button className="bg-indigo-900" onClick={()=> setOpen(true)}>VIEW DEMO</button>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
            
          
        </div>
      </Dialog>
      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="m0yEj0NsdZY" onClose={() => setOpen(false)} />
    </Transition.Root>
 
    
</>
}

const mapStateToProps = (state) => ({
  });

export default connect(mapStateToProps)(ExchangeHelperModal);