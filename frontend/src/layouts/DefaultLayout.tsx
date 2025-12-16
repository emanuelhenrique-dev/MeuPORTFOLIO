//rrd imports
import { Outlet } from 'react-router-dom';

//Components imports
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { AppContainer } from './DefaultLayout.styles';

export function DefaultLayout() {
  return (
    <AppContainer>
      <Header />
      <Outlet />
      <Footer />
    </AppContainer>
  );
}
