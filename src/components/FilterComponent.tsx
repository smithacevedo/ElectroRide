type Props = {
  setFilterColor: (color: string) => void;
  setPriceRange: (range: [number, number]) => void;
};

const FilterComponent = ({ setFilterColor, setPriceRange }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
      <div>
        <label className="mr-2">Color:</label>
        <select onChange={e => setFilterColor(e.target.value)} className="border p-2 rounded">
          <option value="all">Todos</option>
          <option value="Blanca">Blanca</option>
          <option value="Negro">Negro</option>
          <option value="Gris">Gris</option>
          <option value="Rojo">Rojo</option>
          <option value="Verde">Verde</option>
          <option value="Azul">Azul</option>
        </select>
      </div>
      <div>
        <label className="mr-2">Rango de precio:</label>
        <select onChange={e => {
          const value = e.target.value
          if (value === "0-499") setPriceRange([0, 499])
          else if (value === "500-699") setPriceRange([500, 699])
          else if (value === "700+") setPriceRange([700, 9999])
          else setPriceRange([0, 9999])
        }} className="border p-2 rounded">
          <option value="all">Todos</option>
          <option value="0-499">$0 - $499</option>
          <option value="500-699">$500 - $699</option>
          <option value="700+">$700 - Más</option>
        </select>
      </div>
    </div>
  )
};

export default FilterComponent
