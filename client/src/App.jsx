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
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const telegramId = useUserStore((state) => state.userData?.telegram_id);

  useEffect(() => {
    updateTonRate(); 
    const interval = setInterval(updateTonRate, 60000);
    return () => clearInterval(interval);
  }, [updateTonRate]);

  useEffect(() => {
    if (!isAuthorized || !telegramId) return undefined;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}/ws`);

    socket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'user.updated' && message.user) {
          useUserStore.getState().setUser(message.user);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket user update:', error);
      }
    });

    socket.addEventListener('error', (error) => {
      console.error('User WebSocket error:', error);
    });

    return () => socket.close();
  }, [isAuthorized, telegramId]);

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
