import { ActionDispatch } from "react"
import { Producto } from "../types/type"
import { CartActions } from "../reducers/Cart-reducer"
import { useNavigate } from "react-router-dom"

type Props = {
    product: Producto;
    dispatch: ActionDispatch<[action: CartActions]>;
}

export default function CardComponent({ product, dispatch }: Props) {
    const navigate = useNavigate()

    const handleViewProduct = () => {
        navigate(`/producto/${product.id}`)
    }

    return (
        <div className="scroll-smooth md:scroll-auto w-full h-full bg-white flex flex-col justify-between border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
            <img className="rounded-t-lg" src={`/imgProductos/${product.image}.png`} alt="imagen producto" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.details}</p>
                <div className="flex flex-col gap-2">
                <p className="mb-3  dark:text-gray-400 text-[22px] text-green-400 font-bold"><span className="text-black">Precio:</span> $ {product.price}</p>

                <div className="flex flex-row justify-center items-center gap-2 mb-3">
                    <div
                        className="w-6 h-6 rounded-full border border-gray-400"
                        style={{
                        backgroundColor: product.color.toLowerCase() === 'blanca' ? 'white' :
                                        product.color.toLowerCase() === 'gris' ? 'gray' :
                                        product.color.toLowerCase() === 'negro' ? 'black' :
                                        product.color.toLowerCase() === 'rojo' ? 'red' :
                                        product.color.toLowerCase() === 'verde' ? 'green' :
                                        product.color.toLowerCase() === 'azul' ? 'blue' :
                                        product.color.toLowerCase(), 
                        }}
                        title={product.color}
                    ></div>
                    </div>
                </div>
                <div className="flex flex-row justify-around">
                    <button
                        onClick={handleViewProduct}
                        className="hover:cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Ver producto
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'add-to-cart', payload: { item: product } })}
                        className="hover:cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                    >
                        <img src="/img/cart2.png" alt="Agregar al carrito" className="w-7 h-7 mr-2" />
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}
