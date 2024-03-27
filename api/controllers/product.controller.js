const db = require('../dbconfig/database')
module.exports = {
    getGroupCategoryActiveProducts: async (req, res) => {
        const groupCategoryId = req.query.groupCatId;
        const typeCategoryId = req.query.typeCatId;
        // const insertUserQuery = `Select pi.file_name,pi.file_path,p.product_name,p.brand_name,p.price,p.product_id,p.created_date from product_images pi inner join products p on p.product_id=pi.product_id where group_category_id='${groupCategoryId}' and type_category_id='${typeCategoryId}';`;
        const insertUserQuery = `Select 
        json_arrayagg( 
        json_object( 
        'file_name',pi.file_name,
        'file_path',pi.file_path
        )
        ) as images,
        p.product_name,p.brand_name,p.price,p.product_id
        from
        product_images pi
        left join
        products p
        on p.product_id=pi.product_id
        where group_category_id='${groupCategoryId}' and type_category_id='${typeCategoryId}' group by p.product_id;`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                console.log(err);
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
        // const query = `Select pi.file_name,pi.file_path, p.product_name,p.brand_name,p.price,p.product_id from product_images pi inner join products p on p.product_id=pi.product_id where p.group_category_id='${grpCat}' and p.type_category_id='${typeCat}' and p.category_id='${catId}';`;
        const query = `Select
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'file_name',pi.file_name,
            'file_path',pi.file_path
            )
        ) AS images, p.product_name,p.brand_name,p.price,p.product_id from product_images pi left join products p on p.product_id=pi.product_id where p.group_category_id='${grpCat}' and p.type_category_id='${typeCat}' and p.category_id='${catId}' group by p.product_id;`;

        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error' });
            }
            // console.log(result);
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getActiveProductById: async (req, res) => {
        let productId = req.query.product_id;
        const query = `Select 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'file_name',pi.file_name,
            'file_path',pi.file_path
            )
        ) AS images,p.product_name,p.price,p.brand_name from products as p left join 
            product_images as pi on p.product_id=pi.product_id where p.product_id='${productId}' and p.is_active='1' group by p.product_id`;

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
