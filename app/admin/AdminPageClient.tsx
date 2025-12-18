"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar, Clock, Users, Mail, Phone, Edit, Trash2, Save, X, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Reservation {
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

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "mosob2025"

export default function AdminPageClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [editForm, setEditForm] = useState<Partial<Reservation>>({})
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [newBlockedDate, setNewBlockedDate] = useState("")

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchReservations()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations")
      if (response.ok) {
        const data = await response.json()
        setReservations(data)
      }
    } catch (error) {
      console.error("Error fetching reservations:", error)
      toast.error("Failed to load reservations")
    } finally {
      setLoading(false)
    }
  }

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch("/api/blocked-dates")
      if (response.ok) {
        const data = await response.json()
        setBlockedDates(data)
      }
    } catch (error) {
      console.error("Error fetching blocked dates:", error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlockedDates()
    }
  }, [isAuthenticated])

  const handleBlockDate = async () => {
    if (!newBlockedDate) {
      toast.error("Please select a date")
      return
    }

    try {
      const response = await fetch("/api/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: newBlockedDate }),
      })

      const data = await response.json()

      if (response.ok) {
        setBlockedDates(data.blockedDates)
        setNewBlockedDate("")
        toast.success("Date blocked successfully")
        fetchBlockedDates() // Refresh the blocked dates list
      } else {
        toast.error(data.error || "Failed to block date")
      }
    } catch (error) {
      console.error("Error blocking date:", error)
      toast.error("Failed to block date. Please try again.")
    }
  }

  const handleUnblockDate = async (date: string) => {
    try {
      const response = await fetch(`/api/blocked-dates?date=${date}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (response.ok) {
        setBlockedDates(data.blockedDates)
        toast.success("Date unblocked successfully")
        fetchBlockedDates() // Refresh the blocked dates list
      } else {
        toast.error(data.error || "Failed to unblock date")
      }
    } catch (error) {
      console.error("Error unblocking date:", error)
      toast.error("Failed to unblock date. Please try again.")
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("admin_authenticated", "true")
      fetchReservations()
      toast.success("Login successful")
    } else {
      toast.error("Incorrect password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    setPassword("")
    toast.success("Logged out")
  }

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation)
    setEditForm({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      occasion: reservation.occasion || "",
      specialRequests: reservation.specialRequests || "",
      status: reservation.status || "pending",
    })
  }

  const handleSave = async () => {
    if (!editingReservation) return

    try {
      const response = await fetch(`/api/reservations/${editingReservation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        toast.success("Reservation updated successfully")
        setEditingReservation(null)
        fetchReservations()
      } else {
        toast.error("Failed to update reservation")
      }
    } catch (error) {
      console.error("Error updating reservation:", error)
      toast.error("Failed to update reservation")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Reservation deleted successfully")
        fetchReservations()
      } else {
        toast.error("Failed to delete reservation")
      }
    } catch (error) {
      console.error("Error deleting reservation:", error)
      toast.error("Failed to delete reservation")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">Reservations Admin</h1>
            <p className="text-neutral-600 mt-2">Manage all restaurant reservations</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-neutral-900">{reservations.length}</div>
                <div className="text-sm text-neutral-600">Total Reservations</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {reservations.filter((r) => r.status === "pending").length}
                </div>
                <div className="text-sm text-neutral-600">Pending</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">
                  {reservations.filter((r) => r.status === "confirmed").length}
                </div>
                <div className="text-sm text-neutral-600">Confirmed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blocked Dates Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blocked Dates</CardTitle>
            <CardDescription>Block specific dates to prevent reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="flex-1"
                min={new Date().toISOString().split("T")[0]}
              />
              <Button
                onClick={handleBlockDate}
                className="bg-gold-500 hover:bg-gold-600 text-black"
              >
                Block Date
              </Button>
            </div>
            {blockedDates.length > 0 ? (
              <div className="space-y-2">
                <h4 className="font-medium mb-2">Currently Blocked Dates:</h4>
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((date) => (
                    <Badge
                      key={date}
                      variant="destructive"
                      className="flex items-center gap-2 px-3 py-1"
                    >
                      {format(new Date(date), "PPP")}
                      <button
                        onClick={() => handleUnblockDate(date)}
                        className="ml-2 hover:bg-red-600 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-neutral-500 text-sm">No dates are currently blocked</p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {reservations.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-neutral-500">
                No reservations found
              </CardContent>
            </Card>
          ) : (
            reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-serif font-bold text-neutral-900">{reservation.name}</h3>
                        {getStatusBadge(reservation.status || "pending")}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Calendar className="h-4 w-4 text-gold-500" />
                          <span>{format(new Date(reservation.date), "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Clock className="h-4 w-4 text-gold-500" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Users className="h-4 w-4 text-gold-500" />
                          <span>{reservation.guests} {parseInt(reservation.guests) === 1 ? "person" : "people"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail className="h-4 w-4 text-gold-500" />
                          <a href={`mailto:${reservation.email}`} className="hover:text-gold-500">
                            {reservation.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Phone className="h-4 w-4 text-gold-500" />
                          <a href={`tel:${reservation.phone}`} className="hover:text-gold-500">
                            {reservation.phone}
                          </a>
                        </div>
                        {reservation.occasion && (
                          <div className="text-neutral-600">
                            <span className="font-medium">Occasion:</span> {reservation.occasion}
                          </div>
                        )}
                      </div>
                      {reservation.specialRequests && (
                        <div className="mt-4 p-3 bg-neutral-100 rounded">
                          <p className="text-sm text-neutral-700">
                            <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
                          </p>
                        </div>
                      )}
                      <div className="mt-4 text-xs text-neutral-500">
                        Created: {format(new Date(reservation.createdAt), "PPP p")}
                        {reservation.updatedAt !== reservation.createdAt && (
                          <span> • Updated: {format(new Date(reservation.updatedAt), "PPP p")}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(reservation)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(reservation.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingReservation} onOpenChange={(open) => !open && setEditingReservation(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Reservation</DialogTitle>
              <DialogDescription>Update reservation details</DialogDescription>
            </DialogHeader>
            {editingReservation && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={editForm.phone || ""}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={editForm.date || ""}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input
                      value={editForm.time || ""}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Guests</Label>
                    <Input
                      value={editForm.guests || ""}
                      onChange={(e) => setEditForm({ ...editForm, guests: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editForm.status || "pending"}
                      onValueChange={(value: "pending" | "confirmed" | "cancelled") =>
                        setEditForm({ ...editForm, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Occasion</Label>
                  <Input
                    value={editForm.occasion || ""}
                    onChange={(e) => setEditForm({ ...editForm, occasion: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Special Requests</Label>
                  <Textarea
                    value={editForm.specialRequests || ""}
                    onChange={(e) => setEditForm({ ...editForm, specialRequests: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingReservation(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gold-500 hover:bg-gold-600 text-black"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

