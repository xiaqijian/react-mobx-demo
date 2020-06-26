import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import { Provider } from 'mobx-react'
import store from './mobx'

ReactDOM.render(
   <Provider store={store}>
     <App/>
   </Provider>,
  document.getElementById('root'))