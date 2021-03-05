import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import ConnectExchange from "../strategies/ConnectExchange";
import Strategies from "../strategies/Strategies";

const steps = [
  { id: "connectExchange" },
  { id: "strategies" }
];

const Main = (images: any) => {
    const [formData, setForm] = useForm(0);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const props = { navigation };

    switch (id) {
    case "connectExchange":
        return <ConnectExchange navigation={navigation} />;
    case "strategies":
        return <Strategies navigation={navigation} />;
    default:
        return null;
}
};

export default Main;