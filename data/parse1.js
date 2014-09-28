//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");
var csvFileName="./EW.csv";

var fileStream=fs.createReadStream(csvFileName);

var csvConverter=new Converter({constructResult:false});

var readStream=require("fs").createReadStream(csvFileName);

var writeStream=require("fs").createWriteStream("outpuData.json");

readStream.pipe(csvConverter).pipe(writeStream);