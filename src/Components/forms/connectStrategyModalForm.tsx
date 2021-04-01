import { connect } from "react-redux"
import ConnectStrategyForm from "./connectStrategyForm";

const ConnectStrategyModalForm = (props: any) => {
    return <>
    {props.isOpen &&
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <ConnectStrategyForm isModal={true} handleClose={props.handleClose}/>
      </div>
    </div>
    }
</>
}

const mapStateToProps = (state) => ({
  });

export default connect(mapStateToProps)(ConnectStrategyModalForm);