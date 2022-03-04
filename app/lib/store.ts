import create from 'zustand'
import { persist } from "zustand/middleware"


type StudentStore = {
  
    courseSelectoToggle: boolean
    setToggle: (to: boolean) => void   
}

type lecturerStore = {
     Toggle: boolean
    setToggle: (to: boolean) => void  
}
export const useStudentStore = create<StudentStore>(set => ({
  
    courseSelectoToggle: false,
    setToggle: (to) => set((state => ({ courseSelectoToggle: to }))),
   
}));

export const useLecturerStore = create<lecturerStore>(set => ({
  
    Toggle: false,
    setToggle: (to) => set((state => ({ Toggle: to }))),
   
}))

/*type AttendanceStore = {
    token: string
    setToken: (to:string) => void
}

export const useAttendanceStore = create<AttendanceStore>(persist(
  (set) => ({
    token: '',
    setToken: (to) => set({ token: to })
  }),
  {
    name: "attendance_code", // name of item in the storage (must be unique)
    getStorage: () => localForage as never  // (optional) by default the 'localStorage' is used
  }
))*/