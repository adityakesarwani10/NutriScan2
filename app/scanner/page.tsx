"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, Upload, Scan, X, ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function ScannerPage() {
  const [activeTab, setActiveTab] = useState<string>("camera")
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [scanProgress, setScanProgress] = useState<number>(0)
  const [barcode, setBarcode] = useState<string | null>(null)
  const [productInfo, setProductInfo] = useState<any>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Start camera stream
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraStream(stream)
        setIsCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  // Stop camera stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
      setIsCameraActive(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL("image/png")
        setCapturedImage(imageDataUrl)

        // Process the captured image for barcode
        processImageForBarcode(imageDataUrl)
      }
    }
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string
        setUploadedImage(imageDataUrl)

        // Process the uploaded image for barcode
        processImageForBarcode(imageDataUrl)
      }

      reader.readAsDataURL(file)
    }
  }

  // Process image for barcode extraction
  const processImageForBarcode = async (imageDataUrl: string) => {
    setIsProcessing(true)
    setBarcode(null)
    setProductInfo(null)
    setScanProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return newProgress
        })
      }, 200)

      // Here you would integrate with a barcode scanning library
      // For demonstration, we'll simulate a barcode detection with a timeout
      setTimeout(() => {
        clearInterval(progressInterval)
        setScanProgress(100)

        // This is where you would call your actual barcode detection API
        /*
        const response = await fetch('/api/scan-barcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageDataUrl }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setBarcode(data.barcode);
          fetchProductInfo(data.barcode);
        }
        */

        // For demo purposes, generate a random barcode
        const mockBarcode = Math.floor(Math.random() * 10000000000000)
          .toString()
          .padStart(13, "0")
        setBarcode(mockBarcode)

        // Fetch mock product info
        fetchProductInfo(mockBarcode)
      }, 2000)
    } catch (error) {
      console.error("Error processing barcode:", error)
      setIsProcessing(false)
      setScanProgress(0)
      toast({
        title: "Processing Error",
        description: "Could not extract barcode from image.",
        variant: "destructive",
      })
    }
  }

  // Fetch product information based on barcode
  const fetchProductInfo = async (barcode: string) => {
    try {
      // Here you would fetch product info from your API
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockProducts = [
          {
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
            healthScore: 85,
          },
          {
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
            healthScore: 90,
          },
          {
            name: "Chocolate Chip Cookies",
            brand: "Sweet Treats",
            nutrition: {
              calories: 180,
              protein: 2,
              fat: 9,
              carbs: 24,
              sugar: 15,
              fiber: 1,
            },
            ingredients: "Wheat flour, sugar, butter, chocolate chips, eggs, vanilla extract",
            allergens: ["wheat", "milk", "eggs"],
            healthScore: 40,
          },
        ]

        const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)]
        setProductInfo(randomProduct)
        setIsProcessing(false)

        toast({
          title: "Product Found",
          description: `Found information for ${randomProduct.name}`,
        })
      }, 1000)
    } catch (error) {
      console.error("Error fetching product info:", error)
      setIsProcessing(false)
      toast({
        title: "Error",
        description: "Could not fetch product information.",
        variant: "destructive",
      })
    }
  }

  // Reset captured image
  const resetCapturedImage = () => {
    setCapturedImage(null)
    setBarcode(null)
    setProductInfo(null)
  }

  // Reset uploaded image
  const resetUploadedImage = () => {
    setUploadedImage(null)
    setBarcode(null)
    setProductInfo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  // Start camera when tab changes to camera
  useEffect(() => {
    if (activeTab === "camera" && !isCameraActive) {
      startCamera()
    } else if (activeTab !== "camera" && isCameraActive) {
      stopCamera()
    }
  }, [activeTab, isCameraActive])

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <a href="/">
            <ArrowLeft className="h-5 w-5" />
          </a>
        </Button>
        <h1 className="text-2xl font-bold">Product Scanner</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Scan Food Products</CardTitle>
          <CardDescription>
            Scan barcodes or take photos of food products to get detailed nutrition information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="camera" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="camera">
                <Camera className="mr-2 h-4 w-4" />
                Camera
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              {!capturedImage ? (
                <div className="relative">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center">
                    <div className="w-3/4 h-1/4 border-2 border-primary rounded-md"></div>
                  </div>
                  <Button
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    onClick={captureImage}
                    disabled={!isCameraActive}
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Capture
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <img
                      src={capturedImage || "/placeholder.svg"}
                      alt="Captured"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={resetCapturedImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              {!uploadedImage ? (
                <div
                  className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-primary/70" />
                  <h3 className="mt-2 text-lg font-medium">Upload an image</h3>
                  <p className="text-sm text-muted-foreground">Click to browse or drag and drop</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={resetUploadedImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Scanning product...</span>
                <span className="text-sm">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          )}

          {barcode && !productInfo && !isProcessing && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-medium">Detected Barcode:</h3>
              <p className="text-lg font-mono">{barcode}</p>
              <p className="text-sm text-muted-foreground mt-2">Searching for product information...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {productInfo && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{productInfo.name}</CardTitle>
                <CardDescription>{productInfo.brand}</CardDescription>
              </div>
              <Badge
                variant={
                  productInfo.healthScore >= 70 ? "default" : productInfo.healthScore >= 40 ? "outline" : "destructive"
                }
              >
                Health Score: {productInfo.healthScore}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                Nutrition Facts
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(productInfo.nutrition).map(([key, value]: [string, any]) => (
                  <div key={key} className="bg-muted p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    <div className="text-lg font-semibold">
                      {value}
                      {key === "calories" ? "" : "g"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <p className="text-muted-foreground">{productInfo.ingredients}</p>
            </div>

            {productInfo.allergens.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {productInfo.allergens.map((allergen: string) => (
                    <Badge key={allergen} variant="outline" className="capitalize">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!productInfo && !isProcessing && (capturedImage || uploadedImage) && (
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center flex-col text-center space-y-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <p className="text-sm text-muted-foreground mt-2">Scan a product to see detailed nutrition information</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
