import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm, useStep } from "react-hooks-helper";
import { connect } from "react-redux";
import ConnectExchange from "../strategies/ConnectExchange";
import Strategies from "../strategies/Strategies";
import { getExchanges, getConnectedExchanges, getConnectedStrategies, getStrategies, getStrategyPairs } from '../../actions/common';

const steps = [
  { id: "connectExchange" },
  { id: "strategies" }
];

type TabSate = {
    tab: HTMLHtmlElement
}

const Main = (props: any) => {
    const [formData, setForm] = useForm(0);
    const { step, navigation } = useStep({ initialStep: 0, steps });

    const [tabState, setTabState] = useState({
        tab: <div></div>
    })

    useEffect(() => {

        if (props.exchanges.length < 1){
            props.getExchanges()
        }
        if (props.strategies.length < 1) {
            props.getStrategies()
        }
        if (props.connectedExchanges.length < 1){
            props.getConnectedExchanges();
        }
        if (props.strategyPairs.length < 1) {
            props.getStrategyPairs()
        }
        if (props.connectedStrategies.length < 1) {
            props.getConnectedStrategies()
        }
        console.log(props)
    }, []);
    const change = (val: any) =>  {
        if (val == "1") {
            setTabState({
                ...tabState,
                tab: <ConnectExchange navigation={navigation} />
            })
        }
        if (val == "2"){
            setTabState({
                ...tabState,
                tab: <Strategies navigation={navigation} />
            })
        }
    }

    return <>
    <Container>
        <Row>
            <Col>
            <ul>
                <li ><button onClick={() => change("1")}>Connected Exchange</button></li>
                <li ><button onClick={() => change("2")}>My Strategies</button></li>
            </ul>
            </Col>
            <Col>
                {tabState.tab}
            </Col>
        </Row>
    </Container>
    </>
};

const mapStateToProps = (state) => ({
    exchanges: state.common.exchanges,
    strategies: state.common.strategies,
    connectedExchanges: state.common.connectedExchanges,
    connectedStrategies: state.common.connectedStrategies,
    strategyPairs: state.common.strategyPairs
  });

export default connect(mapStateToProps, { getExchanges, getStrategies, getStrategyPairs, getConnectedExchanges, getConnectedStrategies })(Main);