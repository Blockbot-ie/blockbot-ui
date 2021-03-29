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
            if (props.error.msg.name) props.alert.error(`Name: ${props.error.msg.name.join()}`);
            if (props.error.msg.email) props.alert.error(`Email: ${props.error.msg.email.join()}`);
            if (props.error.msg.message) props.alert.error(`Message: ${props.error.msg.message.join()}`);
            if (props.error.msg.non_field_errors) props.alert.error(props.error.msg.non_field_errors.join());
            if (props.error.msg.username) props.alert.error(props.error.msg.username.join());
          
      
            if (props.error.status == 400) props.alert.error(props.error.msg.Error)
            if (props.message.deleteLead) props.alert.success(props.message.deleteLead);
            if (props.message.connectExchange) props.alert.success(props.message.connectExchange);
            if (props.message.passwordNotMatch) props.alert.error(props.message.passwordNotMatch);
            if (props.message.belowMinAmount) props.alert.error(props.message.belowMinAmount);
            if (props.message.reportSubmitted) props.alert.success(props.message.reportSubmitted);
              
    },[props] )
  
    return <Fragment />;
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));