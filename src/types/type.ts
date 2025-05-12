export type Producto = {
    id: number;
    name: string;
    image: string;
    details: string;
    price: number;
    color:string
}

export interface CartItem extends Producto {
    quantity: number;
}