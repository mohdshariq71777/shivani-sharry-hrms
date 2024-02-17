
const db = require('../dbconfig/database')
const XLSX = require('xlsx');
module.exports = {
    addProduct: async (req, res) => {
        console.log("ss", req.body);
        let group_category_id = req.body.group_category_id
        let type_category_id = req.body.type_category_id
        let category_id = req.body.category_id
        let product_name = req.body.product_name
        let description = req.body.description
        let price = req.body.product_price

        const insertUserQuery = `INSERT INTO products (group_category_id,type_category_id,category_id,product_name,product_description,price) VALUES (${group_category_id},${type_category_id},${category_id},'${product_name}','${description}','${price}')`;
        console.log(insertUserQuery);
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error adding product' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    addExcelProduct: async (req, res) => {
        const workbook = XLSX.readFile(req.file.path);
        const sheet_namelist = workbook.SheetNames;
        var x = 0;
        sheet_namelist.forEach(element => {
            const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
            excelProduct.insertMany(xlData, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
            x++;
        });
        res.redirect('/');
    },
    addProductImages: async (req, res) => {
        console.log(req);
        // let url = `/${req.file.destination}/${req.file.filename}`
        // console.log(url);
        let product_id = req.body.product_id
        const insertUserQuery = `INSERT INTO product_images (product_id,file_name,file_path) VALUES (${product_id},'${req.file.filename}','${req.file.destination}')`;
        console.log(insertUserQuery);
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error adding product image' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getAllProducts: async (req, res) => {
        const insertUserQuery = `Select group_category_id,type_category_id,category_id,product_name,product_description,price from products`;
        console.log(insertUserQuery);
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error adding product' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getAllActiveProducts: async (req, res) => {
        const insertUserQuery = `
        select ps.product_name,ps.price,ps.product_description,ps.updated_date,ps.created_date,pc.category_name,ptc.type_category_name,pgc.group_category_name from products ps
        left join product_category pc on pc.category_id=ps.category_id
        left join product_type_category ptc on ptc.type_category_id=ps.type_category_id
        left join product_group_category pgc on pgc.group_category_id=ps.group_category_id;
        `;
        console.log(insertUserQuery);
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error adding product' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
};
