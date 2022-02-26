import create from 'zustand'


type StudentStore = {
  
    courseSelectoToggle: boolean
    setToggle: (to: boolean) => void   
}

export const useStudentStore = create<StudentStore>(set => ({
  
    courseSelectoToggle: false,
    setToggle: (to) => set((state => ({ courseSelectoToggle: to }))),
   
}))