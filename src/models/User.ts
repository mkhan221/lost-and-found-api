export interface User
{
    userid?: number; // optional for inserts
    firstname: string;
    lastname: string;
    usertype: "Student" | "Staff" | "Admin";
    email: string;
    password: string;
    phonenumber?: string | null;
}
