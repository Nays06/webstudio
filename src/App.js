import './App.scss';
import CookieConsent from './components/cookieConsent/CookieConsent.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/Footer.jsx';
import MainCont from './page/main.jsx'

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <MainCont />
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}

export default App;
