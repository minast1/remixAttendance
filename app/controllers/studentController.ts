import { Student, Course } from '@prisma/client';
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
        where: { indexnumber: id },
        select: {id : true}
    });
    if (!student) {
        throw new Error("Index Number is Invalid")
    }
    return student
};


export const addStudentCourses = async (ids: string[], request: Request) => {
    const session = await getSession(request.headers.get("cookie"));
    const studentId = session.data.user.id;

    const courses  = await Promise.all(ids.map(async (courseId) => {
        const course =  await db.course.findFirst({
            where: { id: courseId },
            select : {id : true}
        });
        if (!course) {
              throw new Response("Not Found", {
            status:404
        })
        }
        return course 
    }));

    const user = await db.student.update({
        where: {
            id: studentId
        },
        data: {
            courses: {
                connect: courses
            }
        },
        include: { courses: true }
    });

    return user

}

