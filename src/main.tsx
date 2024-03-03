import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer } from "react-toastify"

import App from "./App.tsx"

import { persistor, store } from "./redux/index.ts"
import "modern-normalize/modern-normalize.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
