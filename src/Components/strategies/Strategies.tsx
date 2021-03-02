import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStrategies } from '../../actions/common';

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
      if (props.strategies.length < 1){
        props.getStrategies()
        }
      }, []);
    
    const listItems = props.strategies.map((strategy) =>
        <li key={strategy.strategy_id}><Link to={`/strategy/${strategy.strategy_id}`}>{strategy.name}</Link></li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  const mapStateToProps = (state) => ({
    strategies: state.common.strategies,
  });
  
  export default connect(mapStateToProps, { getStrategies })(Strategies);