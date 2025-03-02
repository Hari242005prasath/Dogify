"use client";

    import { useState } from "react";
    import { ShoppingCart, X } from "lucide-react";
    import ProductCard from "./product-card";
    import Cart from "./cart";
    import { Button } from "@/components/ui/button";
    import { Badge } from "@/components/ui/badge";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import Image from "next/image";

    // Product type definition
    export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: "food" | "toys" | "beds" | "accessories";
    rating: number;
    bestSeller?: boolean;
    };

    // Cart item type definition
    export type CartItem = {
    product: Product;
    quantity: number;
    };

    // Sample product data for dogs only
    const products: Product[] = [
    // Dog Food
    {
        id: "1",
        name: "Premium Grain-Free Kibble",
        description:
        "High-protein, grain-free formula for adult dogs with real meat as the first ingredient",
        price: 54.99,
        image: "/images/image.png",
        category: "food",
        rating: 4.8,
        bestSeller: true,
        
    },
    {
        id: "2",
        name: "Puppy Growth Formula",
        description:
        "Specially formulated for growing puppies with DHA for brain development",
        price: 48.99,
        image: "/images/grp.jpg",
        category: "food",
        rating: 4.7,
    },
    {
        id: "3",
        name: "Senior Dog Soft Chews",
        description:
        "Easy to chew formula with glucosamine and chondroitin for joint health",
        price: 42.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "food",
        rating: 4.6,
    },
    {
        id: "4",
        name: "Organic Wet Food Variety Pack",
        description:
        "Human-grade ingredients in convenient pouches with three delicious flavors",
        price: 36.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "food",
        rating: 4.9,
        bestSeller: true,
    },

    // Dog Toys
    {
        id: "5",
        name: "Indestructible Chew Toy",
        description:
        "Durable rubber toy designed for aggressive chewers with treat-dispensing feature",
        price: 18.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "toys",
        rating: 4.5,
    },
    {
        id: "6",
        name: "Interactive Puzzle Feeder",
        description:
        "Mental stimulation toy that slows down eating and prevents boredom",
        price: 24.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "toys",
        rating: 4.7,
        bestSeller: true,
    },
    {
        id: "7",
        name: "Plush Squeaky Toy Set",
        description:
        "Set of 3 adorable plush toys with built-in squeakers for hours of fun",
        price: 15.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "toys",
        rating: 4.3,
    },
    {
        id: "8",
        name: "Fetch & Retrieve Ball Launcher",
        description:
        "Automatic ball launcher with adjustable distance settings for indoor/outdoor play",
        price: 39.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "toys",
        rating: 4.6,
    },

    // Dog Beds
    {
        id: "9",
        name: "Orthopedic Memory Foam Bed",
        description:
        "Therapeutic bed with 7-inch memory foam for joint relief and better sleep",
        price: 89.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "beds",
        rating: 4.9,
        bestSeller: true,
    },
    {
        id: "10",
        name: "Cozy Cave Hooded Bed",
        description:
        "Self-warming bed with hood for dogs who love to burrow and stay cozy",
        price: 64.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "beds",
        rating: 4.8,
    },
    {
        id: "11",
        name: "Cooling Gel Mat",
        description:
        "Pressure-activated cooling gel mat ideal for hot weather and overheating dogs",
        price: 45.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "beds",
        rating: 4.5,
    },
    {
        id: "12",
        name: "Elevated Outdoor Cot",
        description:
        "Breathable mesh bed that keeps dogs cool and comfortable outdoors",
        price: 38.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "beds",
        rating: 4.4,
    },

    // Dog Accessories
    {
        id: "13",
        name: "Adjustable Reflective Harness",
        description:
        "No-pull harness with reflective strips for safe nighttime walks",
        price: 32.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "accessories",
        rating: 4.7,
        bestSeller: true,
    },
    {
        id: "14",
        name: "Personalized ID Tag Set",
        description:
        "Custom engraved stainless steel ID tags with silencer and split ring",
        price: 12.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "accessories",
        rating: 4.8,
    },
    {
        id: "15",
        name: "Automatic Water Fountain",
        description:
        "Filtered water fountain that encourages hydration with 70oz capacity",
        price: 49.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "accessories",
        rating: 4.6,
    },
    {
        id: "16",
        name: "Grooming Kit with Clippers",
        description:
        "Professional-grade grooming set with quiet clippers and attachment combs",
        price: 78.99,
        image: "/placeholder.svg?height=300&width=300",
        category: "accessories",
        rating: 4.5,
    },
    ];

    export default function DogProductCatalog() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Calculate total items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Add product to cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find(
            (item) => item.product.id === product.id
        );

        if (existingItem) {
            // If item already exists, increase quantity
            return prevCart.map((item) =>
            item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            // Otherwise add new item
            return [...prevCart, { product, quantity: 1 }];
        }
        });
    };

    // Remove product from cart
    const removeFromCart = (productId: string) => {
        setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== productId)
        );
    };

    // Update quantity of product in cart
    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
        removeFromCart(productId);
        return;
        }

        setCart((prevCart) =>
        prevCart.map((item) =>
            item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
                <Image
                src="/placeholder.svg?height=48&width=48"
                alt="Pawsome logo"
                width={48}
                height={48}
                className="object-contain"
                />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Pawsome Dog Shop
            </h1>
            </div>

            <div className="relative">
            <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="rounded-full h-12 w-12 border-amber-300 hover:bg-amber-100 hover:text-amber-800"
                aria-label="Shopping cart"
            >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-amber-600">
                    {totalItems}
                </Badge>
                )}
            </Button>
            {isCartOpen && (
                <div className="absolute right-0 mt-2 z-10">
                <div className="relative">
                    <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCartOpen(false)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 z-20"
                    aria-label="Close cart"
                    >
                    <X className="h-3 w-3" />
                    </Button>
                    <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    />
                </div>
                </div>
            )}
            </div>
        </header>

        <div className="relative overflow-hidden rounded-xl bg-amber-100 p-6 mb-10">
            <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
                Everything Your Dog Needs
                </h2>
                <p className="text-amber-800">
                Premium quality products for your furry best friend. From
                nutritious food to cozy beds and fun toys.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Shop Now
                </Button>
            </div>
            <div className="relative h-64 md:h-80">
                <Image
                src="/placeholder.svg?height=320&width=400"
                alt="Happy dog with toys"
                fill
                className="object-contain"
                />
            </div>
            </div>
        </div>

        <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-amber-50 border border-amber-200 p-1">
            <TabsTrigger
                value="all"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
                All Products
            </TabsTrigger>
            <TabsTrigger
                value="food"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
                Dog Food
            </TabsTrigger>
            <TabsTrigger
                value="toys"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
                Dog Toys
            </TabsTrigger>
            <TabsTrigger
                value="beds"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
                Dog Beds
            </TabsTrigger>
            <TabsTrigger
                value="accessories"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
                Accessories
            </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    isInCart={cart.some((item) => item.product.id === product.id)}
                />
                ))}
            </div>
            </TabsContent>

            {["food", "toys", "beds", "accessories"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                    .filter((product) => product.category === category)
                    .map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                        isInCart={cart.some(
                        (item) => item.product.id === product.id
                        )}
                    />
                    ))}
                </div>
            </TabsContent>
            ))}
        </Tabs>
        </div>
    );
    }
