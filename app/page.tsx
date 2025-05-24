import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Scan, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
        <section
  className="relative w-full py-8 md:py-24 pl-20 lg:py-32 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bg.png')" }}
>
  {/* Gradient overlay from transparent top to white bottom */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)",
    }}
  ></div>

  {/* Content sits above the gradient */}
  <div className="container px-4 md:px-6 relative z-10">
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Welcome to <span className="text-primary">NutriScan</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Your AI-powered assistant for smarter and healthier food choices.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/scanner">
            <Button size="lg" className="gap-1">
              <Scan className="h-4 w-4" />
              Scan Product
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      {/* Image section removed to prevent layout shift */}
      <div className="hidden lg:block" />
    </div>
  </div>
</section>



      {/* Feature Highlight */}
      <section className="w-full py-12 pl-20 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              <Scan className="mr-1 inline-block h-4 w-4" />
              Instant Nutrition Details
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Scan any food product to get instant nutrition details
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Simply scan the barcode or take a photo of your food to get comprehensive nutrition information.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-background">
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 pl-20 md:py-24" id="about">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Us</h2>
            <div className="w-[80px] h-1 bg-primary rounded-full"></div>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              NutriScan was developed during a thrilling two-day software and hardware development hackathon, where
              participants create innovative applications inspired by given themes within a defined time frame.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                <Image src="/Mission.jpg" alt="NutriScan Team" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground">
                We're on a mission to help people make healthier food choices by providing instant access to nutrition
                information. Our AI-powered technology makes it easy to understand what's in your food, so you can make
                informed decisions about what you eat.
              </p>
              <Link href="/about">
                <Button variant="outline" className="gap-1">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center pl-20 justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to make healthier food choices?</h2>
            <p className="max-w-[700px] md:text-xl">
              Join NutriScan today and start your journey towards a healthier lifestyle.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/scanner">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary/20"
                >
                  Try Scanner
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Scan,
    title: "Instant Scanning",
    description: "Quickly scan barcodes or take photos of food products to get nutrition information in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Allergen Alerts",
    description: "Get immediate alerts for allergens and ingredients you want to avoid in your diet.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "Receive personalized food recommendations based on your dietary preferences and goals.",
  },
]
