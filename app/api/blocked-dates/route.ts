import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const BLOCKED_DATES_FILE = path.join(process.cwd(), "data", "blocked-dates.json")
const KV_KEY = "blocked_dates"

// Check if KV is available (in production/Vercel)
function isKvAvailable(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN &&
    process.env.KV_REST_API_READ_ONLY_TOKEN
  )
}

// Get KV client (only if available)
async function getKvClient() {
  if (!isKvAvailable()) {
    return null
  }
  try {
    const { kv } = await import("@vercel/kv")
    return kv
  } catch (error) {
    console.error("Error importing KV client:", error)
    return null
  }
}

// Ensure data directory exists (for file system fallback)
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read blocked dates from KV or file system
async function readBlockedDates(): Promise<string[]> {
  if (isKvAvailable()) {
    try {
      const kv = await getKvClient()
      if (kv) {
        const dates = await kv.get<string[]>(KV_KEY)
        return dates || []
      }
    } catch (error) {
      console.error("Error reading blocked dates from KV:", error)
      // Fall through to file system fallback
    }
  }

  // Fallback to file system (local development)
  ensureDataDir()
  if (!fs.existsSync(BLOCKED_DATES_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(BLOCKED_DATES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading blocked dates from file:", error)
    return []
  }
}

// Write blocked dates to KV or file system
async function writeBlockedDates(dates: string[]): Promise<void> {
  if (isKvAvailable()) {
    try {
      const kv = await getKvClient()
      if (kv) {
        await kv.set(KV_KEY, dates)
        return
      }
    } catch (error) {
      console.error("Error writing blocked dates to KV:", error)
      throw new Error("Failed to save blocked dates to storage")
    }
  }

  // Fallback to file system (local development)
  try {
    ensureDataDir()
    fs.writeFileSync(BLOCKED_DATES_FILE, JSON.stringify(dates, null, 2))
  } catch (error: any) {
    console.error("Error writing blocked dates to file:", error)
    // In serverless/production environments, file system writes may not be allowed
    if (error.code === "EACCES" || error.code === "EROFS" || error.code === "ENOENT") {
      throw new Error("File system write not supported. Please configure Vercel KV for production.")
    }
    throw error
  }
}

// GET - Get all blocked dates
export async function GET() {
  try {
    const blockedDates = await readBlockedDates()
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
    
    const blockedDates = await readBlockedDates()
    
    // Check if date is already blocked
    if (blockedDates.includes(date)) {
      return NextResponse.json({ error: "Date is already blocked" }, { status: 400 })
    }
    
    blockedDates.push(date)
    blockedDates.sort() // Keep dates sorted
    await writeBlockedDates(blockedDates)
    
    return NextResponse.json({ success: true, blockedDates })
  } catch (error: any) {
    console.error("Error blocking date:", error)
    const errorMessage = error?.message || "Failed to block date"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
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
    
    const blockedDates = await readBlockedDates()
    const filtered = blockedDates.filter((d) => d !== date)
    
    if (filtered.length === blockedDates.length) {
      return NextResponse.json({ error: "Date is not blocked" }, { status: 404 })
    }
    
    await writeBlockedDates(filtered)
    return NextResponse.json({ success: true, blockedDates: filtered })
  } catch (error: any) {
    console.error("Error unblocking date:", error)
    const errorMessage = error?.message || "Failed to unblock date"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}


