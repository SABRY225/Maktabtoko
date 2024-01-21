const mongoose = require('mongoose');
const descrabtionhomeSchema = new mongoose.Schema(
    {
        idadmin:{
            type: String, 
            required: false,
        },
        descrabtionhome: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Descrabtionhome = mongoose.model('Descrabtionhome', descrabtionhomeSchema);

module.exports = Descrabtionhome;