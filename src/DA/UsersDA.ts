import { pool } from "../db/db";
import { User } from "../models/User";

export class UsersDA
{
    static async create(user: User): Promise<number>
    {
        const query = `
            SELECT fnCreateUsers($1, $2, $3, $4, $5, $6) AS id
        `;
        const values = [
            user.firstname,
            user.lastname,
            user.usertype,
            user.email,
            user.password,
            user.phonenumber ?? null,
        ];

        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    static async getAll(): Promise<User[]>
    {
        const query = `SELECT * FROM fnGetAllUsers()`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async read(userid: number): Promise<User | null>
    {
        const query = `SELECT * FROM fnReadUsers($1)`;
        const result = await pool.query(query, [userid]);
        return result.rows[0] || null;
    }

    static async update(user: User): Promise<void>
    {
        if (!user.userid)
        {
            throw new Error("userid is required to update a user.");
        }

        const query = `
            SELECT * FROM fnUpdateUsers($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            user.userid,
            user.firstname,
            user.lastname,
            user.usertype,
            user.email,
            user.password,
            user.phonenumber ?? null,
        ];

        await pool.query(query, values);
    }

    static async delete(userid: number): Promise<void>
    {
        const query = `SELECT * FROM fnDeleteUsers($1)`;
        await pool.query(query, [userid]);
    }
}
