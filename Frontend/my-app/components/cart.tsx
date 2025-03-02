    import { Button } from "@/components/ui/button"
    import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
    import { Minus, Plus, Trash2 } from "lucide-react"
    import Image from "next/image"
    import type { CartItem } from "./dog-product-catalog"

    interface CartProps {
    cart: CartItem[]
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    }

    export default function Cart({ cart, removeFromCart, updateQuantity }: CartProps) {
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

    if (cart.length === 0) {
        return (
        <Card className="w-80 sm:w-96 border-amber-200 shadow-lg">
            <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative h-24 w-24 opacity-70">
                <Image src="/placeholder.svg?height=96&width=96" alt="Empty cart" fill className="object-contain" />
                </div>
                <p className="text-center text-gray-500">Your cart is empty</p>
                <p className="text-center text-sm text-gray-400">Add some pawsome products for your furry friend!</p>
            </div>
            </CardContent>
        </Card>
        )
    }

    return (
        <Card className="w-80 sm:w-96 border-amber-200 shadow-lg">
        <CardHeader className="pb-3 border-b">
            <CardTitle className="text-amber-800">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-auto py-4">
            <div className="space-y-4">
            {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 pb-4 border-b border-amber-100">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-amber-100">
                    <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-amber-900 line-clamp-1">{item.product.name}</h4>
                    <p className="text-sm text-amber-700 font-semibold">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label="Remove from cart"
                    >
                    <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center border rounded-md">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none text-amber-700"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none text-amber-700"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t pt-4">
            <div className="flex items-center justify-between w-full">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span className="font-bold text-amber-900">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700">Proceed to Checkout</Button>
        </CardFooter>
        </Card>
    )
    }

