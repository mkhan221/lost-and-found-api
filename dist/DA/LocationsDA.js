"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsDA = void 0;
const db_1 = require("../db/db");
class LocationsDA {
    // CREATE
    static async create(location) {
        const query = `SELECT fnCreateLocations($1, $2, $3) AS id;`;
        const values = [location.qrcodeid || null, location.buildingname, location.description || null];
        const result = await db_1.pool.query(query, values);
        return result.rows[0].id;
    }
    // READ
    static async read(locationId) {
        const query = `SELECT * FROM fnReadLocations($1);`;
        const result = await db_1.pool.query(query, [locationId]);
        if (result.rows.length === 0)
            return null;
        return result.rows[0];
    }
    // UPDATE
    static async update(location) {
        const query = `SELECT fnUpdateLocations($1, $2, $3, $4);`;
        const values = [location.locationid, location.qrcodeid || null, location.buildingname, location.description || null];
        await db_1.pool.query(query, values);
    }
    // DELETE
    static async delete(locationId) {
        const query = `SELECT fnDeleteLocations($1);`;
        await db_1.pool.query(query, [locationId]);
    }
    // GET ALL
    static async getAll() {
        const query = `SELECT * FROM fnGetAllLocations();`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
}
exports.LocationsDA = LocationsDA;
