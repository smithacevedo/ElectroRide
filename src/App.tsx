import { useState } from 'react'
import BodyComponent from './components/BodyComponent'
import NavBarComponet from './components/NavBarComponent'
import './index.css'
import { db } from './db/db'
import CartComponent from './components/CartComponent'
import FooterComponent from './components/FooterComponent'

function App() {

  const [data] = useState(db);

  return (
  <>
    <NavBarComponet/>
    <BodyComponent/>

    <main className='container-xl mt-5'>
      <h2 className='text-center text-2xl font-bold'>Nuestra colección</h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-50 py-10'>
        {data.map ((product) => {
          return (
            <CartComponent
              key={product.id}
              product={product}
            />
          )
        })}
      </div>
    </main>
    <FooterComponent/>
  </>
  )
}

export default App
