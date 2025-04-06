const sql = require("../config/db.js")

const getAllMeals = async (_,res)=>{
    try {
        const meals = await sql`SELECT items, description, availability, price, nutrition_percentage FROM meals`
        
        return res.status(200).json({meals: meals})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
}

const placeOrder = async (req, res) => {
    try {
        const { roll_no, items, portion, price } = req.body; // items are meal names, portion is a list of text values (e.g., "small", "medium")

        // Validate input
        if (!roll_no || !Array.isArray(items) || !Array.isArray(portion) || typeof price !== "number") {
            return res.status(400).json({ error: "Invalid input data" });
        }

        // Fetch meal IDs for the given item names
        const mealIds = await Promise.all(
            items.map(async (item) => {
                const [meal] = await sql`
                    SELECT meal_id FROM meals WHERE items = ${item}
                `;
                if (!meal) {
                    throw new Error(`Meal not found: ${item}`);
                }
                return meal.meal_id;
            })
        );

        // Insert into the `orders` table
        const [order] = await sql`
            INSERT INTO orders (roll_number, order_datetime, total_price)
            VALUES (${roll_no}, NOW(), ${price})
            RETURNING order_id
        `;

        const orderId = order.order_id;

        // Insert into the `order_items` table
        for (let i = 0; i < mealIds.length; i++) {
            await sql`
                INSERT INTO order_items (order_id, meal_id, portion_size)
                VALUES (${orderId}, ${mealIds[i]}, ${portion[i]})
            `;
        }

        return res.status(201).json({ message: "Order placed successfully", orderId: orderId });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message || error });
    }
};

module.exports = {
    getAllMeals,
    placeOrder
}