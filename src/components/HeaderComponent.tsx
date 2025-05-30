import { useEffect, useState } from "react"

export default function HeaderComponent(){


    const images = [
    "/img/header.png",
    "/img/header2.png",
    "/img/header3.png"
    ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); 
    }, []);useEffect(() => {
    
    },
    [])

    return (

        <>
        <div className="relative">
        <img className="header md:h-200 w-full" src={images[currentIndex]} alt="Header"/>
            <div className="absolute top-2/3 left-1/4 -translate-y-1/2 rounded-xl flex items-center justify-start text-white text-base font-medium">
                <p className="text-2xl lg:text-5xl hover:font-bold">Electro Ride.<br/> POWERUP ECOLOGIC MOVEMENT!</p>
            </div>
        </div>
        </>
    )
}


