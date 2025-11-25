import {Routes, Route} from "react-router-dom";

import MainPage from "./pages/MainPage.tsx";
import VideoPage from "./pages/VideoPage.tsx";

function App() {



  return (
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/" element={<VideoPage/>}/>
        </Routes>
      </main>
  );
}

export default App;
