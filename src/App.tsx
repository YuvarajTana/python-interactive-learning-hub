import { AppProvider } from './hooks/useAppContext';
import { Header } from './components/layout/Header';
import { MainInterface } from './components/layout/MainInterface';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <MainInterface />
      </div>
    </AppProvider>
  );
}

export default App;
