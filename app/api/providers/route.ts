import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

interface GeoLocation {
  lat: number
  lng: number
}

interface GeoResult {
  geometry: {
    location: GeoLocation
  }
}

interface GeoResponse {
  results: GeoResult[]
}

interface Place {
  name: string
}

interface PlacesResponse {
  results: Place[]
}

export async function GET(req: NextRequest): Promise<NextResponse<string[]>> {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get("address")
  const type = searchParams.get("utility")

  const geo = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_PLACES_API_KEY}`
  ).then((r) => r.json() as Promise<GeoResponse>)

  const { lat, lng } = geo.results[0].geometry.location

  const places = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&keyword=${type}&radius=50000&key=${process.env.GOOGLE_PLACES_API_KEY}`
  ).then((r) => r.json() as Promise<PlacesResponse>)

  return NextResponse.json(
    places.results.map((p) => p.name)
  )
}