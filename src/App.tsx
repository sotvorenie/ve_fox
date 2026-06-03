import {useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { useShallow } from 'zustand/react/shallow';

import MainPage from "./pages/MainPage.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import ChannelPage from "./pages/ChannelPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import LikedPage from "./pages/LikedPage.tsx";
import WatchLaterPage from "./pages/WatchLaterPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";

import {useAuthStore} from "./store/useAuthStore.ts";

function App() {
    const {checkMe} = useAuthStore(useShallow((state) => ({ ...state })))

    useEffect(() => {
        checkMe().catch(() => {})
    }, []);

  return (
      <main className="main">
        <Routes>
            <Route path="/auth" element={<AuthPage/>} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/channel/:id" element={<ChannelPage/>}/>
                <Route path="/history" element={<HistoryPage/>}/>
                <Route path="/liked" element={<LikedPage/>}/>
                <Route path="/watch_later" element={<WatchLaterPage/>}/>
            </Route>
          <Route path="/video/:id" element={<VideoPage />}/>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
  )
}

export default App;
