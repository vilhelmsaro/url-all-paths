const node_url = require('node:url');

//returns host and path separately!
const urlParser = (url) => {
    //TODO why hostname and pathname not host and path?
    // console.log('==== url in urlparse', url, node_url.parse('https://' + url))
    if (!((~url.indexOf('http://')) || (~url.indexOf('https://')))) url = 'http://' + url;
    // console.log('url', url);
    // console.log('==== url in urlparse', url, node_url.parse(url))
    const {hostname, pathname, protocol} = node_url.parse(url);
    // console.log('{hostname, pathname}', {hostname, pathname})
    return {hostname, pathname, protocol};
};

module.exports = urlParser;
