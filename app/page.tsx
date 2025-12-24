"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Search,
  ChevronDown,
  Menu,
  X,
  Bike,
  TrendingUp,
  Filter,
  IndianRupee,
  Gauge,
  Shield,
  Lock,
  User,
  LogOut,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react"

const locations = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

const getLocationPricing = (exShowroomPrice: number, location: string) => {
  // RTO rates vary by state (typically 8-14% of ex-showroom price)
  const rtoRates: { [key: string]: number } = {
    "Andhra Pradesh": 0.11,
    "Arunachal Pradesh": 0.09,
    Assam: 0.09,
    Bihar: 0.09,
    Chhattisgarh: 0.09,
    Goa: 0.1,
    Gujarat: 0.12,
    Haryana: 0.13,
    "Himachal Pradesh": 0.1,
    Jharkhand: 0.09,
    Karnataka: 0.12,
    Kerala: 0.1,
    "Madhya Pradesh": 0.1,
    Maharashtra: 0.14,
    Manipur: 0.08,
    Meghalaya: 0.08,
    Mizoram: 0.08,
    Nagaland: 0.08,
    Odisha: 0.1,
    Punjab: 0.11,
    Rajasthan: 0.11,
    Sikkim: 0.08,
    "Tamil Nadu": 0.11,
    Telangana: 0.12,
    Tripura: 0.08,
    "Uttar Pradesh": 0.1,
    Uttarakhand: 0.1,
    "West Bengal": 0.11,
    "Andaman and Nicobar Islands": 0.08,
    Chandigarh: 0.12,
    "Dadra and Nagar Haveli and Daman and Diu": 0.09,
    Delhi: 0.13,
    "Jammu and Kashmir": 0.1,
    Ladakh: 0.08,
    Lakshadweep: 0.08,
    Puducherry: 0.1,
  }

  const rtoRate = rtoRates[location] || 0.1
  const rto = Math.round(exShowroomPrice * rtoRate)
  const insurance = Math.round(exShowroomPrice * 0.05) // Insurance is approximately 5% of ex-showroom price

  return { rto, insurance }
}

const bikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    exShowroomPrice: 193000,
    image:
      "https://placehold.co/400x300?text=Royal+Enfield+Classic+350+motorcycle+black+color+side+profile+studio+shot",
    mileage: "35-40 km/l",
    engine: "349cc",
    rating: 4.5,
    type: "cruiser",
  },
  {
    id: 2,
    name: "Honda CB350",
    brand: "Honda",
    exShowroomPrice: 215000,
    image: "https://placehold.co/400x300?text=Honda+CB350+motorcycle+red+color+side+angle+premium+studio+lighting",
    mileage: "38-42 km/l",
    engine: "348cc",
    rating: 4.6,
    type: "sport",
  },
  {
    id: 3,
    name: "KTM Duke 390",
    brand: "KTM",
    exShowroomPrice: 310000,
    image: "https://placehold.co/400x300?text=KTM+Duke+390+orange+black+aggressive+sporty+motorcycle+studio+photograph",
    mileage: "25-30 km/l",
    engine: "373cc",
    rating: 4.7,
    type: "sport",
  },
  {
    id: 4,
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    exShowroomPrice: 148000,
    image: "https://placehold.co/400x300?text=Bajaj+Pulsar+NS200+blue+black+sporty+naked+bike+side+view",
    mileage: "35-40 km/l",
    engine: "199cc",
    rating: 4.3,
    type: "sport",
  },
  {
    id: 5,
    name: "TVS Apache RTR 160",
    brand: "TVS",
    exShowroomPrice: 125000,
    image: "https://placehold.co/400x300?text=TVS+Apache+RTR+160+red+white+racing+graphics+studio+shot",
    mileage: "45-50 km/l",
    engine: "159cc",
    rating: 4.4,
    type: "commuter",
  },
  {
    id: 6,
    name: "Yamaha MT-15",
    brand: "Yamaha",
    exShowroomPrice: 167000,
    image: "https://placehold.co/400x300?text=Yamaha+MT15+dark+metallic+aggressive+naked+streetfighter+motorcycle",
    mileage: "40-45 km/l",
    engine: "155cc",
    rating: 4.6,
    type: "sport",
  },
  {
    id: 7,
    name: "Hero Splendor Plus",
    brand: "Hero",
    exShowroomPrice: 74000,
    image: "https://placehold.co/400x300?text=Hero+Splendor+Plus+black+red+commuter+motorcycle+clean+studio+background",
    mileage: "60-65 km/l",
    engine: "97cc",
    rating: 4.2,
    type: "commuter",
  },
  {
    id: 8,
    name: "Suzuki Gixxer SF",
    brand: "Suzuki",
    exShowroomPrice: 145000,
    image: "https://placehold.co/400x300?text=Suzuki+Gixxer+SF+blue+fully+faired+sports+bike+aerodynamic",
    mileage: "45-50 km/l",
    engine: "155cc",
    rating: 4.5,
    type: "sport",
  },
  {
    id: 9,
    name: "Kawasaki Ninja 300",
    brand: "Kawasaki",
    exShowroomPrice: 340000,
    image: "https://placehold.co/400x300?text=Kawasaki+Ninja+300+green+fully+faired+twin+cylinder+sportbike",
    mileage: "25-30 km/l",
    engine: "296cc",
    rating: 4.8,
    type: "sport",
  },
  {
    id: 10,
    name: "Royal Enfield Himalayan",
    brand: "Royal Enfield",
    exShowroomPrice: 225000,
    image: "https://placehold.co/400x300?text=Royal+Enfield+Himalayan+adventure+touring+motorcycle+off+road+capable",
    mileage: "30-35 km/l",
    engine: "411cc",
    rating: 4.6,
    type: "adventure",
  },
  {
    id: 11,
    name: "Honda Shine 125",
    brand: "Honda",
    exShowroomPrice: 82000,
    image: "https://placehold.co/400x300?text=Honda+Shine+125+silver+black+premium+commuter+motorcycle",
    mileage: "55-60 km/l",
    engine: "123cc",
    rating: 4.3,
    type: "commuter",
  },
  {
    id: 12,
    name: "Bajaj Dominar 400",
    brand: "Bajaj",
    exShowroomPrice: 225000,
    image: "https://placehold.co/400x300?text=Bajaj+Dominar+400+black+touring+motorcycle+muscular+design",
    mileage: "26-30 km/l",
    engine: "373cc",
    rating: 4.5,
    type: "cruiser",
  },
  {
    id: 13,
    name: "TVS Apache RR 310",
    brand: "TVS",
    exShowroomPrice: 285000,
    image: "https://placehold.co/400x300?text=TVS+Apache+RR+310+red+black+fully+faired+track+focused+sportbike",
    mileage: "30-35 km/l",
    engine: "312cc",
    rating: 4.7,
    type: "sport",
  },
  {
    id: 14,
    name: "Yamaha FZ-S",
    brand: "Yamaha",
    exShowroomPrice: 125000,
    image: "https://placehold.co/400x300?text=Yamaha+FZ+S+blue+muscular+streetfighter+150cc+motorcycle",
    mileage: "45-50 km/l",
    engine: "149cc",
    rating: 4.5,
    type: "sport",
  },
  {
    id: 15,
    name: "Hero Xtreme 160R",
    brand: "Hero",
    exShowroomPrice: 135000,
    image: "https://placehold.co/400x300?text=Hero+Xtreme+160R+red+white+sporty+premium+commuter+motorcycle",
    mileage: "45-50 km/l",
    engine: "163cc",
    rating: 4.4,
    type: "sport",
  },
  {
    id: 16,
    name: "Suzuki Intruder 150",
    brand: "Suzuki",
    exShowroomPrice: 135000,
    image: "https://placehold.co/400x300?text=Suzuki+Intruder+150+black+cruiser+style+motorcycle+relaxed+riding",
    mileage: "45-50 km/l",
    engine: "155cc",
    rating: 4.3,
    type: "cruiser",
  },
  {
    id: 17,
    name: "KTM RC 200",
    brand: "KTM",
    exShowroomPrice: 235000,
    image: "https://placehold.co/400x300?text=KTM+RC+200+orange+white+fully+faired+race+inspired+sportbike",
    mileage: "30-35 km/l",
    engine: "199cc",
    rating: 4.6,
    type: "sport",
  },
  {
    id: 18,
    name: "Royal Enfield Meteor 350",
    brand: "Royal Enfield",
    exShowroomPrice: 215000,
    image: "https://placehold.co/400x300?text=Royal+Enfield+Meteor+350+blue+retro+cruiser+comfortable+touring",
    mileage: "35-40 km/l",
    engine: "349cc",
    rating: 4.6,
    type: "cruiser",
  },
  {
    id: 19,
    name: "Bajaj Pulsar 150",
    brand: "Bajaj",
    exShowroomPrice: 112000,
    image: "https://placehold.co/400x300?text=Bajaj+Pulsar+150+black+red+popular+sports+commuter+motorcycle",
    mileage: "50-55 km/l",
    engine: "149cc",
    rating: 4.2,
    type: "commuter",
  },
  {
    id: 20,
    name: "Honda CB200X",
    brand: "Honda",
    exShowroomPrice: 155000,
    image: "https://placehold.co/400x300?text=Honda+CB200X+adventure+styled+motorcycle+upright+riding+position",
    mileage: "35-40 km/l",
    engine: "184cc",
    rating: 4.5,
    type: "adventure",
  },
]

const brands = ["All", "Royal Enfield", "Honda", "KTM", "Bajaj", "TVS", "Yamaha", "Hero", "Suzuki", "Kawasaki"]

export default function BikersHomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("Delhi")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [ccRange, setCcRange] = useState("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedStatus = sessionStorage.getItem("isLoggedIn")
      return storedStatus === "true"
    }
    return false
  })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("userEmail") || ""
    }
    return ""
  })
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const filteredBikes = bikes.filter((bike) => {
    const locationPricing = getLocationPricing(bike.exShowroomPrice, selectedLocation)
    const totalPrice = bike.exShowroomPrice + locationPricing.rto + locationPricing.insurance

    const matchesSearch = (() => {
      if (!searchQuery) return true

      const query = searchQuery.toLowerCase().trim()
      const engineCC = Number.parseInt(bike.engine.replace(/cc/gi, "").trim())

      const searchNumber = Number.parseFloat(query) // Use parseFloat for potential decimal values in search
      if (!isNaN(searchNumber)) {
        if (query.includes("lakh") || query.includes("l")) {
          const lakhValue = searchNumber * 100000
          return totalPrice <= lakhValue
        }
        // Allow searching by price, CC, or partial CC
        return totalPrice <= searchNumber || engineCC === searchNumber || engineCC.toString().includes(query)
      }

      // Handle text-based search for bike names/brands
      return bike.name.toLowerCase().includes(query) || bike.brand.toLowerCase().includes(query)
    })()

    const matchesBrand = selectedBrand === "All" || bike.brand === selectedBrand

    let matchesPrice = true
    if (priceRange !== "All") {
      if (priceRange === "under1") matchesPrice = totalPrice < 100000
      else if (priceRange === "1to2") matchesPrice = totalPrice >= 100000 && totalPrice < 200000
      else if (priceRange === "above2") matchesPrice = totalPrice >= 200000
    }

    let matchesCC = true
    if (ccRange !== "All") {
      const engineCC = Number.parseInt(bike.engine.replace(/cc/gi, "").trim())
      if (ccRange === "under150") matchesCC = engineCC < 150
      else if (ccRange === "150to250") matchesCC = engineCC >= 150 && engineCC < 250
      else if (ccRange === "250to500") matchesCC = engineCC >= 250 && engineCC < 500
      else if (ccRange === "above500") matchesCC = engineCC >= 500
    }

    return matchesSearch && matchesBrand && matchesPrice && matchesCC
  })

  const resetFilters = () => {
    setSelectedBrand("All")
    setPriceRange("All")
    setCcRange("All")
    setSearchQuery("")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app, this would call an API
    if (authForm.email && authForm.password) {
      setIsLoggedIn(true)
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("userEmail", authForm.email)
      setUserEmail(authForm.email)
      setShowAuthModal(false)
      setAuthForm({ email: "", password: "", name: "" })
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock signup - in real app, this would call an API
    if (authForm.email && authForm.password && authForm.name) {
      setIsLoggedIn(true)
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("userEmail", authForm.email)
      setUserEmail(authForm.email)
      setShowAuthModal(false)
      setAuthForm({ email: "", password: "", name: "" })
    }
  }

  const handleViewDetails = (bikeId: number) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      setAuthMode("login")
    } else {
      // Navigate to bike details page
      router.push(`/bikes/${bikeId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-primary/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl shadow-lg">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bikers
              </span>
            </div>

            {/* Desktop Navigation with Premium Location Selector */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative">
                <button
                  onClick={() => {
                    const dropdown = document.getElementById("location-dropdown")
                    if (dropdown) {
                      dropdown.classList.toggle("hidden")
                    }
                  }}
                  className="group flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border border-primary/50 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/70"
                >
                  <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-full shadow-inner">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-primary text-sm">{selectedLocation}</span>
                  <ChevronDown className="h-4 w-4 text-primary group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu with glassmorphism */}
                <div
                  id="location-dropdown"
                  className="hidden absolute top-full mt-2 w-64 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/50 z-50"
                >
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => {
                        setSelectedLocation(location)
                        const dropdown = document.getElementById("location-dropdown")
                        if (dropdown) dropdown.classList.add("hidden")
                      }}
                      className={`w-full px-5 py-3 text-left hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200 flex items-center gap-3 group ${
                        selectedLocation === location ? "bg-gradient-to-r from-primary/20 to-accent/20" : ""
                      }`}
                    >
                      <MapPin
                        className={`h-4 w-4 ${selectedLocation === location ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
                      />
                      <span
                        className={`font-medium ${selectedLocation === location ? "text-foreground" : "text-gray-700"}`}
                      >
                        {location}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <a href="#" className="text-foreground hover:text-primary font-semibold transition-colors duration-200">
                New Bikes
              </a>
              <a href="#" className="text-foreground hover:text-primary font-semibold transition-colors duration-200">
                Used Bikes
              </a>
              <a
                href="#compare"
                className="text-foreground hover:text-primary font-semibold transition-colors duration-200"
              >
                Compare
              </a>
              <a href="#" className="text-foreground hover:text-primary font-semibold transition-colors duration-200">
                Reviews
              </a>

              {/* Auth Button/User Menu */}
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
                    <User className="h-4 w-4" />
                    <span className="font-semibold text-sm">{userEmail.split("@")[0]}</span>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/20 overflow-hidden">
                    <button
                      onClick={() => {
                        setIsLoggedIn(false)
                        setUserEmail("")
                        sessionStorage.removeItem("userEmail")
                        sessionStorage.removeItem("isLoggedIn")
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2 text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuthModal(true)
                    setAuthMode("login")
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-primary/20 mt-2">
              {/* Mobile Location Selector */}
              <div className="mb-4">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/50 rounded-xl font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <a
                href="#"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all"
              >
                New Bikes
              </a>
              <a
                href="#"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all"
              >
                Used Bikes
              </a>
              <a
                href="#compare"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all"
              >
                Compare
              </a>
              <a
                href="#"
                className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all"
              >
                Reviews
              </a>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setUserEmail("")
                    sessionStorage.removeItem("userEmail")
                    sessionStorage.removeItem("isLoggedIn")
                  }}
                  className="w-full mt-2 py-3 px-4 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout ({userEmail.split("@")[0]})
                </button>
              ) : (
                <Button
                  onClick={() => {
                    setShowAuthModal(true)
                    setAuthMode("login")
                  }}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Login
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/30 to-teal-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-lime-400/30 to-green-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Compare prices, specifications, and find the best bikes in India
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 max-w-2xl mx-auto border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <Search className="h-5 w-5 text-primary ml-2" />
            <input
              type="text"
              placeholder="Search bikes by amount or CC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-foreground placeholder:text-muted-foreground"
            />
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Bike Models</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bikes Listing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Popular Bikes</h2>
              <p className="text-muted-foreground">Explore the best bikes in your area</p>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </h3>
                  <button onClick={resetFilters} className="text-sm text-primary hover:underline font-medium">
                    Reset All
                  </button>
                </div>

                {/* State Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    State
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Bike className="h-4 w-4 text-primary" />
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    <option value="All">All Prices</option>
                    <option value="under1">Under ₹1 Lakh</option>
                    <option value="1to2">₹1 - 2 Lakh</option>
                    <option value="above2">Above ₹2 Lakh</option>
                  </select>
                </div>

                {/* Engine CC Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    Engine Capacity
                  </label>
                  <select
                    value={ccRange}
                    onChange={(e) => setCcRange(e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    <option value="All">All CC</option>
                    <option value="under150">Under 150cc</option>
                    <option value="150to250">150cc - 250cc</option>
                    <option value="250to500">250cc - 500cc</option>
                    <option value="above500">Above 500cc</option>
                  </select>
                </div>

                {/* Active Filters Count */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-bold text-primary">{filteredBikes.length}</span> bikes
                  </p>
                </div>
              </div>
            </div>

            {/* Bikes Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBikes.map((bike) => {
                  const locationPricing = getLocationPricing(bike.exShowroomPrice, selectedLocation)
                  const totalPrice = bike.exShowroomPrice + locationPricing.rto + locationPricing.insurance

                  return (
                    <Card
                      key={bike.id}
                      className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white border-border group"
                    >
                      <div className="relative overflow-hidden bg-secondary/30">
                        <img
                          src={bike.image || "/placeholder.svg"}
                          alt={`${bike.name} motorcycle`}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                          <Shield className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{bike.rating}</span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {bike.name}
                          </h3>
                          <p className="text-2xl font-bold text-primary">₹{formatPrice(bike.exShowroomPrice)}</p>
                          <p className="text-xs text-muted-foreground mt-1">Ex-showroom</p>
                        </div>

                        {isLoggedIn ? (
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                State
                              </span>
                              <span className="font-medium text-foreground">{selectedLocation}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <IndianRupee className="h-3 w-3" />
                                RTO
                              </span>
                              <span className="font-medium text-foreground">
                                ₹{locationPricing.rto.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                Insurance
                              </span>
                              <span className="font-medium text-foreground">
                                ₹{locationPricing.insurance.toLocaleString()}
                              </span>
                            </div>
                            <div className="pt-2 border-t border-border">
                              <div className="flex items-center justify-between text-sm font-bold">
                                <span className="text-foreground">On-Road Price</span>
                                <span className="text-primary">₹{formatPrice(totalPrice)}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4 p-3 bg-secondary/50 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground text-center">
                              Sign in to view detailed pricing
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                          <div className="text-center p-2 bg-secondary/30 rounded">
                            <Gauge className="h-3 w-3 mx-auto mb-1 text-primary" />
                            <p className="font-semibold text-foreground">{bike.engine}</p>
                          </div>
                          <div className="text-center p-2 bg-secondary/30 rounded">
                            <TrendingUp className="h-3 w-3 mx-auto mb-1 text-primary" />
                            <p className="font-semibold text-foreground">{bike.mileage}</p>
                          </div>
                          <div className="text-center p-2 bg-secondary/30 rounded">
                            <Bike className="h-3 w-3 mx-auto mb-1 text-primary" />
                            <p className="font-semibold text-foreground">{bike.type}</p>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleViewDetails(bike.id)}
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                        >
                          {isLoggedIn ? "View Details" : "Sign in to View Details"}
                          {isLoggedIn ? <MapPin className="ml-2 h-4 w-4" /> : <Lock className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {filteredBikes.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">No bikes found matching your filters</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section id="compare" className="py-16 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Compare Bikes</h2>
            <p className="text-lg text-muted-foreground">Make an informed decision by comparing specifications</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-secondary/20 border-border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-white rounded-lg p-8 mb-4 border-2 border-dashed border-border">
                  <MapPin className="h-16 w-16 mx-auto mb-3 text-primary" />
                  <p className="text-muted-foreground">Select first bike</p>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setShowAuthModal(true)
                    setAuthMode("login")
                  }}
                >
                  Choose Bike 1
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-secondary/20 border-border hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="bg-white rounded-lg p-8 mb-4 border-2 border-dashed border-border">
                  <MapPin className="h-16 w-16 mx-auto mb-3 text-primary" />
                  <p className="text-muted-foreground">Select second bike</p>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setShowAuthModal(true)
                    setAuthMode("login")
                  }}
                >
                  Choose Bike 2
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <Bike className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-primary">Bikers</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted companion for discovering the perfect motorcycle.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    New Bikes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Used Bikes
                  </a>
                </li>
                <li>
                  <a href="#compare" className="text-muted-foreground hover:text-primary transition-colors">
                    Compare
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.4-4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.689-.069 4.948 0 3.205-.012 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.073 4.949.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Bikers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{authMode === "login" ? "Welcome Back!" : "Join Bikers"}</h2>
              <p className="text-white/90 text-sm">
                {authMode === "login"
                  ? "Sign in to view detailed bike information"
                  : "Create an account to explore bikes"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={authMode === "login" ? handleLogin : handleSignup} className="p-6 space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="Enter your name"
                      required={authMode === "signup"}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {authMode === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
