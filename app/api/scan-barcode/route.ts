import { type NextRequest, NextResponse } from "next/server"
import jsQR from "jsqr"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert base64 image to ImageData for jsQR
    const barcodeResult = await extractBarcodeFromImage(image)

    if (barcodeResult) {
      return NextResponse.json({ barcode: barcodeResult })
    } else {
      return NextResponse.json({ error: "No barcode found in the image" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error processing barcode:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

// Function to extract barcode from image
async function extractBarcodeFromImage(imageDataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        resolve(null)
        return
      }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Use jsQR to detect QR codes
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        resolve(code.data)
      } else {
        // If no QR code found, you could add other barcode detection libraries here
        // For now, we'll return null
        resolve(null)
      }
    }

    img.onerror = () => {
      resolve(null)
    }

    img.src = imageDataUrl
  })
}
