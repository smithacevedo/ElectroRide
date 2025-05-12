import { useEffect, useReducer, useState } from 'react'
import NavBarComponet from './components/NavBarComponent'
import './index.css'
import { db } from './db/db'
import CardComponent from './components/CardComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import { cartReducer, initialState } from './reducers/Cart-reducer'

function App() {

  const [data] = useState(db);
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('cart',  JSON.stringify(state.cart))
  }, [state.cart])

  return (
  <>
   <div className="scroll-smooth">
    <NavBarComponet
    cart = {state.cart}
    dispatch = {dispatch}
    />

    {/*para que devuelva al inicio*/}
    <div id="inicio" className="pt-24"></div>
    <HeaderComponent/>

    {/*para que devuelva a los productos*/}
    <div id="productos" className="pt-24"></div>
    <main className='container-xl mt-5'>
      <h2 className='text-center text-2xl font-bold'>Nuestra colección</h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-50 py-10'>
        {data.map ((product) => {
          return (
            <CardComponent
              key={product.id}
              product={product}
              dispatch={dispatch}
            />
          )
        })}
      </div>
    </main>
    <FooterComponent/>
    </div>
  </>
  )
}

export default App
