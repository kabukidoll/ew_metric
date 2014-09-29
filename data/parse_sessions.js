//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
var csvFileName="./sessions.csv";

var fileStream=fs.createReadStream(csvFileName);

var csvConverter=new Converter({constructResult:false});

var readStream=require("fs").createReadStream(csvFileName);

var writeStream=require("fs").createWriteStream("sessions.json");

readStream.pipe(csvConverter).pipe(writeStream);