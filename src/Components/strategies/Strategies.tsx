import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';

type Strategy = {
    strategy_id: String,
    name: String
}

type Strategies = {
    strategies: Strategy[]
}

const Strategies = (props: any) => {

    const [strategyState, setStrategyState] = useState<Strategies>({
        strategies: []
    });

    useEffect(() => {
        if (props.authUserState.logged_in) {
          axios.get('http://localhost:8000/bb/strategies/', {
            headers: {
              Authorization: `JWT ${localStorage.getItem('token')}`
            }
          })
            .then(res => {
              const strategies = res.data;
              setStrategyState({
                  ...strategyState,
                  strategies: strategies
              })
            })
        }
      }, [props.authUserState.logged_in])
    
    const listItems = strategyState.strategies.map((strategy) =>
        <li><Link to={`/strategy/${strategy.strategy_id}`}>{strategy.name}</Link></li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  export default Strategies;