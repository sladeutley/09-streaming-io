#!/usr/local/bin/node

//IN TERMINAL, TYPE 'node streams.js languages.json'

const [ ,,fileArg ] = process.argv;

const { createReadStream, createWriteStream, appendFile, writeFile } = require('fs');

const { Transform, Writable } = require('stream'); // // stream module - allows us to customize and define the behavior of strings

const upperCaseify = Transform();
const writeStream = Writable();
// Transform() and Writable() set up the basic functionality for us

console.log("uppercaseify", upperCaseify._transform);
// // the reason we have an "_" is bc it is a private method that you can't call directly, but called internally by the module itself

// // we need to reassign its value (like when you reassign the value of a property on an object)

upperCaseify._transform = (buffer, _, callback) => {
    callback(null, buffer.toString().toUpperCase());
};

writeStream._write = (buffer, _, next) => {
    writeFile(fileArg, buffer, err => {
        //writeFile is a method that takes 3 arguments
        // ******buffer is chunk of data we want to write to that file
        if (err) throw err; // throw err means make that red text show up in the console log
        console.log("written data added to file")
    })
    next();
}

// chain them together to pipe our streams
createReadStream("languages.json")
// createReadStream(fileArg)
    .pipe(upperCaseify)
    .pipe(writeStream);