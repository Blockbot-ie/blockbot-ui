import React, { Component, Fragment, useEffect, useRef } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

const Alerts = (props: any) => {  
    useEffect(() => {
            
      if (props.error.status == 400) {
        Object.keys(props.error.msg).forEach(err => {
          props.alert.error(props.error.msg[err][0])
        })
      }
      // if (props.error.status == 400) props.alert.error(props.error.msg.Error)
      if (props.message.connectExchange) props.alert.success(props.message.connectExchange);
      if (props.message.passwordNotMatch) props.alert.error(props.message.passwordNotMatch);
      if (props.message.belowMinAmount) props.alert.error(props.message.belowMinAmount);
      if (props.message.reportSubmitted) props.alert.success(props.message.reportSubmitted);
      if (props.message.strategyToppedUp) props.alert.success(props.message.strategyToppedUp);
      if (props.message.emailSent) props.alert.success(props.message.emailSent);
              
    },[props] )
  
    return <Fragment />;
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));