import { Provider } from 'react-redux';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import store from './store';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // In advance versions  of browsers instead of our provided message a default message from browsers
    // will be displayed as alert saying 'Changes that you made may not be saved.'
    // if (process.env.REACT_APP_ENV !== 'development') {
    //   window.onbeforeunload = showAlert;
    // }
  }, []);

  // const showAlert = () => 'Are you sure you want to leave?';

  return (
    <Provider store={store}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </Provider>
  );
}
