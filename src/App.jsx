import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Play from './pages/play'
import Leaderboard from './pages/leaderboard'
import NotFound from './pages/notfound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
