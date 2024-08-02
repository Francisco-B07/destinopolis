export type ResTransit = {
  routes: [Route]
}

type Route = {
  id: string
  sections: [Section]
}

export type Section = {
  id: string
  type: string
  departure: Arrival
  arrival: Arrival
  transport?: Transport
  agency?: Agency
  attributions?: [Attribution]
}

type Agency = {
  id: string
  name: string
  website: string
}

type Arrival = {
  time: Date
  place: Place
}

type Place = {
  name?: string
  type: string
  location: Location
  id?: string
}

type Location = {
  lat: number
  lng: number
}

type Attribution = {
  id: string
  href: string
  text: string
  type: string
}

type Transport = {
  mode: string
  name: string
  category: string
  color: string
  textColor: string
  headsign: string
}
