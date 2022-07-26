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
            // console.log(`statusCode: ${res.statusCode}`);
            // console.log('res', res.headers);

            res.on('data', d => {
                // console.log('d', d, typeof d.toString())
                response += d;
                return d;
                // process.stdout.write(d);
            });

            res.on('end', d => {
                response = response.toString();
                // console.log('response', response)
                return resolve({htmlString: response, statusCode: res.statusCode});
                // return response;
                // process.stdout.write(d);
            });
        });


        req.on('error', error => {
            console.error('err', error);
            return reject(error);
        });

        req.end();

    })
};

// getHtml({hostname: 'stackoverflow.com', pathname: ''}).then(console.log);

module.exports = getHtml;