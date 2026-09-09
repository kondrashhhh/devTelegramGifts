import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useGetCurrency } from "./stores/useCurrencyStore";
import { useUserStore } from "./stores/useUserStore";
import { FilterProvider } from "./context/FilterContext";
import MainLayout from './layouts/MainLayout/MainLayout'
import { Home } from "./pages/Home/Home";
import { Case } from "./pages/Case/Case";
import { Profile } from "./pages/Profile/Profile";


const loadTgsPlayer = async () => {
  if (typeof window !== 'undefined') {
    const { default: LottiePlayer } = await import('@lottiefiles/lottie-player');
    if (!customElements.get('tgs-player')) {
      LottiePlayer.defineElement();
    }
  }
};

function App() {
    const { updateTonRate } = useGetCurrency();

  useEffect(() => {
    updateTonRate(); 
    const interval = setInterval(updateTonRate, 60000);
    return () => clearInterval(interval);
  }, [updateTonRate]);


  useEffect(() => {
    loadTgsPlayer();
  }, []);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element=
           {
            <FilterProvider>
              <Home />
            </FilterProvider>
           } 
          />
          <Route path='/profile' element=
           {
            <Profile />
           } 
          />
          <Route path="/cases/:category/:translit_name" element={<Case />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
