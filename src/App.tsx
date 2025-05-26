import  { useReducer } from 'react'
import { Routes, Route } from "react-router-dom"
import BillingComponent from "./components/BillingComponent"
import NavBarComponet from "./components/NavBarComponent"
import HomeComponent from "./components/HomeComponent"
import { cartReducer, initialState } from "./reducers/Cart-reducer"

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <>
      <NavBarComponet cart={state.cart} dispatch={dispatch} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/finalizar-compra" element={<BillingComponent />} />
      </Routes>
    </>
  )
}

export default App
