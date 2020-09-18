const path = require('path');
const fs = require('fs');

exports.migrations = async (action, fileNames) => {

    return new Promise(async (resolve, reject) => {
        const directoryPath = path.join(__dirname, 'migrations');
        fs.readdir(directoryPath, function (err, files) {

            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            fileArray = fileNames || files;

            return fileArray.forEach(function (file) {
                action == "up" ? console.log("Upgrading", file.split('.')[0]) : console.log("Downgrading", file.split('.')[0]);
                let fileName = file.split('.')[0];
                const migrationFile = require(`./migrations/${fileName}`);

                migrationFile[action]().then((message) => {
                    if (fileNames) {
                        resolve(message);
                    }
                    resolve("All migrations are done");
                }).catch(err => {
                    reject(err);
                })
            });
        });
    })
}