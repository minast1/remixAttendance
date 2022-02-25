import { Admin, Lecturer,Student,Session, Group, Level} from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/lib/session.server";
import { FormStrategy } from "remix-auth-form";
import { db } from "~/lib/db.server";
import bcrypt from 'bcrypt'
import { createNewStudent, loginStudent } from "~/controllers/studentController";
import { serializeFormData } from '~/lib/constants';
import { withZod } from "@remix-validated-form/with-zod";
import { studentSignUpValidator } from '~/lib/constants';



export const  authenticator = new Authenticator<Lecturer | StudentSessionId | Admin>(sessionStorage,
    { throwOnError: true });



type Credentials = {
    email: any
    password: any
}

type StudentSessionId = Pick<Student, "id">;

const loginLecturer = async (credentials: Credentials) => {
    const saltRounds = 10;
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(credentials.password, salt);
    const lecturer = await db.lecturer.findFirst({
        where: { email: credentials.email },
    });

    if (!lecturer) {
        throw new Response("Invalid Credentials", {
            status: 404
        })
    }
    const crosscheckPassword = await bcrypt.compareSync(credentials.password, lecturer.password);

    if (crosscheckPassword) {
        return lecturer
    } else {
        throw new Response("Password is Invalid", { status: 404 })
    }
};

const loginAdmin = async (credentials:Credentials) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(credentials.password, salt);
    const admin = await db.admin.upsert({
        where: { email: credentials.email },
        update: {},
        create: {
            email: credentials.email, 
            password : hash
        }
    });
    
   return  admin
}


authenticator.use(
    new FormStrategy(async ({ form }) => {
        const formData: Omit<Student, "id" | "createdAt"> = serializeFormData(form);
        
        const student = formData.name ?  await createNewStudent(formData) :  await loginStudent(formData.indexnumber)
        return  student 
    }),
    
    "student"
);

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let email = form.get("email");
        let password = form.get("password");
        let lecturer: Lecturer = await loginLecturer({ email, password })
        return lecturer
    }),
    "lecturer"
);

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let email = form.get("email");
        let password = form.get("password");
        let admin: Admin = await loginAdmin({ email, password })
        return admin
    }),
    "admin"
);






    