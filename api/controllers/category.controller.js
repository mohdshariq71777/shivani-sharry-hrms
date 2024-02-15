
const db = require('../dbconfig/database')

// const addGroupCategory = (req, res) => {
//     let group_category_name = req.body.group_category_name
//     const insertUserQuery = `INSERT INTO product_group_category (group_category_name) VALUES ('${group_category_name}')`;
//     db.query(insertUserQuery, (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error creating category group' });
//       }
//      res.status(200).json({
//         status: "200",
//         result: result,
//         massage: "success"
//     })
//     });  
// }
module.exports = {
    addGroupCategory: async (req, res) => {
        let group_category_name = req.body.group_category_name
        const insertUserQuery = `INSERT INTO product_group_category (group_category_name) VALUES ('${group_category_name}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating category group' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },
    getAllGroupCategory: async (req, res) => {
        const query = `select * from product_group_category `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },

    addTypeCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_name = req.body.type_category_name

        const insertUserQuery = `INSERT INTO product_type_category (group_category_id,type_category_name) VALUES (${group_category_id},'${type_category_name}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating category group' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },
    getAllTypeCategory: async (req, res) => {
        const query = `select * from product_type_category `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },
    addCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_id = req.body.type_category_id
        let category_name = req.body.category_name

        const insertUserQuery = `INSERT INTO product_category (group_category_id,type_category_id,category_name) VALUES (${group_category_id},${type_category_id},'${category_name}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating category group' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },
    getAllCategory: async (req, res) => {
        const query = `select * from product_category `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: "200",
                result: result,
                massage: "success"
            })
        });
    },
}


// module.exports = { addGroupCategory, addTypeCategory, addCategory };
