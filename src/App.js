import { useState ,useEffect} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import axios from "axios";
import { useMode, ColorModeContext } from "./theme";
import TopBar from "./components/layouts/Topbar";

import Author from "./pages/Author";
import Article from "./pages/Article";
import ArticleDetail from "./pages/articleDetail";

function App() {
  const dispatch = useDispatch();

  const [theme, colorMode] = useMode();




  useEffect(() => {


  }, [dispatch]);


  return (
    <>

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <TopBar  />
            <Routes>
            <Route path="/" element={<Article/>} />

              <Route path="/authors" element={<Author/>} />
              <Route path="/:id" element ={<ArticleDetail/>}/>

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
     <ToastContainer
     position="top-right"
     autoClose={2000}
     hideProgressBar
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
   />
   </>

  );
}

export default App;