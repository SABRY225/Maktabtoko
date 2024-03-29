// const User = require('../model/User');
const Admin = require('../model/Admin');
const Product = require('../model/Product');
const Productacademic = require('../model/Productacademic');
const Productbuy = require('../model/Productbuy')
const Descrabtion=require('../model/descrabtionhome')
const Requsting = require('../model/Requsting');
const Order = require('../model/Order');
const Commint = require('../model/commint');
const Cardlib = require('../model/cardlib');
const CardAca = require('../model/cardaca');
const CardBuy = require('../model/cardbuy');
require('dotenv').config()

const {initializeApp}=require('firebase/app')
const { getStorage, ref, getDownloadURL, uploadBytesResumable ,uploadBytes}=require('firebase/storage')
// import {initializeApp} from "firebase/app"
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const {firebaseConfig}=require('../firebase/firedata')
// import config from "../firebase/firedata"
//Initialize a firebase application
const app=initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Register a new admin
const registerAdmin = async (req, res, next) => {
    const { permissions, definthome,deliveryservice, username, phoneadmin, governorate, city, address, email, password} = req.body;
    const currentDate = new Date();
    const dateregister =currentDate.toISOString().split('T')[0]
    let subdata
    let subenddate
    if (definthome === "مكتبة") {
        subdata=15
        currentDate.setDate(currentDate.getDate() + 15);
        subenddate =currentDate.toISOString().split('T')[0]
    }else{
        subdata=21
        currentDate.setDate(currentDate.getDate() + 21);
        subenddate =currentDate.toISOString().split('T')[0]
    }
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `admins/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const avatar = downloadURL
    try {
        const admin = new Admin({ permissions, definthome, username, phoneadmin, governorate, city, address, avatar, email, password ,dateregister,subdata,subenddate,deliveryservice});
        await admin.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new Product
const createProduct = async (req, res, next) => {
    const { name, beforprice,afterprice ,descrabationproduct } = req.body;
    const idname = req.body.idadmin.toString()
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `product/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const avatar = downloadURL
    try {
        const p = new Product({ idname, avatar, name, beforprice,afterprice ,descrabationproduct });
        await p.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a Productacademic
const createProductacademic = async (req, res, next) => {
    const { name ,
        typecourse ,
        descritioncourse ,
        beforprice ,
        afterprice ,
        desecribationcotach ,
        notdescriation} = req.body;
    const idname = req.body.idadmin.toString()
    
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `product/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const avatar = downloadURL

    try {
        const p = new Productacademic({ 
            idname, 
            avatar, 
            name,
            typecourse ,
            descritioncourse ,
            beforprice ,
            afterprice ,
            desecribationcotach ,
            notdescriation});
        await p.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a Productacademic
const createProductbuy = async (req, res, next) => {
    const { name ,
        beforprice ,
        afterprice ,
        desecribationcotach ,
        notdescriation} = req.body;
    const idname = req.body.idadmin.toString()
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `product/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const avatar = downloadURL

    try {
        const p = new Productbuy({ 
            idname, 
            avatar, 
            name,
            beforprice ,
            afterprice ,
            desecribationcotach ,
            notdescriation});
        await p.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new order print
const createRequsting = async (req, res, next) => {
    const { name, phone, massage } = req.body;
    const idname = req.params.id
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const dateregister =`${year}-${month + 1}-${day}`
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `pdf/${req.file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    const filepdf = downloadURL
    
    try {
        const R = new Requsting({ idname, name, phone, filepdf, massage,dateregister });
        await R.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new order other
const createRequsting_2 = async (req, res, next) => {
    const { nameOrder, phoneOrder, massageOrder } = req.body;
    const idname = req.params.id
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const dateregister =`${year}-${month + 1}-${day}`
    try {
        const order = new Order({ idname, nameOrder, phoneOrder, massageOrder , dateregister});
        await order.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a new commint
const createRequsting_3 = async (req, res, next) => {
    const { namecommint, massagecommint } = req.body;
    const idname = req.params.id
    try {
        const commint = new Commint({ idname, namecommint, massagecommint });
        await commint.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// create a search bar
const searchbar = async (req, res, next) => {
    const { searchname } = req.body;
    const admin = await Admin.find({ username: searchname });
    if (admin.length > 0) {
        res.render("search", { admin: admin });
    } else {
        res.render("nosearch", { searchname });
    }
};
const nopermissions = async (req, res, next) => {
    const ID = req.body.permissions;
    try {
        await Admin.updateOne({ _id: ID }, { $set: { permissions: 0 } });
        res.render('finsh')
    } catch (err) {
        console.log(err);
    }
};
const permissions = async (req, res, next) => {
    const ID = req.body.permissions;
    try {
        await Admin.updateOne({ _id: ID }, { $set: { permissions: 1 } });
        res.render('finsh')
    } catch (err) {
        console.log(err);
    }
};
const deleteproduct = async (req, res, next) => {
    const ID = req.body.idproduct;
    try {
        await Product.deleteOne({ _id: ID })
        res.render('finsh');
    } catch (error) {
        next(error);
    }

};
const deleteproductacademy =async (req, res, next) => {
    const ID = req.body.idproduct;
    try {
        await Productacademic.deleteOne({ _id: ID })
        res.render('finsh');
    } catch (error) {
        next(error);
    }

};
const deleteproductbuy = async (req, res, next) => {
    const ID = req.body.idproduct;
    try {
        await Productbuy.deleteOne({ _id: ID })
        res.render('finsh');
    } catch (error) {
        next(error);
    }

};

//create edite card price lib
const editeCardlib = async (req, res, next) => {
    const {oneMontlib,twoMontlib,threeMontlib} = req.body;
    try {
        const cardlib = new Cardlib({oneMontlib,twoMontlib,threeMontlib});
        await cardlib.save();
        res.render('finsh');
    } catch (error) {
        next(error);
    }
};

//create edite card price Acdemac
const editeCardacd = async (req, res, next) => {
    const {oneMontAcd,twoMontAcd,threeMontAcd} = req.body;
    try {
        const cardaca = new CardAca({oneMontAcd,twoMontAcd,threeMontAcd});
        await cardaca.save();
        res.render('finsh');
    } catch (error) {
        next(error);
    }
};

//create edite card price buy book
const editeCardbuy = async (req, res, next) => {
    const {oneMontlibBuy,twoMontlibBuy,threeMontlibBuy} = req.body;
    try {
        const cardbuy = new CardBuy({oneMontlibBuy,twoMontlibBuy,threeMontlibBuy});
        await cardbuy.save();
        res.render('finsh');
    } catch (error) {
        next(error);
    }
};
//create edite card price buy book
const editeCardPrice = async (req, res, next) => {
    const {idOfDay,numberOfDays} = req.body;
    try {
        const currentDate = new Date();
        const dateregister =currentDate.toISOString().split('T')[0]
        await Admin.updateOne({ _id: idOfDay }, { $set: { dateregister: dateregister } });
        currentDate.setDate(currentDate.getDate() + parseInt(numberOfDays));
        const subenddate =currentDate.toISOString().split('T')[0]
        await Admin.updateOne({ _id: idOfDay }, { $set: { subenddate: subenddate } });
        await Admin.updateOne({ _id: idOfDay }, { $set: { subdata: numberOfDays } });
        res.render('finsh');
    } catch (error) {
        next(error);
    }
};

// deleteadmin
const deleteadmin = async (req, res, next) => {
    const ID = req.body.idadmin;
    try {
        await Admin.deleteOne({ _id: ID });
        res.render('finsh')
        
    } catch (err) {
        console.log(err);
    }
};
// Send OTP
// verify OTP
// Login with an existing user
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin) {
            const passwordMatch = admin.password;
            if (passwordMatch != password) {
                return res.render("login");
            } else {
                
                if (admin.permissions === 0) {
                    res.render("permissions")
                } else {
                    const product = await Product.find({ idname: admin.id })
                    const productacademic = await Productacademic.find({ idname: admin.id })
                    const productbuy = await Productbuy.find({ idname: admin.id })
                    const descrabtion=await Descrabtion.findOne({ idadmin: admin.id })
                    const requsting = await Requsting.find({ idname: admin.id })
                    const order = await Order.find({ idname: admin.id })
                    if (admin.definthome === "مكتبة") {
                        res.render("admindeshbord", { adminuser: admin.username, imgadmin: admin.avatar, idadmin: admin.id, product: product, requsting: requsting, order: order ,descrabtion:descrabtion});
                    }else if(admin.definthome === "أكاديمية") {
                        res.render("admindeshbord_2", { adminuser: admin.username, imgadmin: admin.avatar, idadmin: admin.id, product: productacademic, order: order,descrabtion:descrabtion });
                    }
                    else {
                        res.render("admindeshbord_3", { adminuser: admin.username, imgadmin: admin.avatar, idadmin: admin.id, product: productbuy, order: order ,descrabtion:descrabtion});
                    }
                }
            }
        } else if (email === process.env.EMAIL_COMPANY && password === process.env.PASSWORD_COMPANY) {
            const allAdmin = await Admin.find()
            allAdmin.forEach(admin => {
                if (admin.dateregister === admin.subenddate) 
                admin.permissions = 0
            });
            // console.log(allAdmin);
            res.render("maktabtokodeshbord", { allAdmin: allAdmin });

        }
        else {
            res.render("error");
        }
    } catch (error) {
        next(error);
    }
};
//createDescrabtion
const createDescrabtion=async (req, res, next) => {
    const { descrabtionhome } = req.body;
    const idadmin=req.body.idadmin.toString();
    try {
        const descrabtion = new Descrabtion({ idadmin,descrabtionhome });
        await descrabtion.save();
        res.render('finsh')
    } catch (error) {
        next(error);
    }
};
// time product
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
module.exports = { registerAdmin, login, createProduct, createRequsting, createRequsting_2, createRequsting_3, searchbar, nopermissions, permissions, deleteproduct,editeCardlib ,editeCardacd,editeCardbuy,editeCardPrice,createProductacademic,deleteproductacademy,createProductbuy,deleteproductbuy,deleteadmin,createDescrabtion};