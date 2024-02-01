
var express = require("express");
var cors = require("cors");
var router = express.Router();
var path = require("path");
var dealcontroller=require("../controller/dealRouter")
var {handleError}=require("../middleware/validation")
var multer = require("multer");
router.use(cors());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, "file" + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage })



router.post('/add', upload.array('Images'),handleError,dealcontroller.addDeal )
router.get('/data' ,dealcontroller.allData );
router.post('/gimage' ,dealcontroller.allImages );

module.exports={router}

