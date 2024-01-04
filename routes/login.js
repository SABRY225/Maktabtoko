var express = require('express');
var router = express.Router();
// const Product = require('../model/Product');
const { login , createProduct,nopermissions,permissions,deleteproduct} = require('../controllers/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images/product');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', login);

router.post('/requsting', upload.single('avatar'),createProduct);
router.post('/deleting',deleteproduct);

router.post('/nopermissions',nopermissions);
router.post('/permissions',permissions);

module.exports = router;
