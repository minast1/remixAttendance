import { Course, Level, Semester, Student } from "@prisma/client";
import { getSession } from "~/lib/session.server";
import { db } from "../lib/db.server";

export async function  getCoursesWithLecturers () {
    const data: Course[] = await db.course.findMany({
        orderBy : {id : 'desc'}
   });
    return data
}


export async function addNewCourse(formdata: Omit<Course, "id">) {
    const data: Course = await db.course.create({
        data: formdata
    });
    return data
}


export async function getCourse(id: string) {
    const data: Course | null = await db.course.findFirst({
        where: {
            id : id
        }
    })
    if (!data) {
        throw new Response("Not Found", {
            status:404
        })
    }
    return data 
}
type optionalId = {
    id?: string
    name: string
    code: string
    level: Level
    semester: Semester
}
export async function editCourse(formData: optionalId) {
    const data = await db.course.update({
        where: {
            id: formData.id
        },
        data: {
            name: formData.name,
            code: formData.code,
            semester: formData.semester,
            level: formData.level
        }
    });
    return data
}

export async function deleteCourse(Id: string) {
    const data = await db.course.delete({
        where: {
            id: Id
        }
    })
}

export async function getCoursesByLevel(session:any) {
     //const session = await getSession(request.headers.get("cookie"));
    //const stdSession = session.data.user.session;
    const student = await db.student.findFirst({
        where: { id: session.id },
        include: {
            courses: {
                include: {
                    lecturers: {
                        where: {
                    session : session.session
                }} , attendances : true
            }
        }}
    })
    if (!student) {
        throw new Response("Not Found", {
            status:404
        })
    }
    const courses = await db.course.findMany({
        where: {
            level: student?.level
        }
    })

    
    return { courses, student };
};