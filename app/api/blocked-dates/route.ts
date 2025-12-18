import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const BLOCKED_DATES_FILE = path.join(process.cwd(), "data", "blocked-dates.json")

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read blocked dates from file
function readBlockedDates(): string[] {
  ensureDataDir()
  if (!fs.existsSync(BLOCKED_DATES_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(BLOCKED_DATES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading blocked dates:", error)
    return []
  }
}

// Write blocked dates to file
function writeBlockedDates(dates: string[]) {
  ensureDataDir()
  fs.writeFileSync(BLOCKED_DATES_FILE, JSON.stringify(dates, null, 2))
}

// GET - Get all blocked dates
export async function GET() {
  try {
    const blockedDates = readBlockedDates()
    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error("Error fetching blocked dates:", error)
    return NextResponse.json({ error: "Failed to fetch blocked dates" }, { status: 500 })
  }
}

// POST - Add a blocked date
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date } = body
    
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }
    
    const blockedDates = readBlockedDates()
    
    // Check if date is already blocked
    if (blockedDates.includes(date)) {
      return NextResponse.json({ error: "Date is already blocked" }, { status: 400 })
    }
    
    blockedDates.push(date)
    blockedDates.sort() // Keep dates sorted
    writeBlockedDates(blockedDates)
    
    return NextResponse.json({ success: true, blockedDates })
  } catch (error) {
    console.error("Error blocking date:", error)
    return NextResponse.json({ error: "Failed to block date" }, { status: 500 })
  }
}

// DELETE - Remove a blocked date
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }
    
    const blockedDates = readBlockedDates()
    const filtered = blockedDates.filter((d) => d !== date)
    
    if (filtered.length === blockedDates.length) {
      return NextResponse.json({ error: "Date is not blocked" }, { status: 404 })
    }
    
    writeBlockedDates(filtered)
    return NextResponse.json({ success: true, blockedDates: filtered })
  } catch (error) {
    console.error("Error unblocking date:", error)
    return NextResponse.json({ error: "Failed to unblock date" }, { status: 500 })
  }
}


