const userModel = require("../models/user.model")

exports.login = (req, res) => {
    const query = {
        email: req.body.email,
        password: req.body.password
    }
    userModel.findOne(query, (err, data) => {
        if (err) {
            res.json({ status: 409, data: err })
        }
        else if (data) {
            console.log(data)
            res.json({ status: 200, data: data })
        } else {
            res.json({ status: 409, data: "Invalid User!" })
        }
    })
}
exports.register = (req, res) => {
    const newUserModel = new userModel(req.body)
    const query = {
        email: req.body.email
    }
    userModel.findOne(query, (err, data) => {
        if (err) {
            res.json(err)
        } else if (!data) {
            newUserModel.save((err, data) => {
                if (err) {
                    res.json({ status: 409, error: err })
                } else {
                    res.json({ status: 200, data: data })
                }
            })
        } else {
            res.json({ status: 409, data: "User Already Exists" })
        }
    })
}
exports.getUsers = (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            res.json(err)
        } else if (!data.length) {
            res.json({ status: 409, data: "No Record in DB" }) 
        } else {
            res.json({ status: 200, data: data })  
        }
    })
}
exports.deleteUser = (req, res) => {
    const query = { _id: req.params.id }
    userModel.deleteOne(query,(err, data) => {
        if (err) {
            res.json(err)
        } else if (data.deletedCount == 1) {
            res.json({ status: 200, data: "User Deleted" })
        } else {
            res.json({ status: 409, data: "user not found" })
        }
    })
}



exports.getUserDetails = (req, res) => {
    const query = {
        _id:req.params.id
    }
    userModel.findOne(query, (err, data) => {
        if (err) {
            res.json(err)
        } else if (!data) {
            res.json({ status: 409, data: "User Not Found" })
        } else {
            res.json({ status: 200, data: data })
        }
    })
}

exports.update = (req, res) => {
const query={
    _id:req.params.id
}
userModel.findOneAndUpdate(query,(req.body),(err,data)=>{
    if(err){
        res.json(err)
    }else if(!data){
        res.json({status:409,data:"User Details Not Found"})
    }else{
       res.json({status:200,data:data})
    }
})

}


