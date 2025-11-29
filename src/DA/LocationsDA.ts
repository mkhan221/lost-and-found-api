import { pool } from "../db/db";
import { Location } from "../models/Location";

export class LocationsDA
{
    // CREATE
    static async create(location: Location): Promise<number>
    {
        const query = `SELECT fnCreateLocations($1, $2, $3) AS id;`;
        const values = [location.qrcodeid || null, location.buildingname, location.description || null];
        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    // READ
    static async read(locationId: number): Promise<Location | null>
    {
        const query = `SELECT * FROM fnReadLocations($1);`;
        const result = await pool.query(query, [locationId]);
        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    // UPDATE
    static async update(location: Location): Promise<void>
    {
        const query = `SELECT fnUpdateLocations($1, $2, $3, $4);`;
        const values = [location.locationid, location.qrcodeid || null, location.buildingname, location.description || null];
        await pool.query(query, values);
    }

    // DELETE
    static async delete(locationId: number): Promise<void>
    {
        const query = `SELECT fnDeleteLocations($1);`;
        await pool.query(query, [locationId]);
    }

    // GET ALL
    static async getAll(): Promise<Location[]>
    {
        const query = `SELECT * FROM fnGetAllLocations();`;
        const result = await pool.query(query);
        return result.rows;
    }
}
