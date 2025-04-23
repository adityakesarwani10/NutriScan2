import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scan, Search, Lightbulb, ShieldCheck, Utensils, BarChart, Smartphone, Users } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Discover how NutriScan can help you make healthier food choices
          </p>
        </div>

        <Tabs defaultValue="individuals" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individuals">For Individuals</TabsTrigger>
            <TabsTrigger value="businesses">For Businesses</TabsTrigger>
          </TabsList>

          <TabsContent value="individuals" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {individualServices.map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(service.title)}`}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <service.icon className="h-5 w-5 text-primary" />
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={service.link}>
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="businesses" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {businessServices.map((service, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(service.title)}`}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <service.icon className="h-5 w-5 text-primary" />
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href={service.link}>
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="my-12 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="opacity-90">Sign up today and start your journey to healthier eating.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button variant="secondary" size="lg">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-primary/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary/20"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const individualServices = [
  {
    title: "Barcode Scanner",
    description: "Scan product barcodes to get instant nutrition information and ingredient details.",
    icon: Scan,
    link: "/scanner",
  },
  {
    title: "Product Search",
    description: "Search our extensive database for nutrition information on thousands of food products.",
    icon: Search,
    link: "/search",
  },
  {
    title: "Personalized Recommendations",
    description: "Get food recommendations based on your dietary preferences and nutritional goals.",
    icon: Lightbulb,
    link: "/recommendations",
  },
  {
    title: "Allergen Alerts",
    description: "Set up alerts for ingredients you want to avoid due to allergies or dietary restrictions.",
    icon: ShieldCheck,
    link: "/allergens",
  },
]

const businessServices = [
  {
    title: "Restaurant Menu Analysis",
    description: "Get detailed nutrition analysis for your restaurant menu items.",
    icon: Utensils,
    link: "/business/restaurants",
  },
  {
    title: "Food Product Analytics",
    description: "Comprehensive analytics on consumer preferences and nutrition trends.",
    icon: BarChart,
    link: "/business/analytics",
  },
  {
    title: "API Integration",
    description: "Integrate NutriScan's powerful nutrition database into your own applications.",
    icon: Smartphone,
    link: "/business/api",
  },
  {
    title: "Corporate Wellness Programs",
    description: "Promote healthy eating habits among your employees with our corporate solutions.",
    icon: Users,
    link: "/business/wellness",
  },
]

const steps = [
  {
    title: "Scan or Search",
    description: "Use our barcode scanner or search for products in our database.",
    icon: Scan,
  },
  {
    title: "Get Information",
    description: "View detailed nutrition information, ingredients, and allergens.",
    icon: Search,
  },
  {
    title: "Make Better Choices",
    description: "Use the information to make healthier food choices for you and your family.",
    icon: Lightbulb,
  },
]
