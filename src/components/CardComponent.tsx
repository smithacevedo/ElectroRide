import { ActionDispatch } from "react";
import { Producto } from "../types/type"
import { CartActions } from "../reducers/Cart-reducer";

type Props = {
    product: Producto;
    dispatch: ActionDispatch<[action: CartActions]>;
};


export default function CardComponent({product, dispatch}: Props) {
    return (
        <>
        <div className="scroll-smooth md:scroll-auto w-full h-full bg-white flex flex-col justify-between border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-center">
        <a href="#">
        <img className="rounded-t-lg" src={`/imgProductos/${product.image}.png`} alt="imagen producto" />
        </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.details}</p>
        <div className="flex flex-row justify-around">
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Ver producto
        </a>
        <button onClick={() => dispatch({type: 'add-to-cart', payload: {item: product}})} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
            <img src="/img/cart2.png" alt="Agregar al carrito" className="w-7 h-7 mr-2" />
            Agregar al carrito
        </button>
        </div>
    </div>
</div>
        </>
    )
}