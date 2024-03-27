const db = require('../../dbconfig/database')
const XLSX = require('xlsx');
module.exports = {
    addProduct: async (req, res) => {
        let group_category_id = req.body.grpCatId
        let type_category_id = req.body.typeCatId
        let category_id = req.body.catId
        let product_name = req.body.productName
        let brand_name = req.body.brandName
        let price = req.body.price
        const insertUserQuery = `INSERT INTO products (group_category_id,type_category_id,category_id,product_name,brand_name,price) VALUES ('${group_category_id}','${type_category_id}','${category_id}','${product_name}','${brand_name}','${price}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                console.log(err);
                console.log('error', req.image);
                return res.status(500).json({ error: 'Error adding product' });
            }
            console.log(result.insertId);
            let product_id = result.insertId;
            for (let i = 0; i < req.files.length; i++) {
                const insertUserQuery = `INSERT INTO product_images (product_id,file_name,file_path) VALUES (${product_id},'${req.files[i].filename}','${req.files[i].destination}')`;
                db.query(insertUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error adding product image' });
                    }
                });
            }
            res.status(200).json({
                status: 200,
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
                } else {
                }
            })
            x++;
        });
        res.redirect('/');
    },
    addProductImages: async (req, res) => {
        // let url = `/${req.file.destination}/${req.file.filename}`
        let product_id = req.body.product_id
        // console.log(req.body);
        // const insertUserQuery = `INSERT INTO product_images (product_id,file_name,file_path) VALUES (${product_id},'${req.file.filename}','${req.file.destination}')`;
        // db.query(insertUserQuery, (err, result) => {
        //     if (err) {
        //         return res.status(500).json({ error: 'Error adding product image' });
        //     }
        //     res.status(200).json({
        //         status: 200,
        //         result: result,
        //         message: "success"
        //     })
        // });
    },
    getAllProducts: async (req, res) => {
        const insertUserQuery = `select ps.*,pc.category_name,ptc.type_category_name,pgc.group_category_name from products ps
        left join product_category pc on pc.category_id=ps.category_id
        left join product_type_category ptc on ptc.type_category_id=ps.type_category_id
        left join product_group_category pgc on pgc.group_category_id=ps.group_category_id;`;
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
    // getAllActiveProducts: async (req, res) => {
    //     const insertUserQuery = ``;
    //     db.query(insertUserQuery, (err, result) => {
    //         if (err) {
    //             return res.status(500).json({ error: 'Error adding product' });
    //         }
    //         res.status(200).json({
    //             status: 200,
    //             result: result,
    //             message: "success"
    //         })
    //     });
    // },
    getProductById: async (req, res) => {
        console.log(req.params.id);
        const insertUserQuery = `Select 
        json_arrayagg( 
        json_object( 
        'file_name',pi.file_name,
        'file_path',pi.file_path
        )
        ) as images,
        p.product_name,p.brand_name,p.price,p.product_id,p.category_id,p.group_category_id,p.type_category_id,p.is_active
        from
        product_images pi
        inner join
        products p
        on p.product_id=pi.product_id
        where p.product_id='${req.params.id}'
        group by p.product_id;`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error adding product' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "success"
            })
        });
    },
    deleteProduct: async (req, res) => {
        console.log(req.params.id);
        const insertUserQuery = `Delete from products where product_id='${req.params.id}';`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting product' });
            }
            res.status(204).end();
        });
    },

};
