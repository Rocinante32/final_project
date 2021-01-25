import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
import { reducer } from "./reducer";
import App from "./app";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);



let elem;
init(store);
elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
