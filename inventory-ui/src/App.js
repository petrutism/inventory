import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Experimental_CssVarsProvider} from "@mui/material";

function App() {
    return (

            <Experimental_CssVarsProvider>
                <BrowserRouter>
                    <Header/>
                    <Content/>
                    <Footer/>
                </BrowserRouter>
            </Experimental_CssVarsProvider>

    );
}

export default App;

