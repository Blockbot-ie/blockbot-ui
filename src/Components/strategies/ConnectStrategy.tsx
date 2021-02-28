import axios from 'axios';
import React, { useEffect } from 'react';
import { useState, createRef } from "react";
import { Link } from 'react-router-dom';
import { ListItem } from 'semantic-ui-react';

const ConnectStrategy = (props: any) => {
    const strategy_id = props.match.params.id
    console.log(strategy_id)
    return <>
    <h1>{strategy_id}</h1>
    </>
}

export default ConnectStrategy;