
import React from "react";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<AuthRoutes Component={HomeScreens} />} />
          <Route path="/request" exact element={<AuthRoutes Component={RequestVideosScreens} />} />
          <Route path="/feedback" exact element={<AuthRoutes Component={FeedBackScreens} />} />
          <Route path="/favorites" exact element={<AuthRoutes Component={FavoriteScreens} />} />
          <Route path="/profile" exact element={<AuthRoutes Component={ProfileScreens} />} />
          {/* ---- admin routes ------ */}
          <Route path="/videos" exact element={<AuthRoutes Component={Videos} />} />
          <Route path="/upload" exact element={<AuthRoutes Component={Upload} />} />
          <Route path="/login" exact element={<AuthScreens />} />

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
