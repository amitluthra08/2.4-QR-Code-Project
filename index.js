/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs, { createWriteStream } from "fs";
import inquirer from "inquirer";
import qr from "qr-image"

inquirer.prompt([{
    type: 'input',
    name: 'url',
    message: "Enter your url: ",
}])
    .then((input) => {
        console.log("input type", input);;
        let url_qr = qr.image(input["url"]);
        url_qr.pipe(fs.createWriteStream(`${input.url} - qr.png`));

        const urlData = input.url + '\n';
        // fs.writeFile("urls.txt", urlData, { flag: 'r+', encoding: 'utf-8' }, (err) => {
        //     if (err) throw err;
        // });

        const writer = createWriteStream("urls.txt", { flag: 'r+', encoding: 'utf-8' });
        writer.write(urlData);
    })
    .catch((error) => {
        console.error("An error occurred", error);
    })