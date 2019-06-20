module.exports.uploadFile = function (req, res, next) {

    if (req.file) {
        console.log('Uploading file...');
        if (!req.file.originalname.includes('xlsx'))
            return res.status(400).send(JSON.stringify({ "statusCode": 400, "error": "file format is not proper , please upload XLSX file", "response": null }));

        if (req.file.size > 100)
            return res.status(400).send(JSON.stringify({ "statusCode": 400, "error": "please upload file less than 10Mb", "response": null }));
        //   console.log(req.file);
        return res.status(200).send(JSON.stringify({ "statusCode": 200, "error": null, "response": "file uploaded successfully" }));
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';

        return res.status(400).send(JSON.stringify({ "statusCode": 400, "error": filename, "response": null }));
    }



};
