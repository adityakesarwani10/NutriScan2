import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About NutriScan</h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Your AI-powered assistant for smarter and healthier food choices
          </p>
        </div>

        <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden my-8">
          <Image src="/About.jpg" alt="NutriScan Team" fill className="object-cover" />
        </div>

        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p>
            NutriScan was developed during a thrilling two-day software and hardware development hackathon, where
            participants create innovative applications inspired by given themes within a defined time frame. What
            started as a hackathon project has evolved into a comprehensive nutrition assistant that helps people make
            informed food choices.
          </p>
          <p>
            Our team of passionate developers, nutritionists, and designers came together with a shared vision: to make
            nutrition information accessible and understandable for everyone. We believe that with the right
            information, people can make better choices about what they eat and improve their overall health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                Our Mission
              </h3>
              <p>
                To empower individuals to make healthier food choices by providing instant, accurate, and personalized
                nutrition information through innovative technology.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Our Vision
              </h3>
              <p>
                To create a world where everyone has access to the nutrition information they need to lead healthier
                lives, regardless of their background or knowledge level.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p>
            NutriScan uses advanced AI technology to analyze food products and provide detailed nutrition information.
            Whether you're scanning a barcode, taking a photo of a food item, or searching our database, NutriScan gives
            you the information you need to make informed decisions.
          </p>
          <ul className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={`/placeholder.svg?height=128&width=128&text=${encodeURIComponent(member.name)}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  "Instant barcode scanning for quick nutrition information",
  "Detailed breakdown of macronutrients and micronutrients",
  "Allergen alerts for common food allergies",
  "Personalized recommendations based on dietary preferences",
  "Comprehensive food database with thousands of products",
  "AI-powered image recognition for food identification",
]

const team = [
  { name: "Alex Johnson", role: "Founder & CEO" },
  { name: "Sarah Chen", role: "Lead Developer" },
  { name: "Michael Rodriguez", role: "Nutrition Specialist" },
  { name: "Priya Patel", role: "UI/UX Designer" },
]
