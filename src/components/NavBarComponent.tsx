import { ActionDispatch, useMemo, useState } from "react"
import { CartItem } from "../types/type";
import { CartActions } from "../reducers/Cart-reducer";
import { useNavigate } from "react-router-dom";


type HeaderProps = {
    cart: CartItem[];
    dispatch: ActionDispatch<[CartActions]>
}

export default function NavBarComponet({cart, dispatch}: HeaderProps) {


    const navigate = useNavigate();  

    const handleFinalizePurchase = () => {
        navigate('/finalizar-compra');
    }


    /*para añadir el menu hamburguesa en dispositivos pequeños*/
    const[menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]); // Total de productos


    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-300 shadow-2xl">
                {/*para añadir el boton del menu hamburguesa cambiando su estado a true*/}
                    <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>


                <ul className={`flex items-center flex-col md:flex-row md:justify-evenly p-5 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
                    <li><a href="#inicio"><img className="h-15 hover:font-bold" src="/img/imagen-navbar.png" alt="imagen navbar"/></a></li>
                    <li className="md:flex md:items-center h-12 hover:font-bold"><a className="hover:underline" href="#inicio">Inicio</a></li>    
                    <li className="md:flex md:items-center h-12 hover:font-bold"><a id="#productos" className="hover:underline" href="#productos">Productos</a></li>    
                    <input className="border rounded-2xl p-2 text-center hover:font-bold" type="text" placeholder=" Buscar Producto"/>
                    <li>
                        {/* Ícono del carrito con contador */}
                        <div className="relative">
                            <button onClick={() => setCartOpen(!cartOpen)} className="relative">
                                <img className="h-8 w-8 hover:cursor-pointer" src="/img/cart.svg" alt="imagen carrito" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Cuadro desplegable del carrito */}
                            {cartOpen && (
                                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-120 p-4 z-50">
                                    <h2 className="text-lg font-bold mb-4">Carrito</h2>
                                    {isEmpty ? (
                                        <p className="text-center">El carrito está vacío</p>
                                    ) : (
                                        <>
                                            <table className="w-full table-auto">
                                                <thead>
                                                    <tr>
                                                        <th className="px-3 py-2 text-center">Imagen</th>
                                                        <th className="px-3 py-2 text-center">Nombre</th>
                                                        <th className="px-3 py-2 text-center">Precio</th>
                                                        <th className="px-3 py-2 text-center">Cantidad</th>
                                                        <th className="px-3 py-2 text-center">Quitar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((item) => (
                                                        <tr key={item.id} className="text-center">
                                                            <td>
                                                                <img
                                                                    className="h-12 w-12 mx-auto"
                                                                    src={`/imgProductos/${item.image}.png`}
                                                                    alt={item.name}
                                                                />
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td>${item.price}</td>
                                                            <td className="flex items-center justify-center gap-2">
                                                                <button
                                                                    className="px-2 py-1 bg-gray-200 rounded hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        dispatch({ type: "decrease-quantity", payload: { id: item.id } })
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                                {item.quantity} uds
                                                                <button
                                                                    className="px-2 py-1 bg-gray-200 rounded hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        dispatch({ type: "increase-quantity", payload: { id: item.id } })
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() =>
                                                                        dispatch({ type: "remove-from-cart", payload: { id: item.id } })
                                                                    }
                                                                >
                                                                    <img
                                                                        className="h-6 w-6 mx-auto hover:cursor-pointer"
                                                                        src="/img/basura.png"
                                                                        alt="Eliminar"
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <p className="text-right mt-2">
                                                Total: <span className="font-bold">${cartTotal}</span>
                                            </p>
                                            <div className="flex flex-col items-center lg:flex-row gap-2 ">
                                            <button
                                                className="w-full bg-black text-white py-2 my-3 rounded cursor-pointer"onClick={() => dispatch({ type: "clear-cart" })}>Vaciar Carrito</button>
                                            <button className="w-full bg-black text-white py-2 my-3 rounded cursor-pointer" onClick={handleFinalizePurchase}>Finalizar compra</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}