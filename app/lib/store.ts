import create from 'zustand'


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