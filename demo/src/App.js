import logo from "./logo.svg";
import "./App.css";
import useRerenderInterval from "use-rerender-interval";
import { useRef } from "react";

function Forever() {
    const count = useRerenderInterval(1000);
    return <p>This will rerender every second, forever. [{count}]</p>;
}

function TenSeconds() {
    const limit = useRef(Date.now() + 10 * 1000);
    const count = useRerenderInterval(1000, Date.now() <= limit.current);

    return <p>This will rerender every second, for 10 seconds. [{count}]</p>;
}

function TenSecondsAlternative() {
    const count = useRerenderInterval(1000, (count) => count < 10);

    return (
        <p>
            This will rerender every second, for 10 seconds, but this was made
            with a predicate function. [{count}]
        </p>
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Forever />
                <TenSeconds />
                <TenSecondsAlternative />
            </header>
        </div>
    );
}

export default App;
