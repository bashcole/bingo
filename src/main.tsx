import React from "react";
import ReactDOM from "react-dom/client";
import {AnimatePresence} from "framer-motion";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'

import App from "./App";
import theme from "./lib/theme";
import store from './store'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <AnimatePresence
                        mode="wait"
                        initial={true}
                        onExitComplete={() => {
                            if (typeof window !== "undefined") {
                                window.scrollTo({top: 0});
                            }
                        }}
                    >
                        <App/>
                    </AnimatePresence>
                </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
