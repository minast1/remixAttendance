import { Lecturer, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt'
import { Session } from 'remix';
import { db } from '~/lib/db.server';
import { getSession } from '~/lib/session.server';


type Credentials = {
    email: string
    password: string
}


export const loginLecturer = async (credentials: Credentials) => {
    
    const lecturer = await db.lecturer.findFirst({
        where: { email: credentials.email },
         include: {
            course: {
                include: {
                    students: true,
                    attendances: {
                        where: {
                            createdAt : new Date()
                        },
                        include: {
                            students : true 
                        }
                    }
                }
            }
        }
    });

    if (!lecturer) {
        throw new Error("Invalid Credentials")
    }
    const crosscheckPassword = await bcrypt.compareSync(credentials.password, lecturer.password);

    if (crosscheckPassword) {
        const { password, ...rest } = lecturer;
        return rest
    } else {
        throw new Error("Password is Invalid")
    }
};



export const getLecturerWithEmail = async (email: string) => {
    return await db.lecturer.findFirst({
        where: { email: email }
    });
    
}

type lecturerFormData =  Omit<Lecturer, "id" | "createdAt">
export const registerNewLecturer =async (formData: lecturerFormData) => {
       const emailExists = await getLecturerWithEmail(formData.email)
    if (emailExists) {
        throw new Error("This email already exists")
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(formData.password, salt);
    const newLecturer = await db.lecturer.create({
        data: {
            name: formData.name,
            email: formData.email,
            session: formData.session,
            password: hash,
            courseId: formData.courseId

        }, include: {
            course: {
                include: {
                    students: true,
                    attendances: {
                        where: {
                            createdAt : new Date()
                        },
                        include: {
                            students : true 
                        }
                    }
                }
            }
        }
    });
    const { password, ...rest } = newLecturer;
    return rest
}

export type lecturerSessionData = Prisma.PromiseReturnType<typeof registerNewLecturer>

export const getSessionLecturerWithInfo = async (Id:string) => {
     
    const lect = await db.lecturer.findFirst({
        where: {
            id : Id
        },
        include: {
            course: {
                include: {
                    students: true,
                    attendances: {
                        where: {
                            createdAt : new Date()
                        },
                        include: {
                            students : true 
                        }
                    }
                }
            }
        }
    });
    if(!lect) throw new Error("Lecturer does not exist")
    return lect;
}

export type lecturerWithInfo = Prisma.PromiseReturnType<typeof getSessionLecturerWithInfo>
