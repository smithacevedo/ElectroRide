import { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import NavBarComponet from "../components/NavBarComponent"
import { Producto } from "../types/type"
import { db } from "../db/db"
import { cartReducer, initialState } from "../reducers/Cart-reducer"

export default function ProductComponent() {
  const { id } = useParams()
  const [product, setProduct] = useState<Producto | undefined>()

  // Estado y dispatch para carrito
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const foundProduct = db.find(p => p.id === Number(id))
    setProduct(foundProduct)
  }, [id])

  if (!product) {
    return (
    <>
        <NavBarComponet cart={state.cart} dispatch={dispatch} />
    </>
    )
  }

  return (
    <>
      <NavBarComponet cart={state.cart} dispatch={dispatch} />
      <main className="mx-auto mt-50 px-6 max-w-4xl bg-white rounded-lg shadow-lg p-50">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">{product.name}</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={`/imgProductos/${product.image}.png`}
            alt={product.name}
            className="rounded-lg shadow-md max-w-xs mx-auto md:mx-0"
          />
          <div className="flex flex-col flex-grow">
            <p className="text-lg text-gray-700 mb-4">{product.details}</p>
            <p className="text-2xl font-bold text-black mb-6">{product.color}</p>
            <p className="text-2xl font-bold text-green-600 mb-6">${product.price}</p>
            

            <button
              onClick={() => dispatch({ type: "add-to-cart", payload: { item: product } })}
              className="hover:cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
