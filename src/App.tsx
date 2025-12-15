import {Routes, Route} from "react-router-dom";

import MainPage from "./pages/MainPage.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import ChannelPage from "./pages/ChannelPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import LikedPage from "./pages/LikedPage.tsx";
import WatchLaterPage from "./pages/WatchLaterPage.tsx";

function App() {



  return (
      <main className="main">
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/channel" element={<ChannelPage/>}/>
                <Route path="/history" element={<HistoryPage/>}/>
                <Route path="/liked" element={<LikedPage/>}/>
                <Route path="/watch_later" element={<WatchLaterPage/>}/>
            </Route>
          <Route path="/video" element={<VideoPage/>}/>
        </Routes>
      </main>
  );
}

export default App;
