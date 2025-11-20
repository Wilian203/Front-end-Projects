export type Productos = {
    id:number,
    image: string,
    title:string,
    description:string,
    price:number
};

export type cartProducts = Productos & {
    quantity: 1
}