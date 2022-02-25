import { Course, Student } from "@prisma/client"
import create from 'zustand'

type StudentStore = {
    user: (Student & {
    courses: Course[];
}) | null
    courses: Course[] | []
    courseSelectoToggle: boolean
    setToggle: (to: boolean) => void
    error: string | undefined
    setError: (to: string) => void
    setCourses: (to: Course[]) => void 
    setUser: (to:Student & {
    courses: Course[];
}| null) => void
   
    
}
// And it is going to work for both
export const useStudentStore = create<StudentStore>(set => ({
    user: null,
    courses: [],
    error: undefined,
    setError: (to) => set((state => ({error: to}))),
    courseSelectoToggle: false,
    setToggle: (to) => set((state => ({ courseSelectoToggle: to }))),
    setCourses: (to) => set((state => ({ courses: to }))),
    setUser:  (to) => set((state => ({user:  to})))
}))