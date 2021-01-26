const express = require('express');
const con = require("../connection");

const router = express.Router();
const SqlString = require('sqlstring');

//get zenekarok
router.get("/zenekarok",(req,res)=>{
    con.query("SELECT * FROM zenekar", (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get hiba");
        }
    });
});

//get szinpadok
router.get("/szinpad",(req,res)=>{
    con.query("SELECT * FROM szinpad", (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get hiba");
        }
    });
});


//get tomeg
router.get("/tomeg",(req,res)=>{
    con.query("SELECT * FROM tomeg", (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get hiba");
        }
    });
});


//get idosavok
router.get("/ido",(req,res)=>{
    con.query("SELECT * FROM idosavok", (err,rows,fields)=>{
        if (!err) {
            res.json(rows);
        }else{
            console.log("get hiba");
        }
    });
});


//get all
router.get("/",(req,res)=>{
    let sql = "SELECT koncertek.id, zenekar.nev, idosavok.idosav,szinpad.megnevezes,tomeg.kozonseg FROM koncertek \
    INNER JOIN zenekar ON koncertek.zenekar = zenekar.id \
    INNER JOIN idosavok ON koncertek.ido = idosavok.id \
    INNER JOIN szinpad ON koncertek.szinpad = szinpad.id \
    INNER JOIN tomeg ON koncertek.tomeg = tomeg.id";
    con.query(sql, (err,rows,fields)=>{
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
router.post("/add",(req,res)=>{
    
    var insertData = {
        zenekar : req.body.zenekar,
        ido : req.body.ido,
        szinpad : req.body.szinpad,
        tomeg : req.body.tomeg
    };

    var sql = SqlString.format('INSERT INTO koncertek SET ?',insertData);

    con.query(sql, function(err,result){
        if (err) throw err;
        res.send("Felvétel sikerült");
    });
});

//update
router.post("/update/:id",(req,res)=>{
    var insertData = {
        zenekar : req.body.zenekar,
        ido : req.body.ido,
        szinpad : req.body.szinpad,
        tomeg : req.body.tomeg
    };

    var sql = SqlString.format('UPDATE koncertek SET ?',insertData);
    sql+=" WHERE id="+req.body.id;

    con.query(sql, function(err,result){
        if (err) throw err;
        res.send("Módosítás sikerült");
    });
});

module.exports = router;