"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SearchIcon, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchFoodItems } from "@/lib/api"

type FoodItem = {
  food: {
    foodId: string
    label: string
    nutrients: {
      ENERC_KCAL: number
      PROCNT: number
      FAT: number
      CHOCDF: number
      FIBTG?: number
    }
    category: string
    categoryLabel: string
    image?: string
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await searchFoodItems(query)
      setSearchResults(data.hints || [])
      setHasSearched(true)
    } catch (error) {
      console.error("Search error:", error)
      setError("An error occurred while searching. Please try again.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // For demo purposes, show some results on initial load
  useEffect(() => {
    const popularSearches = ["apple", "banana", "chicken", "rice", "yogurt"]
    const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)]

    setQuery(randomSearch)
    handleSearch({ preventDefault: () => {} } as React.FormEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Food Search</h1>
          <p className="text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Search our database for nutrition information on thousands of food items
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Search for Food</CardTitle>
            <CardDescription>Enter a food item, brand name, or ingredient to get nutrition information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for food (e.g., apple, chicken breast, pasta)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2 pt-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4 text-destructive">{error}</CardContent>
          </Card>
        )}

        {!isLoading && hasSearched && searchResults.length === 0 && !error && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No results found for "{query}". Try another search term.</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Results for "{query}"</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="generic">Generic</TabsTrigger>
                <TabsTrigger value="branded">Branded</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {searchResults.map((item, index) => (
                  <FoodItemCard key={index} item={item} />
                ))}
              </TabsContent>

              <TabsContent value="generic" className="space-y-4">
                {searchResults
                  .filter((item) => item.food.categoryLabel === "food")
                  .map((item, index) => (
                    <FoodItemCard key={index} item={item} />
                  ))}
              </TabsContent>

              <TabsContent value="branded" className="space-y-4">
                {searchResults
                  .filter((item) => item.food.categoryLabel === "Branded food products")
                  .map((item, index) => (
                    <FoodItemCard key={index} item={item} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

function FoodItemCard({ item }: { item: FoodItem }) {
  const { food } = item
  const nutrients = food.nutrients

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            {food.image ? (
              <img
                src={food.image || "/placeholder.svg"}
                alt={food.label}
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <SearchIcon className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{food.label}</h3>
            <p className="text-sm text-muted-foreground">{food.categoryLabel}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {nutrients.ENERC_KCAL?.toFixed(0) || "N/A"} kcal
              </Badge>
              <Badge variant="outline" className="text-xs">
                Protein: {nutrients.PROCNT?.toFixed(1) || "N/A"}g
              </Badge>
              <Badge variant="outline" className="text-xs">
                Fat: {nutrients.FAT?.toFixed(1) || "N/A"}g
              </Badge>
              <Badge variant="outline" className="text-xs">
                Carbs: {nutrients.CHOCDF?.toFixed(1) || "N/A"}g
              </Badge>
              {nutrients.FIBTG && (
                <Badge variant="outline" className="text-xs">
                  Fiber: {nutrients.FIBTG.toFixed(1)}g
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="self-start">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
