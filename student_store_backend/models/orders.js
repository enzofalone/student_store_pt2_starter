const db = require("../db");

class Order {

  static async listOrdersForUser(user) {
    // return all orders that the aunthenticated user has created
    const query = `
      SELECT orders.id AS orderId, users.id AS customerId, order_details.quantity AS quantity, products.name AS name, products.price AS price
      FROM 
        orders
      INNER JOIN 
        users 
      ON
        users.id = orders.customer_id
      INNER JOIN
        order_details
      ON
        order_details.order_id = orders.id
      INNER JOIN
        products
      ON
        order_details.product_id = products.id
      WHERE orders.customer_id = (SELECT users.id FROM users WHERE email = $1);
    `;

    const result = await db.query(query, [user.email.toLowerCase()]);
    console.log(result);
    return result.rows;
  }

  static async createOrder(user, order) {
    // return user's order and store it in database
    console.log("order", order)

    const query = `
      INSERT INTO orders (customer_id)
      VALUES((SELECT id FROM users WHERE email = $1))
      RETURNING id as "orderId";
      `;
    const result = await db.query(query, [user.email]);
    const orderId = result.rows[0].orderId;

    Object.keys(order).forEach(async (key) => {
      const productId = key;
      const quantity = order[key];

      const orderQuery = `
        INSERT INTO order_details (order_id, product_id, quantity)
        VALUES($1,$2,$3)
      `;

      const result = await db.query(orderQuery, [orderId, productId, quantity]);
    });


  }
}

module.exports = Order;
