import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const RESERVATIONS_FILE = path.join(process.cwd(), "data", "reservations.json")

// Read reservations from file
function readReservations() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
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
  fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2))
}

// PUT - Update a reservation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const reservations = readReservations()
    const { id } = await params
    
    const index = reservations.findIndex((r: any) => r.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }
    
    reservations[index] = {
      ...reservations[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    
    writeReservations(reservations)
    return NextResponse.json(reservations[index])
  } catch (error) {
    console.error("Error updating reservation:", error)
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 })
  }
}

// DELETE - Delete a reservation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const reservations = readReservations()
    const { id } = await params
    
    const filtered = reservations.filter((r: any) => r.id !== id)
    if (filtered.length === reservations.length) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }
    
    writeReservations(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting reservation:", error)
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 })
  }
}

