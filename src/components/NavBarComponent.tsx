import { useEffect } from "react"


export default function NavBarComponet(){

    

    useEffect(() => {
        function handleScroll() {
            if(window.scrollY > 700){
                console.log('Aqui empiezan los Productos')
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-300 shadow-2xl">
                <ul className="flex items-center flex-col md:flex-row md:justify-evenly p-5 ">
                    <li><a href=""><img className="h-15 hover:font-bold" src="/img/imagen-navbar.png" alt="imagen navbar"/></a></li>
                    <li id="inicio" className="md:flex md:items-center h-12 hover:font-bold"><a className="hover:underline" href="">Inicio</a></li>    
                    <li className="md:flex md:items-center h-12 hover:font-bold"><a id="productos" className="hover:underline" href="">Productos</a></li>    
                    <input id="search" className="border rounded-2xl p-2 text-center hover:font-bold" type="text" placeholder=" Buscar Producto"/>
                    <li><a href=""><img className="h-15 " src="/img/cart.svg" alt="imagen navbar"/></a></li>
                </ul>
            </nav>
        </>
    )
}