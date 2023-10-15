
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import AuthScreens from "./screens/authScreens";
import AuthRoutes from "./services/AuthRoutes";
import HomeScreens from "./screens/homeScreens";
import RequestVideosScreens from "./screens/requestVideosScreens";
import FeedBackScreens from "./screens/feedBackScreens";
import FavoriteScreens from "./screens/favoriteScreens";
import ProfileScreens from "./screens/profileScreens";
import Videos from "./screens/admin/videos/Videos";
import Upload from "./screens/admin/upload/Upload";
import VideoScreen from "./screens/VideoScreen";
import QuizScreen from "./screens/QuizScreen";
import Requests from "./screens/admin/requests/Requests";
import { Close } from "@mui/icons-material";
import { appContext } from "./services/appContext";

function App() {
  const [globalMessage, setGlobalMessage] = useState("");
  const [openGlobalMessage, setOpenGlobalMessage] = useState(false)

  useEffect( () => {
    if(openGlobalMessage){
      setTimeout(() => {
        setOpenGlobalMessage(false)
      }, [6000])
    }
  }, [openGlobalMessage])
  return (
    <appContext.Provider value={{ setGlobalMessage, setOpenGlobalMessage }}>
      <div className="App">
        <div className={`global-message ${openGlobalMessage ? "active" : "in-active"}`}>{globalMessage} <Close onClick={() => setOpenGlobalMessage(false)} /></div>
        <div className="inside-wrap">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" exact element={<AuthRoutes Component={HomeScreens} />} />
              <Route path="/request" exact element={<AuthRoutes Component={RequestVideosScreens} />} />
              <Route path="/profile" exact element={<AuthRoutes Component={ProfileScreens} />} />
              <Route path="/feedback" exact element={<AuthRoutes Component={FeedBackScreens} />} />
              <Route path="/favorites" exact element={<AuthRoutes Component={FavoriteScreens} />} />
              <Route path="/profile" exact element={<AuthRoutes Component={ProfileScreens} />} />
              <Route path="/video/:videoID" exact element={<AuthRoutes Component={VideoScreen} />} />
              <Route path="/quiz/:videoID" exact element={<AuthRoutes Component={QuizScreen} />} />

              {/* ---- admin routes ------ */}
              <Route path="/videos" exact element={<AuthRoutes Component={Videos} />} />
              <Route path="/upload" exact element={<AuthRoutes Component={Upload} />} />
              <Route path="/requests" exact element={<AuthRoutes Component={Requests} />} />
              <Route path="/login" exact element={<AuthScreens />} />

              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </appContext.Provider>
  );
}

export default App;
