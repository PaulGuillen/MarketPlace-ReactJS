export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    discount: string;
    imageUrl: string;
    category: string;
    stock: string;
    discountAvailable: boolean;
    priceWithDiscount: string;
    bestSelling: boolean;
    isViral: boolean;
}