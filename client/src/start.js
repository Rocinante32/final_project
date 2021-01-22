import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { init } from "./socket";
// import { reducer } from "./reducer"; /// not created yet

import App from "./app";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

let elem;
// init(store);
elem = (
    <Provider>
        <App />
    </Provider>
);

////store={store} add back to provide for store to work

ReactDOM.render(<App />, document.querySelector("main"));
