import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import Redis from "ioredis"

const BLOCKED_DATES_FILE = path.join(process.cwd(), "data", "blocked-dates.json")
const REDIS_KEY = "mosob:blocked_dates"

// Check if Redis is available
function isRedisAvailable(): boolean {
  return !!process.env.REDIS_URL
}

// Get Redis client (singleton pattern)
let redisClient: Redis | null = null

function getRedisClient(): Redis | null {
  if (!isRedisAvailable()) {
    return null
  }

  if (!redisClient) {
    try {
      redisClient = new Redis(process.env.REDIS_URL!, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000)
          return delay
        },
        maxRetriesPerRequest: 3,
      })

      redisClient.on("error", (error) => {
        console.error("Redis connection error:", error)
      })

      redisClient.on("connect", () => {
        console.log("Connected to Redis")
      })
    } catch (error) {
      console.error("Error creating Redis client:", error)
      return null
    }
  }

  return redisClient
}

// Ensure data directory exists (for file system fallback)
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read blocked dates from Redis or file system
async function readBlockedDates(): Promise<string[]> {
  if (isRedisAvailable()) {
    try {
      const redis = getRedisClient()
      if (redis) {
        const data = await redis.get(REDIS_KEY)
        if (data) {
          return JSON.parse(data) as string[]
        }
        return []
      }
    } catch (error) {
      console.error("Error reading blocked dates from Redis:", error)
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

// Write blocked dates to Redis or file system
async function writeBlockedDates(dates: string[]): Promise<void> {
  if (isRedisAvailable()) {
    try {
      const redis = getRedisClient()
      if (redis) {
        await redis.set(REDIS_KEY, JSON.stringify(dates))
        return
      }
    } catch (error) {
      console.error("Error writing blocked dates to Redis:", error)
      throw new Error("Failed to save blocked dates to Redis storage")
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
      throw new Error("File system write not supported. Please configure REDIS_URL for production.")
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


