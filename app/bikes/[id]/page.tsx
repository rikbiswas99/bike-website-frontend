"use client";

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bike, Gauge, Fuel, IndianRupee, MapPin, Shield, Star, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock bike data (would come from API/database in production)
const bikeDetails = {
  id: 1,
  name: "Royal Enfield Classic 350",
  brand: "Royal Enfield",
  exShowroomPrice: 193000,
  locations: {
    Delhi: { rto: 19300, insurance: 8500 },
    Mumbai: { rto: 21230, insurance: 9200 },
    Bangalore: { rto: 17370, insurance: 8000 },
    Chennai: { rto: 15440, insurance: 7800 },
    Kolkata: { rto: 16300, insurance: 7900 },
  },
  images: [
    "https://placehold.co/800x600?text=Royal+Enfield+Classic+350+motorcycle+black+color+side+profile+studio+shot",
    "https://placehold.co/800x600?text=Royal+Enfield+Classic+350+front+view+headlight+closeup",
    "https://placehold.co/800x600?text=Royal+Enfield+Classic+350+rear+view+exhaust+detail",
    "https://placehold.co/800x600?text=Royal+Enfield+Classic+350+dashboard+instrument+cluster",
  ],
  mileage: "35-40 km/l",
  engine: "349cc",
  rating: 4.5,
  reviews: 1247,
  description:
    "The Royal Enfield Classic 350 is a timeless cruiser that perfectly blends vintage aesthetics with modern engineering. It's powered by a refined 349cc single-cylinder engine that delivers smooth power delivery and excellent fuel efficiency.",
  specifications: {
    engine: {
      displacement: "349cc",
      type: "Single Cylinder, 4 Stroke, Air-Oil Cooled",
      maxPower: "20.2 bhp @ 6100 rpm",
      maxTorque: "27 Nm @ 4000 rpm",
      cylinders: "1",
      valves: "2 Valves",
    },
    transmission: {
      gearbox: "5-Speed",
      clutch: "Wet Multi-plate",
      fuelSupply: "Fuel Injection",
    },
    dimensions: {
      length: "2160 mm",
      width: "790 mm",
      height: "1090 mm",
      wheelbase: "1370 mm",
      groundClearance: "170 mm",
      seatHeight: "805 mm",
      weight: "195 kg",
    },
    performance: {
      mileage: "35-40 km/l",
      topSpeed: "114 km/h",
      fuelCapacity: "13 L",
      fuelType: "Petrol",
    },
    brakes: {
      front: "300mm Disc",
      rear: "270mm Disc",
      abs: "Dual Channel ABS",
    },
    suspension: {
      front: "Telescopic, 41mm forks, 130mm travel",
      rear: "Twin gas-charged shock absorbers",
    },
  },
  colors: ["Vintage Black", "Chrome Red", "Gunmetal Grey", "Marsh Grey", "Signals Blue"],
  features: [
    "LED DRL & Tail Lamp",
    "Tripper Navigation System",
    "Dual Channel ABS",
    "USB Charging Port",
    "Tubeless Tyres",
    "Electric Start",
    "Digital Analog Instrument Cluster",
    "Comfortable Seating",
  ],
}

const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"]

export default function BikeDetailsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (in real app, check session/token)
    const checkAuth = () => {
      // Mock authentication check
      const authStatus = sessionStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(authStatus)
      setIsLoading(false)

      // Redirect to home if not logged in
      if (!authStatus) {
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    }

    checkAuth()
  }, [])

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState("Delhi")

  const locationPricing = bikeDetails.locations[selectedLocation as keyof typeof bikeDetails.locations]
  const totalPrice = bikeDetails.exShowroomPrice + locationPricing.rto + locationPricing.insurance

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-lime-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-lime-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to view detailed bike information and specifications.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-lime-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-lg p-2">
                  <Bike className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-primary">Bikers</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            <Card className="overflow-hidden bg-white">
              <div className="aspect-[4/3] bg-secondary/20 relative">
                <img
                  src={bikeDetails.images[selectedImage] || "/placeholder.svg"}
                  alt={`${bikeDetails.name} view ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {bikeDetails.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-primary scale-95" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Details & Price */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{bikeDetails.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{bikeDetails.rating}</span>
                  <span className="text-muted-foreground text-sm">({bikeDetails.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6 bg-white">
              <p className="text-muted-foreground leading-relaxed">{bikeDetails.description}</p>
            </Card>

            {/* Price Card */}
            <Card className="p-6 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-cyan-100">Select Your City</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 rounded-lg text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-lime-300"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-400/30">
                  <span className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Ex-Showroom Price
                  </span>
                  <span className="font-semibold">₹{formatPrice(bikeDetails.exShowroomPrice)}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-cyan-400/30">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    RTO ({selectedLocation})
                  </span>
                  <span className="font-semibold">₹{formatPrice(locationPricing.rto)}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-cyan-400/30">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Insurance
                  </span>
                  <span className="font-semibold">₹{formatPrice(locationPricing.insurance)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-2xl font-bold mb-6">
                <span>On-Road Price</span>
                <span>₹{formatPrice(totalPrice)}</span>
              </div>

              <Button className="w-full bg-white text-cyan-700 hover:bg-cyan-50 font-semibold py-6 text-lg">
                Get Best Offers
              </Button>
            </Card>

            {/* Quick Specs */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Gauge className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engine</p>
                    <p className="font-semibold">{bikeDetails.engine}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Fuel className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-semibold">{bikeDetails.mileage}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Detailed Specifications</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Engine Specs */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Engine & Transmission
              </h3>
              <div className="space-y-3">
                {Object.entries(bikeDetails.specifications.engine).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
                {Object.entries(bikeDetails.specifications.transmission).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Dimensions */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Bike className="h-5 w-5 text-primary" />
                Dimensions & Capacity
              </h3>
              <div className="space-y-3">
                {Object.entries(bikeDetails.specifications.dimensions).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Fuel className="h-5 w-5 text-primary" />
                Performance
              </h3>
              <div className="space-y-3">
                {Object.entries(bikeDetails.specifications.performance).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Brakes & Suspension */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-bold mb-4">Brakes & Suspension</h3>
              <div className="space-y-3">
                {Object.entries(bikeDetails.specifications.brakes).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
                {Object.entries(bikeDetails.specifications.suspension).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span className="font-semibold text-right max-w-[200px]">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <Card className="p-6 bg-white">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bikeDetails.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Available Colors */}
        <div className="mt-12">
          <Card className="p-6 bg-white">
            <h2 className="text-2xl font-bold mb-6">Available Colors</h2>
            <div className="flex flex-wrap gap-4">
              {bikeDetails.colors.map((color, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg font-semibold text-cyan-900 border-2 border-cyan-200"
                >
                  {color}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
