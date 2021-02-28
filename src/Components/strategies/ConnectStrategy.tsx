import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import Select from 'react-select';

type Exchange = {
    exchange_id: String,
    display_name: String
}

type Exchanges = {
    exchanges: Exchange[]
}

const ConnectStrategy = (props: any) => {
    
    const [exchangeState, seteExchangeState] = useState<Exchanges>({
        exchanges: []
    });
    useEffect(() => {
        if (props.logged_in) {
          axios.get('http://localhost:8000/bb/exchanges/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => {
              const exchanges = res.data;
              seteExchangeState({
                  ...exchangeState,
                  exchanges: exchanges
              })
            })
        }
      }, [props.logged_in])
    
    const exchangeList = exchangeState.exchanges.map((exchange, i) => 
        <option key={i} value={exchange.exchange_id.toString()}>{exchange.display_name}</option>
    )
    return (
    <div>
        <select>
            {exchangeList}
        </select>
    </div>
    )
}

export default ConnectStrategy;