import {useEffect, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { listen } from '@tauri-apps/api/event';
import { getCurrentWindow } from '@tauri-apps/api/window';

import {showConfirm} from "@utils/modals.ts";

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

    useEffect(() => {
        let unListen: () => void

        const initListener = async () => {
            unListen = await listen('request-close', async () => {
                const check = await showConfirm(
                    'Выход из приложения',
                    'Вы действительно хотите выйти?'
                )
                if (check) await getCurrentWindow().destroy()
            })
        }

        initListener().then()

        return () => {
            if (unListen) unListen()
        }
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
