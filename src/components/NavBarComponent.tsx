import { useState } from "react"

export default function NavBarComponet(){

    /*para añadir el menu hamburguesa en dispositivos pequeños*/
    const[menuOpen, setMenuOpen] = useState(false);

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
                    <li><a href="#cart"><img className="h-15 " src="/img/cart.svg" alt="imagen navbar"/></a></li>
                </ul>
            </nav>
        </>
    )
}