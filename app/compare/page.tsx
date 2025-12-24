"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bike, Gauge, Fuel, IndianRupee, Star, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock bike data
const bikes = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    price: 193000,
    image:
      "https://placehold.co/400x300?text=Royal+Enfield+Classic+350+motorcycle+black+color+side+profile+studio+shot",
    mileage: "35-40 km/l",
    engine: "349cc",
    power: "20.2 bhp",
    torque: "27 Nm",
    weight: "195 kg",
    fuelCapacity: "13 L",
    topSpeed: "114 km/h",
    rating: 4.5,
    abs: true,
    fuelInjection: true,
    ledLights: true,
    digitalDisplay: true,
  },
  {
    id: 2,
    name: "Honda CB350",
    brand: "Honda",
    price: 215000,
    image: "https://placehold.co/400x300?text=Honda+CB350+motorcycle+red+color+side+angle+premium+studio+lighting",
    mileage: "38-42 km/l",
    engine: "348cc",
    power: "21 bhp",
    torque: "30 Nm",
    weight: "181 kg",
    fuelCapacity: "15 L",
    topSpeed: "115 km/h",
    rating: 4.6,
    abs: true,
    fuelInjection: true,
    ledLights: true,
    digitalDisplay: true,
  },
  {
    id: 3,
    name: "KTM Duke 390",
    brand: "KTM",
    price: 310000,
    image: "https://placehold.co/400x300?text=KTM+Duke+390+orange+black+aggressive+sporty+motorcycle+studio+photograph",
    mileage: "25-30 km/l",
    engine: "373cc",
    power: "43.5 bhp",
    torque: "37 Nm",
    weight: "167 kg",
    fuelCapacity: "13.4 L",
    topSpeed: "167 km/h",
    rating: 4.7,
    abs: true,
    fuelInjection: true,
    ledLights: true,
    digitalDisplay: true,
  },
  {
    id: 4,
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    price: 148000,
    image: "https://placehold.co/400x300?text=Bajaj+Pulsar+NS200+blue+black+sporty+naked+bike+side+view",
    mileage: "35-40 km/l",
    engine: "199cc",
    power: "24.5 bhp",
    torque: "18.5 Nm",
    weight: "158 kg",
    fuelCapacity: "12 L",
    topSpeed: "136 km/h",
    rating: 4.3,
    abs: true,
    fuelInjection: true,
    ledLights: false,
    digitalDisplay: false,
  },
  {
    id: 5,
    name: "Yamaha MT-15",
    brand: "Yamaha",
    price: 167000,
    image: "https://placehold.co/400x300?text=Yamaha+MT15+dark+metallic+aggressive+naked+streetfighter+motorcycle",
    mileage: "40-45 km/l",
    engine: "155cc",
    power: "18.1 bhp",
    torque: "14.1 Nm",
    weight: "141 kg",
    fuelCapacity: "10 L",
    topSpeed: "131 km/h",
    rating: 4.6,
    abs: true,
    fuelInjection: true,
    ledLights: true,
    digitalDisplay: true,
  },
]

export default function ComparePage() {
  const router = useRouter()
  const [bike1, setBike1] = useState<number | null>(null)
  const [bike2, setBike2] = useState<number | null>(null)

  const selectedBike1 = bikes.find((b) => b.id === bike1)
  const selectedBike2 = bikes.find((b) => b.id === bike2)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN").format(price)
  }

  const resetComparison = () => {
    setBike1(null)
    setBike2(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-lime-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">Compare Bikes</h1>
          <p className="text-lg text-muted-foreground">Select two bikes to compare their specifications side by side</p>
        </div>

        {/* Bike Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-bold mb-4">Select First Bike</h3>
            <select
              value={bike1 || ""}
              onChange={(e) => setBike1(Number(e.target.value) || null)}
              className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Choose a bike...</option>
              {bikes.map((bike) => (
                <option key={bike.id} value={bike.id} disabled={bike.id === bike2}>
                  {bike.name} - ₹{formatPrice(bike.price)}
                </option>
              ))}
            </select>
            {selectedBike1 && (
              <div className="mt-4">
                <img
                  src={selectedBike1.image || "/placeholder.svg"}
                  alt={selectedBike1.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="font-bold text-lg mt-3">{selectedBike1.name}</h4>
                <p className="text-2xl font-bold text-primary">₹{formatPrice(selectedBike1.price)}</p>
              </div>
            )}
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-lg font-bold mb-4">Select Second Bike</h3>
            <select
              value={bike2 || ""}
              onChange={(e) => setBike2(Number(e.target.value) || null)}
              className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Choose a bike...</option>
              {bikes.map((bike) => (
                <option key={bike.id} value={bike.id} disabled={bike.id === bike1}>
                  {bike.name} - ₹{formatPrice(bike.price)}
                </option>
              ))}
            </select>
            {selectedBike2 && (
              <div className="mt-4">
                <img
                  src={selectedBike2.image || "/placeholder.svg"}
                  alt={selectedBike2.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="font-bold text-lg mt-3">{selectedBike2.name}</h4>
                <p className="text-2xl font-bold text-primary">₹{formatPrice(selectedBike2.price)}</p>
              </div>
            )}
          </Card>
        </div>

        {selectedBike1 && selectedBike2 && (
          <div className="flex justify-center mb-8">
            <Button onClick={resetComparison} variant="outline" className="px-8 bg-transparent">
              Reset Comparison
            </Button>
          </div>
        )}

        {/* Comparison Table */}
        {selectedBike1 && selectedBike2 && (
          <Card className="overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
                    <th className="p-4 text-left font-bold">Specification</th>
                    <th className="p-4 text-center font-bold">{selectedBike1.name}</th>
                    <th className="p-4 text-center font-bold">{selectedBike2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      Ex-Showroom Price
                    </td>
                    <td className="p-4 text-center font-semibold">₹{formatPrice(selectedBike1.price)}</td>
                    <td className="p-4 text-center font-semibold">₹{formatPrice(selectedBike2.price)}</td>
                  </tr>

                  {/* Engine */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-primary" />
                      Engine Capacity
                    </td>
                    <td className="p-4 text-center">{selectedBike1.engine}</td>
                    <td className="p-4 text-center">{selectedBike2.engine}</td>
                  </tr>

                  {/* Power */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Max Power</td>
                    <td className="p-4 text-center">{selectedBike1.power}</td>
                    <td className="p-4 text-center">{selectedBike2.power}</td>
                  </tr>

                  {/* Torque */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Max Torque</td>
                    <td className="p-4 text-center">{selectedBike1.torque}</td>
                    <td className="p-4 text-center">{selectedBike2.torque}</td>
                  </tr>

                  {/* Mileage */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-primary" />
                      Mileage
                    </td>
                    <td className="p-4 text-center">{selectedBike1.mileage}</td>
                    <td className="p-4 text-center">{selectedBike2.mileage}</td>
                  </tr>

                  {/* Weight */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Weight</td>
                    <td className="p-4 text-center">{selectedBike1.weight}</td>
                    <td className="p-4 text-center">{selectedBike2.weight}</td>
                  </tr>

                  {/* Fuel Capacity */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Fuel Tank Capacity</td>
                    <td className="p-4 text-center">{selectedBike1.fuelCapacity}</td>
                    <td className="p-4 text-center">{selectedBike2.fuelCapacity}</td>
                  </tr>

                  {/* Top Speed */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Top Speed</td>
                    <td className="p-4 text-center">{selectedBike1.topSpeed}</td>
                    <td className="p-4 text-center">{selectedBike2.topSpeed}</td>
                  </tr>

                  {/* Rating */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      User Rating
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold">{selectedBike1.rating}/5</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold">{selectedBike2.rating}/5</span>
                    </td>
                  </tr>

                  {/* ABS */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">ABS</td>
                    <td className="p-4 text-center">
                      {selectedBike1.abs ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {selectedBike2.abs ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>

                  {/* Fuel Injection */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Fuel Injection</td>
                    <td className="p-4 text-center">
                      {selectedBike1.fuelInjection ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {selectedBike2.fuelInjection ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>

                  {/* LED Lights */}
                  <tr className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-semibold">LED Lights</td>
                    <td className="p-4 text-center">
                      {selectedBike1.ledLights ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {selectedBike2.ledLights ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>

                  {/* Digital Display */}
                  <tr className="hover:bg-secondary/20">
                    <td className="p-4 font-semibold">Digital Display</td>
                    <td className="p-4 text-center">
                      {selectedBike1.digitalDisplay ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {selectedBike2.digitalDisplay ? (
                        <Check className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {(!selectedBike1 || !selectedBike2) && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg p-12 max-w-md mx-auto">
              <Bike className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Select two bikes above to see detailed comparison</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
