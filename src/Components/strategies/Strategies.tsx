import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStrategies } from '../../actions/strategies';

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
      console.log(props)
      props.getStrategies();
      console.log(props)
    })
    
    const listItems = strategyState.strategies.map((strategy) =>
        <li><Link to={`/strategy/${strategy.strategy_id}`}>{strategy.name}</Link></li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }

  const mapStateToProps = (state) => (
    console.log(state));
  
  export default connect(mapStateToProps, { getStrategies })(Strategies);