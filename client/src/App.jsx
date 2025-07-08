import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from './layouts/MainLayout/MainLayout'
import { Home } from "./pages/Home/Home";
import { Case } from "./pages/Case/Case";
import './App.module.scss'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/case/:id" element={<Case />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
