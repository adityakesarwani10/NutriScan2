import { type NextRequest, NextResponse } from "next/server"

// This is a mock database of products
// In a real application, you would connect to an actual database
const mockProductDatabase: Record<string, any> = {
  "5901234123457": {
    name: "Organic Granola",
    brand: "Nature's Best",
    nutrition: {
      calories: 120,
      protein: 3,
      fat: 6,
      carbs: 15,
      sugar: 8,
      fiber: 2,
    },
    ingredients: "Rolled oats, honey, almonds, coconut oil, dried cranberries",
    allergens: ["nuts"],
  },
  "8901234567890": {
    name: "Greek Yogurt",
    brand: "Dairy Delight",
    nutrition: {
      calories: 150,
      protein: 15,
      fat: 4,
      carbs: 6,
      sugar: 6,
      fiber: 0,
    },
    ingredients: "Milk, live active cultures",
    allergens: ["milk"],
  },
}

export async function POST(request: NextRequest) {
  try {
    const { barcode } = await request.json()

    if (!barcode) {
      return NextResponse.json({ error: "No barcode provided" }, { status: 400 })
    }

    // In a real application, you would query your database or an external API
    // For this example, we'll use our mock database
    const productInfo = mockProductDatabase[barcode] || null

    if (productInfo) {
      return NextResponse.json({ productInfo })
    } else {
      // If product not found in our database, we could query an external API here
      // For now, we'll just return a not found response
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching product info:", error)
    return NextResponse.json({ error: "Failed to fetch product information" }, { status: 500 })
  }
}
