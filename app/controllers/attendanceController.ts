import { db } from "~/lib/db.server";
import type { lecturerSessionData } from "~/controllers/lecturerController";
import { Group, Lecturer, Level,Course } from "@prisma/client";
import cuid from 'cuid';

type LectureWithCourse =  Lecturer  & {course : Course}
type funcType = {
    user: LectureWithCourse
    group: Group
    date: string
}


export async function createAttendanceSheet(formData: funcType) {
    const date = new Date(formData.date);
    const year = date.getFullYear()
    const level = formData.user.course.level ;
    const session = formData.user.session;
    const group = formData.group;
    const courseId = formData.user.course.id 
    const id = cuid()
    const code = id.slice(-8);
    const sheet = db.attendance.create({
        data: {
            level: level,
            session: session,
            group: group,
            courseId: courseId,
            code: code,
            year: year
            
        }
    });
    return sheet;
}