import { useEffect, useState, useReducer } from "react"
import { useParams, useNavigate } from "react-router-dom" // <-- importa useNavigate
import NavBarComponet from "../components/NavBarComponent"
import { Producto } from "../types/type"
import { db } from "../db/db"
import { cartReducer, initialState } from "../reducers/Cart-reducer"

export default function ProductComponent() {
  const { id } = useParams()
  const navigate = useNavigate() 
  const [product, setProduct] = useState<Producto | undefined>()

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const foundProduct = db.find(p => p.id === Number(id))
    setProduct(foundProduct)
  }, [id])

  if (!product) {
    return (
      <>
        <NavBarComponet cart={state.cart} dispatch={dispatch} />
        <div className="text-center mt-20 text-xl font-semibold text-gray-500">
          Producto no encontrado.
        </div>
      </>
    )
  }

  return (
    <>
      <NavBarComponet cart={state.cart} dispatch={dispatch} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 text-2xl px-4 rounded mb-6"
        >
          Volver atrás
        </button>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            {product.name}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={`/imgProductos/${product.image}.png`}
              alt={product.name}
              className="w-full max-w-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            />

            <div className="flex flex-col gap-5 w-full">
              <p className="text-lg text-gray-700">{product.details}</p>
              <p className="text-xl font-medium text-gray-600">Color: {product.color}</p>
              <p className="text-3xl font-bold text-green-600">${product.price}</p>

              <button
                onClick={() => dispatch({ type: "add-to-cart", payload: { item: product } })}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
