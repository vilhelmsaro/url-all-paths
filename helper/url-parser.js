const node_url = require('node:url');

//returns host and path separately!
const urlParser = (url) => {
    if (!((~url.indexOf('http://')) || (~url.indexOf('https://')))) url = 'http://' + url;
    const {hostname, pathname, protocol} = node_url.parse(url);
    return {hostname, pathname, protocol};
};

module.exports = urlParser;
