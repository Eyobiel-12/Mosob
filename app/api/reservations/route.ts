import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const RESERVATIONS_FILE = path.join(process.cwd(), "data", "reservations.json")

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read reservations from file
function readReservations() {
  ensureDataDir()
  if (!fs.existsSync(RESERVATIONS_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(RESERVATIONS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading reservations:", error)
    return []
  }
}

// Write reservations to file
function writeReservations(reservations: any[]) {
  ensureDataDir()
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2))
}

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion?: string
  specialRequests?: string
  status?: "pending" | "confirmed" | "cancelled"
  createdAt: string
  updatedAt: string
}

// GET - List all reservations
export async function GET(request: NextRequest) {
  try {
    const reservations = readReservations()
    // Sort by date (newest first)
    reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

// POST - Create a new reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const reservations = readReservations()
    
    const newReservation: Reservation = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      time: body.time,
      guests: body.guests,
      occasion: body.occasion || "",
      specialRequests: body.specialRequests || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    reservations.push(newReservation)
    writeReservations(reservations)
    
    return NextResponse.json(newReservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

