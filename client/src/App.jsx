import { BrowserRouter, Routes, Route } from "react-router";
import { FilterProvider } from "./context/FilterContext";
import MainLayout from './layouts/MainLayout/MainLayout'
import { Home } from "./pages/Home/Home";
import { Case } from "./pages/Case/Case";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
           path='/'
           element={
            <FilterProvider>
              <Home />
            </FilterProvider>
           } 
          />
          <Route path="/case/:id" element={<Case />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
