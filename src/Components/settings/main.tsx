import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm, useStep } from "react-hooks-helper";
import ConnectExchange from "../strategies/ConnectExchange";
import Strategies from "../strategies/Strategies";

const steps = [
  { id: "connectExchange" },
  { id: "strategies" }
];

type TabSate = {
    tab: HTMLHtmlElement
}

const Main = (images: any) => {
    const [formData, setForm] = useForm(0);
    const { step, navigation } = useStep({ initialStep: 0, steps });

    const [tabState, setTabState] = useState({
        tab: <div></div>
    })

    const props = { navigation };
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

export default Main;