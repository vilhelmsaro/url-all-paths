const https = require('https');

const getHtml = ({hostname, pathname}) => {
    let req;
    return new Promise((resolve, reject) => {

        const options = {
            hostname,
            path: pathname,
            method: 'GET',
        };


        let response = '';
        req = https.request(options, res => {

            res.on('data', d => {
                response += d;
                return d;
            });

            res.on('end', d => {
                response = response.toString();
                return resolve({htmlString: response, statusCode: res.statusCode});
            });
        });


        req.on('error', error => {
            console.error('err', error);
            return reject(error);
        });

        req.end();

    })
};

module.exports = getHtml;
