import { create } from 'zustand'
import { Place } from '@/interfaces'

interface HotelState {
  hotel: Place
  setHotel: (hotel: Place) => void
}

export const useHotelStore = create<HotelState>()(set => ({
  hotel: {} as Place,
  setHotel: hotel => set({ hotel })
}))
