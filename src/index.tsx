import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import ReduxToastr from 'react-redux-toastr'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='bottom-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
    </Provider>
  </React.StrictMode>,
)
