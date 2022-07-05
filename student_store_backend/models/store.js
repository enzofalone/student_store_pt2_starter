const db = require('../db');

class Store {
    static async listProducts() {
        // return all products in the database
        const result = await db.query(`
            SELECT * FROM products
        `)

        return result.rows
    }
}

module.exports = Store