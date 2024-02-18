
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
//         message: "success"
//     })
//     });  
// }
module.exports = {
    addGroupCategory: async (req, res) => {
        let group_category_name = req.body.group_category_name;
        let isActive = req.body.is_active;
        console.log(isActive)
        const insertUserQuery = `INSERT INTO product_group_category (group_category_name,is_active) VALUES ('${group_category_name}','${isActive ? 1 : 0}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: err });
            }
            res.status(200).json({
                status: 200,
                message: "Group category added successfully!"
            })
        });
    },
    getActiveGroupCategory: async (req, res) => {
        const query = `Select * from product_group_category where is_active=1;`;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            console.log(result)
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getAllGroupCategory: async (req, res) => {
        const query = `Select * from product_group_category;`;
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
    addTypeCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_name = req.body.type_category_name
        let isActive = req.body.is_active;
        const insertUserQuery = `INSERT INTO product_type_category (group_category_id,type_category_name,is_active) VALUES (${group_category_id},'${type_category_name}','${isActive ? 1 : 0}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating category group' });
            }
            res.status(200).json({
                status: 200,
                message: "Type category added successfully!"
            })
        });
    },
    getAllTypeCategory: async (req, res) => {
        const query = `select ptc.type_category_name,ptc.is_active,pgc.group_category_name from product_type_category ptc
        left join product_group_category pgc on ptc.group_category_id=pgc.group_category_id;`;
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
        let grpCat = req.body.grp_cat_id;
        const query = `select * from product_type_category where is_active=1 and group_category_id='${grpCat}' `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            console.log(grpCat)
            console.log(result)
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    addCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_id = req.body.type_category_id
        let category_name = req.body.category_name
        let isActive = req.body.is_active;
        const insertUserQuery = `INSERT INTO product_category (group_category_id,type_category_id,category_name,is_active) VALUES (${group_category_id},${type_category_id},'${category_name}','${isActive ? 1 : 0}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error creating category group' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getAllCategory: async (req, res) => {
        const query = `select pc.category_name,pc.is_active,ptc.type_category_name,pgc.group_category_name 
        from product_category pc
        left join product_type_category ptc on ptc.type_category_id=pc.type_category_id
        left join product_group_category pgc on pgc.group_category_id=ptc.group_category_id;`;
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
        let grpCat = req.body.grp_cat_id;
        let typeCat = req.body.type_cat_id;
        const query = `select * from product_category where is_active=1 and group_category_id='${grpCat}' and type_category_id='${typeCat}'`;
        db.query(query, (err, result) => {
            console.log(err)
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            console.log(grpCat)
            console.log(result)
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
}


// module.exports = { addGroupCategory, addTypeCategory, addCategory };
