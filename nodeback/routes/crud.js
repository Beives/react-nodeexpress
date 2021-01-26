const express = require('express');
const con = require("../connection");

const router = express.Router();
const SqlString = require('sqlstring');

//get all
router.get("/",(req,res)=>{
    con.query("SELECT * FROM koncertek", (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get hiba");
        }
    });
});

//get by id
router.get("/:id",(req,res)=>{
    con.query("SELECT * FROM koncertek WHERE id = ?",[req.params.id], (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get by id hiba");
        }
    });
});
//delete by id
router.delete("/:id",(req,res)=>{
    con.query("DELETE FROM koncertek WHERE id = ?",[req.params.id], (err,rows,fields)=>{
        if (!err) {
            res.send('Törölve');
        }else{
            console.log("delete hiba");
        }
    });
});

//insert
router.post("/",(req,res)=>{

    var insertData = {
        zenekar : req.body.Formdata.zenekar,
        ido : req.body.Formdata.ido,
        szinpad : req.body.Formdata.szinpad,
        tomeg : req.body.Formdata.tomeg
    };

    var sql = SqlString.format('INSERT INTO koncertek SET ?',insertData);

    con.query(sql, function(err,result){
        if (err) throw err;
        res.send("Felvétel sikerült");
    });
});

module.exports = router;