import { Student, Course, Prisma } from '@prisma/client';
import { db } from '~/lib/db.server';
import { getSession } from '~/lib/session.server';



export const getStudentByIndexNumber = async (id: string) => {
    
    const student = await db.student.findFirst({
        where: { indexnumber: id }
    });
    if (!student) {
         return null 
    }
    return student;
}

export const createNewStudent = async (studentData: Omit<Student, "id" | "createdAt">) => {
    const studentExists = await db.student.findFirst({where: {indexnumber : studentData.indexnumber}})
    if (studentExists) {
        throw new Error("Index Number already exists")
    }
    const newStudent = await db.student.create({
        data: studentData
    });
    return newStudent
}

export const loginStudent = async (id: any) => {

    const student = await db.student.findFirst({
        where: { indexnumber: id }
    });
    if (!student) {
        throw new Error("Index Number is Invalid")
    }
    return student
};


export const addStudentCourses = async (ids: string[], request: Request) => {
    const session = await getSession(request.headers.get("cookie"));
    const studentId = session.data.user.id;
    const courses2 = ids.map((id:string) => {
        return { id: id }
    })
   
    const user = await db.student.update({
        where: {
            id: studentId
        },
        data: {
            courses: {
                connect: courses2
            }
        },
       
    });
    
    
    return user

}

