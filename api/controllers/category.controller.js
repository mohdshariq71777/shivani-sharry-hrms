
const db = require('../dbconfig/database')

const addGroupCategory = (req, res) => {
    let group_category_name = req.body.group_category_name
    console.log("group_category_name", group_category_name);

    const insertUserQuery = `INSERT INTO product_group_category (group_category_name) VALUES ('${group_category_name}')`;
    db.query(insertUserQuery, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating category group' });
      }
      console.log('Insert successful. Inserted ID:', result);

      res.status(200).json({
        status: "200",
        result: result,
        massage: "success"
    })
    }
    );

   
    // let strSQL = `insert into product_group_category (group_category_name) values('${group_category_name}')`;
    // console.log("strSQL",strSQL);
    // db.query(strSQL, (err, result) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Error creating user' });
    //     }
    //     console.log(result);
    //     if (result.rows.length > 0) {
    //         res.status(200).json({
    //             status: "200",
    //             result: result,
    //             massage: "success"
    //         })
    //     }
    // }
    // )
}
const addTypeCategory = (req, res) => {

}
const addCategory = (req, res) => {

};



module.exports = { addGroupCategory, addTypeCategory, addCategory };
