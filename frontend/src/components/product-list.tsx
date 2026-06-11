import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
export default function ProductList() {
    const testList = [
        {
            "id": 1,
            "name": "Apple",
            "description": "Ripe red American apples, crisp, sweet, and juicy.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 0,
            "price": 20000
        },
        {
            "id": 2,
            "name": "Banana",
            "description": "Naturally ripened South American bananas, rich in potassium.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 25,
            "price": 15000
        },
        {
            "id": 3,
            "name": "Orange Juice",
            "description": "100% pure orange juice, freshly squeezed daily.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 0,
            "price": 35000
        },
        {
            "id": 4,
            "name": "Strawberry",
            "description": "Da Lat strawberries (500g box) with a perfect sweet and tangy flavor.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 8,
            "price": 85000
        },
        {
            "id": 5,
            "name": "Chocolate Cupcake",
            "description": "Rich chocolate cupcake topped with a smooth, velvety layer of frosting.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 12,
            "price": 28000
        },
        {
            "id": 6,
            "name": "Croissant",
            "description": "Flaky, multi-layered crescent rolls infused with rich French butter aroma.",
            "product_img": "/b29f9d91f13008218b979041fc4bce6f.jpg",
            "quantity": 20,
            "price": 22000
        }
    ];
    function checkQuantity(quantity: number) {
        if (quantity > 0)
            return <p className="text-green-400 font-bold">In Stock</p>
        else
            return <p className="text-red-500 font-bold">Out of Stock</p>
    }
    return (
        <div className="container mt-4">
            <h1 className="text-center text-3xl font-bold m-8">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-8 mr-8 gap-8">
                {testList.map((product) => (
                    <Card key={product.id} className="flex flex-col overflow-hidden h-full">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">{product.name}</CardTitle>
                        </CardHeader>
                        <div className="w-full h-48 bg-slate-100 overflow-hidden relative">
                            <img src={product.product_img} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                        <CardContent>
                            <p>{product.description}</p>
                        </CardContent>
                        <CardFooter className="flex place-content-between">
                            {checkQuantity(product.quantity)}
                            <p>{product.price}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}