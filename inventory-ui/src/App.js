import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Experimental_CssVarsProvider} from "@mui/material";
import {createContext} from "react";

const InventoryContext = createContext(null);
const inv = [];

function App() {
    return (
        <InventoryContext.Provider value={inv}>
            <Experimental_CssVarsProvider>
                <BrowserRouter>
                    <Header/>
                    <Content/>
                    <Footer/>
                </BrowserRouter>
            </Experimental_CssVarsProvider>
        </InventoryContext.Provider>
    );
}

export default App;
export {
    InventoryContext
}
