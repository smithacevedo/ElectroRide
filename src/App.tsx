import { useEffect, useReducer, useRef, useState } from 'react'
import NavBarComponet from './components/NavBarComponent'
import './index.css'
import { db } from './db/db'
import CardComponent from './components/CardComponent'
import HeaderComponent from './components/HeaderComponent'
import { cartReducer, initialState } from './reducers/Cart-reducer'



function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const [products, setProducts] = useState([...db])
  const loader = useRef(null)

  const idCounter = useRef(db.length)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  const loadMore = () => {
    console.log("Cargando más productos...")

    const moreProducts = db.map(p => {
      idCounter.current += 1
      return {
        ...p,
        id: idCounter.current 
      }
    })

    setProducts(prev => [...prev, ...moreProducts])
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    }, {
      root: null,
      rootMargin: '200px',
      threshold: 0.25
    })

    const currentLoader = loader.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [])

  return (
    <>
      <div className="scroll-smooth">
        <NavBarComponet cart={state.cart} dispatch={dispatch} />

        <div id="inicio" className="pt-24"></div>
        <HeaderComponent />

        <div id="productos" className="pt-24"></div>
        <main className="container-xl mt-5">
          <h2 className="text-center text-2xl font-bold">Nuestra colección</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {products.map(product => (
              <CardComponent
                key={product.id}
                product={product}
                dispatch={dispatch}
              />
            ))}
          </div>
          <div
            ref={loader}
            className="h-40 text-center text-gray-500 bg-gray-100 flex items-center justify-center"
          >
            Cargando más productos...
          </div>
        </main>
      </div>
    </>
  )
}

export default App
