import {useEffect, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import MainPage from "@pages/MainPage";
import VideoPage from "@pages/VideoPage";
import MainLayout from "@/layouts/MainLayout";
import SearchPage from "@pages/SearchPage";
import ChannelPage from "@pages/ChannelPage";
import HistoryPage from "@pages/HistoryPage";
import LikedPage from "@pages/LikedPage";
import WatchLaterPage from "@pages/WatchLaterPage";
import AuthPage from "@pages/AuthPage";

import {useUserStore} from "@store/useUserStore";

function App() {
    const {checkMe} = useUserStore()

    const [isLoading, setIsLoading] = useState(true)

    const checkUser = async () => {
        try {
            setIsLoading(true)
            await checkMe()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkUser().then()
    }, [])

    if (isLoading) {
        return <></>
    }

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
