    import Image from "next/image"
    import { Button } from "@/components/ui/button"
    import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
    import { ShoppingCart, Check, Star } from "lucide-react"
    import { Badge } from "@/components/ui/badge"
    import type { Product } from "./dog-product-catalog"

    interface ProductCardProps {
    product: Product
    addToCart: (product: Product) => void
    isInCart: boolean
    }

    export default function ProductCard({ product, addToCart, isInCart }: ProductCardProps) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg border-amber-100 group">
        <CardHeader className="p-0 relative">
            <div className="relative h-60 w-full overflow-hidden">
            <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.bestSeller && (
                <Badge className="absolute top-2 left-2 bg-amber-600 hover:bg-amber-700">Best Seller</Badge>
            )}
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-amber-900 line-clamp-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <p className="font-bold text-amber-800 text-lg">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <Button
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => addToCart(product)}
            variant={isInCart ? "secondary" : "default"}
            >
            {isInCart ? (
                <>
                <Check className="mr-2 h-4 w-4" /> Added to Cart
                </>
            ) : (
                <>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
            )}
            </Button>
        </CardFooter>
        </Card>
    )
    }

