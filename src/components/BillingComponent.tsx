import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormData {
  name: string
  apellido: string
  direccion: string
  correo: string
}

interface CardData {
  cardNumber: string
  expiryDate: string
  cvv: string
}

interface BillingFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

interface CardFormProps {
  cardData: CardData
  setCardData: React.Dispatch<React.SetStateAction<CardData>>
  onSubmit: () => void
}

function BillingForm({ formData, setFormData }: BillingFormProps) {
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.'
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio.'
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria.'
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio.'
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Dirección y método de pago</h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center w-full">
          {(['name', 'apellido', 'direccion', 'correo'] as const).map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-gray-700 font-bold mb-2 capitalize">
                {field === 'correo' ? 'Correo electrónico' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'correo' ? 'email' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>
      </form>

      <div className="mt-6 text-center">
        <h2>Datos Usuario:</h2>
        <p>Nombre: {formData.name}</p>
        <p>Apellido: {formData.apellido}</p>
        <p>Dirección: {formData.direccion}</p>
        <p>Correo: {formData.correo}</p>
      </div>
    </div>
  )
}

function CardForm({ cardData, setCardData, onSubmit }: CardFormProps) {
  const [errors, setErrors] = useState<Partial<CardData>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors: Partial<CardData> = {}

    if (!/^\d{16}$/.test(cardData.cardNumber)) {
      newErrors.cardNumber = 'El número debe tener exactamente 16 dígitos numéricos.'
    }

    if (!cardData.expiryDate) {
      newErrors.expiryDate = 'La fecha de expiración es obligatoria.'
    }

    if (!/^\d{3}$/.test(cardData.cvv)) {
      newErrors.cvv = 'El CVV debe tener exactamente 3 dígitos.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center">Datos de Tarjeta</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 text-center w-full">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">Número de tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength={16}
              value={cardData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="1234567812345678"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label htmlFor="expiryDate" className="block text-gray-700 font-bold mb-2">Fecha de expiración</label>
            <input
              type="month"
              id="expiryDate"
              name="expiryDate"
              value={cardData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>

          <div>
            <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              maxLength={3}
              value={cardData.cvv}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="123"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div className='pt-5 flex justify-center'>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Finalizar compra
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <h2>Datos Método de pago:</h2>
        <p>Número: {cardData.cardNumber}</p>
        <p>Expira: {cardData.expiryDate}</p>
        <p>CVV: {cardData.cvv ? '***' : ''}</p>
      </div>
    </div>
  )
}

export default function BillingContainer() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    apellido: '',
    direccion: '',
    correo: ''
  })

  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const navigate = useNavigate()

  const handleFinalSubmit = () => {
    alert("Compra finalizada exitosamente.")
    navigate("/")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
      <div className="flex-1 border p-6 rounded shadow-md bg-white">
        <BillingForm formData={formData} setFormData={setFormData} />
      </div>
      <div className="flex-1 border p-6 rounded shadow-md bg-white">
        <CardForm cardData={cardData} setCardData={setCardData} onSubmit={handleFinalSubmit} />
      </div>
    </div>
  )
}
