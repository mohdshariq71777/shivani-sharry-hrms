const multer = require('multer')
const path = require('path')
const maxSize = 50*1000*1000;
var relPath="D:/shivaniWorkSpace/shivani-sharry-hrms-main/api/assest";
var date = new Date();
var fs1 = require('fs-extra');
// var storageFile = multer.diskStorage({
    
//     dest: function (req, file, cb) {
//         console.log(req);
//         cb(null, 'public/product')
//     },
//     filename: function (req, file, cb) {
//         cb(null, 'product' + + Date.now() + path.extname(file.originalname))
//         console.log(cb);
//     }
// })

async function example(directory) {
    try {
      // console.log(directory,"Directory")
      await fs1.ensureDir(directory)
      //console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

    var storageFile = multer.diskStorage({
    destination: (req, file, cb) => {
        folder = relPath + "/product/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
 
       example(folder)
 
       cb(null, folder);
   },
   filename: (req, file, cb) => {           
           let arrSplit=file.originalname.split(".")
           let extension=arrSplit[arrSplit.length-1]?arrSplit[arrSplit.length-1]:"txt";
           filename =arrSplit[0]+"."+extension;
           cb(null, filename); 
   },
   onError : function(err, next) {
       console.log('error', err);
       next(err);
     }
    })
    module.exports = {
        upload :multer({ storage: storageFile,limits: { fileSize: maxSize }})

}
