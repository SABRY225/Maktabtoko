// const User = require('../model/User');
const Admin = require('../model/Admin');
const Product = require('../model/Product');
const Requsting = require('../model/Requsting');
const Order = require('../model/Order');
const Commint = require('../model/commint');

// Register a new admin
const registerAdmin = async (req, res, next) => {
    const {permissions,definthome, username, phoneadmin,governorate, city, address, email, password } = req.body;
    const avatar = req.file.originalname
    try {
        
        const admin = new Admin({ permissions,definthome, username, phoneadmin,governorate, city, address, avatar, email, password});
        await admin.save();
        res.render('finsh');
        console.log(req);
    } catch (error) {
        next(error);
    }
};
// create a new Product
const createProduct = async (req, res, next) => {
    const {name,price} = req.body;
    const idname=req.body.idadmin.toString()
    const avatar = req.file.originalname

    try {
        const p =  new Product({ idname,avatar,name,price});
        await p.save();
        res.render('finsh')
        console.log(req);
    } catch (error) {
        next(error);
    }
};
// create a new order print
const createRequsting = async (req, res, next) => {
    const {name,phone,massage} = req.body;
    const idname=req.params.id 
    const filepdf = req.file.originalname

    try {
        const R =  new Requsting({ idname,name,phone,filepdf,massage});
        await R.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new order other
const createRequsting_2 = async (req, res, next) => {
    const {nameOrder,phoneOrder,massageOrder} = req.body;
    const idname=req.params.id 
     console.log(req);

    try {
        const order =  new Order({ idname,nameOrder,phoneOrder,massageOrder});
        await order.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new commint
const createRequsting_3 = async (req, res, next) => {
    const {namecommint,massagecommint} = req.body;
    const idname=req.params.id 
    console.log(req);

    try {
        const commint =  new Commint({ idname,namecommint,massagecommint});
        await commint.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a search bar
const searchbar = async (req, res, next) => {
    const {searchname} = req.body;
    const admin = await Admin.find({ username:searchname });
    console.log(searchname);

    if(admin.length > 0){
        res.render("search",{admin:admin});
        console.log('1');
    }else{
        res.render("nosearch",{searchname});
        console.log('0');

    }
};
const nopermissions=async (req, res, next) => {
    const ID = req.body.permissions;
    try {
        await Admin.updateOne({ _id: ID }, { $set: { permissions: 0 } });
        res.render('finsh')
    } catch (err) {
        console.log(err);
    }
};
const permissions=async (req, res, next) => {
    const ID = req.body.permissions;
    try {
        await Admin.updateOne({ _id: ID }, { $set: { permissions: 1 } });
        res.render('finsh')
    } catch (err) {
        console.log(err);
    }
};
const deleteproduct=async (req, res, next) => {
    const ID = req.body.idproduct;
    try {
        await Product.deleteOne({ _id: ID })
        res.render('finsh');
        console.log(req);
    } catch (error) {
        next(error);
    }

};

// Login with an existing user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            const passwordMatch = admin.password;
            if (passwordMatch != password) {
            return res.render("login");
            }else{  
                    if(admin.permissions===0){
                        res.render("permissions")
                    }else{
                        const product = await Product.find({ idname:admin.id })
                        const requsting = await Requsting.find({ idname:admin.id })
                        const order = await Order.find({ idname:admin.id })
                        if(admin.definthome==="مكتبة"){ 
                            res.render("admindeshbord",{adminuser: admin.username,imgadmin:admin.avatar,idadmin:admin.id,product:product,requsting:requsting,order:order});    
                        }else{
                            res.render("admindeshbord_2",{adminuser: admin.username,imgadmin:admin.avatar,idadmin:admin.id,product:product,order:order});                        
                        }
                    }  
            }
        }else if(email==="maktabtoko@gmail.com" && password==="maktabtoko@#$/*-456"){
            const allAdmin=await Admin.find()
            console.log(allAdmin);
            res.render("maktabtokodeshbord",{allAdmin :allAdmin});    

        }
        else {
            res.render("error"); 
        }        
    } catch (error) {
        next(error);
    }
};


module.exports = { registerAdmin, login ,createProduct,createRequsting,createRequsting_2,createRequsting_3,searchbar,nopermissions,permissions,deleteproduct};