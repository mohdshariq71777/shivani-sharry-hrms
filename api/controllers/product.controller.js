const db = require('../dbconfig/database')
module.exports = {
    getGroupCategoryActiveProducts: async (req, res) => {
        const groupCategoryId = req.query.groupCatId;
        const typeCategoryId = req.query.typeCatId;
        const insertUserQuery = `Select product_name,brand_name,price from products where  group_category_id='${groupCategoryId}' and type_category_id='${typeCategoryId}' and is_active='1';`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching products' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    }
}
