const db = require('../../dbconfig/database');
module.exports = {
    addGroupCategory: async (req, res) => {
        let group_category_name = req.body.group_category_name;
        let isActive = req.body.is_active;
        const insertUserQuery = `INSERT INTO product_group_category (group_category_name,is_active) VALUES ('${group_category_name}','${isActive ? 1 : 0}')`;
        db.query(insertUserQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({
                status: 200,
                message: "Group category added successfully!"
            })
        });
    },
    getActiveGroupCategories: async (req, res) => {
        const query = `Select * from product_group_category where is_active=1;`;
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
    getAllGroupCategories: async (req, res) => {
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
    getFilteredGroupCategories: async (req, res) => {
        const fromDate = req.query.from_date;
        const toDate = req.query.to_date;
        const isActive = req.query.is_active;

        const fromDateNotNull = fromDate != '0';
        const toDateNotNull = toDate != '0';
        const isActiveNotNull = isActive != -1;
        const query = `Select * from product_group_category
        ${fromDateNotNull || toDateNotNull || isActiveNotNull ? 'where' : ''} 
        ${fromDateNotNull ? `Date(created_date)>='${fromDate}'` : ''}  
        ${fromDateNotNull && toDateNotNull ? `and` : ''}  
        ${toDateNotNull ? `Date(created_date)<= '${toDate}'` : ''}
        ${(fromDateNotNull || toDateNotNull) && isActiveNotNull ? `and` : ''}  
        ${isActiveNotNull ? `is_active = '${isActive}'` : ''}
        ; `;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    getGroupCategoryById: async (req, res) => {
        console.log(req.params.id);
        const query = `Select group_category_id, group_category_name, is_active from product_group_category where group_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Group Category fetched successfully"
            })
        });
    },
    updateGroupCategory: async (req, res) => {
        console.log(req.params.id);
        console.log(req.body)
        console.log(req.body.is_active == true ? 1 : 0);
        const query = `Update product_group_category set group_category_name = '${req.body.group_category_name}', is_active = '${req.body.is_active == true ? 1 : 0}' where group_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Group Category updated successfully"
            })
        });
    },
    deleteGroupCategory: async (req, res) => {
        const query = `Delete from product_group_category where group_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(204).end();
        });
    },
    addTypeCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_name = req.body.type_category_name
        let isActive = req.body.is_active;
        const insertUserQuery = `INSERT INTO product_type_category(group_category_id, type_category_name, is_active) VALUES(${group_category_id}, '${type_category_name}', '${isActive ? 1 : 0}')`;
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
    getAllTypeCategories: async (req, res) => {
        const query = `select ptc.*, pgc.group_category_name from product_type_category ptc
        left join product_group_category pgc on ptc.group_category_id = pgc.group_category_id; `;
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
    getFilteredTypeCategories: async (req, res) => {
        const grpCatId = req.query.grp_cat_id;
        const fromDate = req.query.from_date;
        const toDate = req.query.to_date;
        const isActive = req.query.is_active;
        console.log('grpCatId :' + grpCatId);
        console.log('fromDate :' + fromDate);
        console.log('toDate :' + toDate);
        console.log('isActive :' + isActive);
        const fromDateNotNull = fromDate != '0';
        const grpCatIdNotNull = grpCatId != '0';
        const toDateNotNull = toDate != '0';
        const isActiveNotNull = isActive != -1;
        const query = `
    Select tc.*, gc.group_category_name from product_type_category tc left join product_group_category gc on tc.group_category_id = gc.group_category_id ${grpCatIdNotNull || fromDateNotNull || toDateNotNull || isActiveNotNull ? 'where' : ''}
    ${fromDateNotNull ? ` Date(tc.created_date)>='${fromDate}'` : ''}
    ${fromDateNotNull && toDateNotNull ? 'and' : ''}
    ${toDateNotNull ? ` Date(tc.created_date)<='${toDate}'` : ''}
    ${(fromDateNotNull || toDateNotNull) && grpCatIdNotNull ? 'and' : ''}
    ${grpCatIdNotNull ? ` tc.group_category_id='${grpCatId}'` : ''}
    ${(grpCatIdNotNull || fromDateNotNull || toDateNotNull) && isActiveNotNull ? 'and' : ''}
    ${isActiveNotNull ? `tc.is_active='${isActive}'` : ''}; `;
        console.log('query 1234' + query);
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },

    getActiveTypeCategories: async (req, res) => {
        let grpCat = req.query.grp_cat_id;
        const query = `select type_category_id, type_category_name from product_type_category where is_active = 1 and group_category_id = '${grpCat}' `;
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
    getTypeCategoryById: async (req, res) => {
        console.log(req.params.id);
        const query = `Select group_category_id, type_category_name, is_active, type_category_id from product_type_category where type_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Group Category fetched successfully"
            })
        });
    },
    updateTypeCategory: async (req, res) => {
        console.log(req.params.id);
        console.log(req.body)
        console.log(req.body.is_active == true ? 1 : 0);
        const query = `Update product_type_category set type_category_name = '${req.body.type_category_name}', is_active = '${req.body.is_active == true ? 1 : 0}', group_category_id = ${req.body.group_category_id} where type_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Type Category updated successfully"
            })
        });
    },
    deleteTypeCategory: async (req, res) => {
        const query = `Delete from product_type_category where type_category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(204).end();
        });
    },
    addCategory: async (req, res) => {
        let group_category_id = req.body.group_category_id
        let type_category_id = req.body.type_category_id
        let category_name = req.body.category_name
        let isActive = req.body.is_active;
        const insertUserQuery = `INSERT INTO product_category(group_category_id, type_category_id, category_name, is_active) VALUES(${group_category_id}, ${type_category_id}, '${category_name}', '${isActive ? 1 : 0}')`;
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
    getAllCategories: async (req, res) => {
        const query = `Select pc.*, tc.type_category_name, gc.group_category_name from product_category pc left join product_type_category tc on pc.type_category_id = tc.type_category_id left join product_group_category gc on gc.group_category_id = tc.group_category_id; `;
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
    getFilteredCategories: async (req, res) => {
        const grpCatId = req.query.grp_cat_id;
        const typeCatId = req.query.type_cat_id;
        const fromDate = req.query.from_date;
        const toDate = req.query.to_date;
        const isActive = req.query.is_active;

        const grpCatIdNotNull = grpCatId != '0';
        const typeCatIdNotNull = typeCatId != '0';
        const fromDateNotNull = fromDate != '0';
        const toDateNotNull = toDate != '0';
        const isActiveNotNull = isActive != -1;

        const query = `Select pc.*, tc.type_category_name, gc.group_category_name from product_category pc left join product_type_category tc on pc.type_category_id = tc.type_category_id left join product_group_category gc on gc.group_category_id = tc.group_category_id ${grpCatIdNotNull || typeCatIdNotNull || fromDateNotNull || toDateNotNull || isActiveNotNull ? 'where' : ''}  ${grpCatIdNotNull ? `pc.group_category_id='${grpCatId}'` : ''} ${typeCatIdNotNull ? `and pc.type_category_id='${typeCatId}'` : ''} ${fromDateNotNull ? `and Date(pc.created_date)>='${fromDate}'` : ''} ${toDateNotNull ? `and Date(pc.created_date)<='${toDate}'` : ''} ${(grpCatIdNotNull || typeCatIdNotNull || fromDateNotNull || toDateNotNull) && isActiveNotNull ? 'and' : ''} ${isActiveNotNull ? `pc.is_active ='${isActive}'` : ''}; `;
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
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
    getCategoryById: async (req, res) => {
        console.log(req.params.id);
        const query = `Select category_id, category_name, is_active, group_category_id, type_category_id from product_category where category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Group Category fetched successfully"
            })
        });
    },
    getActiveCategories: async (req, res) => {
        let grpCat = req.query.grp_cat_id;
        let typeCat = req.query.type_cat_id;
        const query = `select category_name, category_id from product_category where is_active = 1 and group_category_id = '${grpCat}' and type_category_id = '${typeCat}'`;
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result,
                message: "success"
            })
        });
    },
    updateCategory: async (req, res) => {
        const query = `Update product_category set type_category_id = '${req.body.type_category_id}', group_category_id = '${req.body.group_category_id}', is_active = '${req.body.is_active == true ? 1 : 0}', category_name = '${req.body.cat_name}' where category_id = '${req.params.id}'; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(200).json({
                status: 200,
                result: result[0],
                message: "Category updated successfully"
            })
        });
    },
    deleteCategory: async (req, res) => {
        const query = `Delete from product_category where category_id = ${req.params.id}; `;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error' });
            }
            res.status(204).end();
        });
    },
}