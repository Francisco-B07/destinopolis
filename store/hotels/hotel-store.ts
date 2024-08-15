import { create } from 'zustand'
import { Hotel, Place } from '@/interfaces'

interface HotelState {
  hotel: Hotel
  setHotel: (hotel: Hotel) => void
}

export const useHotelStore = create<HotelState>()(set => ({
  hotel: {} as Hotel,
  setHotel: hotel => set({ hotel })
}))
