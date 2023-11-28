import React from 'react';
import Routes from './src/navigations/routes';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store} style={{flex:1}}>
      <Routes/>
    </Provider>
  );
};

export default App;
