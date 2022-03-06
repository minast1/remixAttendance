import { Attendance, Student } from '@prisma/client'
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



export type AttendanceWithStudentsType = (Attendance & {
  students: {
    signedAt: Date
    student: Student
  }[]
})  



type AttendanceStoreState = {
  attendances: AttendanceWithStudentsType[] | [] ;
  updateList: (attendance: AttendanceWithStudentsType)  => void
}

export const useAttendanceStore = create<AttendanceStoreState>(persist(
  (set, get) => ({
    attendances: [],
    updateList: (attendance) => set({attendances : [...get().attendances, attendance]})
  }),
  {
    name: "global_attendance", // name of item in the storage (must be unique)
    getStorage: () => localStorage   // (optional) by default the 'localStorage' is used
  }
))