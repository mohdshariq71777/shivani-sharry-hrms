const db = require('../dbconfig/database')
module.exports = {
    getGroupCategoryActiveProducts: async (req, res) => {
        const groupCategoryId = req.query.groupCatId;
        const typeCategoryId = req.query.typeCatId;
        const insertUserQuery = `Select product_name,brand_name,price,product_id from products where  group_category_id='${groupCategoryId}' and type_category_id='${typeCategoryId}' and is_active='1';`;
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
    },
    getProductByMapping: async (req, res) => {
        const groupCategoryId = req.query.groupCatId;
        const typeCategoryId = req.query.typeCatId;
        const categoryId = req.query.catId;
        const insertUserQuery = `Select product_name,brand_name,price from products where  group_category_id='${groupCategoryId}' and type_category_id='${typeCategoryId}' and category_id='${categoryId}' and is_active='1';`;
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
    },
    getActiveGroupCategory: async (req, res) => {
        const query = `Select group_category_name,group_category_id from product_group_category where is_active=1;`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getActiveTypeCategory: async (req, res) => {
        let grpCat = req.query.grp_cat_id;
        // const query = `select type_category_id,type_category_name from product_type_category where is_active=1 and group_category_id='${grpCat}' `;
        const query = `SELECT 
        ptc.type_category_id,
        ptc.type_category_name,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'category_id', pc.category_id,
                'category_name', pc.category_name
            )
        ) AS categories
    FROM 
        product_type_category ptc
    LEFT JOIN 
        product_category pc ON ptc.type_category_id = pc.type_category_id
    WHERE
        ptc.group_category_id = ${grpCat}
        AND pc.category_id IS NOT NULL
    GROUP BY 
        ptc.type_category_id, ptc.type_category_name;`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getActiveCategory: async (req, res) => {
        let grpCat = req.query.grp_cat_id;
        let typeCat = req.query.type_cat_id;
        const query = `select category_name,category_id from product_category where is_active=1 and group_category_id='${grpCat}' and type_category_id='${typeCat}'`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getActiveProducts: async (req, res) => {
        let grpCat = req.query.grp_cat_id;
        let typeCat = req.query.type_cat_id;
        let catId = req.query.cat_id;
        // const query = `select category_name,category_id from product_category where is_active=1 and group_category_id='${grpCat}' and type_category_id='${typeCat}'`;
        const query = `Select product_name,brand_name,price,product_id from products where group_category_id='${grpCat}' and type_category_id='${typeCat}' and category_id='${catId}' and is_active='1'`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            console.log(result);
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getActiveProductById: async (req, res) => {
        let productId = req.query.product_id;
        const query = `Select product_name,price,brand_name from products where product_id='${productId}' and is_active='1'`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            console.log(result);
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "success"
            })
        });
    },
}
