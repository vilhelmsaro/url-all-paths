const getHtml = require('./getHtml');
const urlFinder = require('./helper/url-finder');
const urlParser = require('./helper/url-parser');
const OutputEntity = require('./output-entity');
const validateDomain = require('./helper/validate-domain');

const collector = async (inputDomain, outputArr) => {
    const domain = validateDomain(inputDomain);
    console.log(`working on domain: ${domain}`);
    let urls = new Set();
    let expArr = [];
    urls.add(domain);

    const outputData = [];
    outputArr.push(outputData);

    const {
        hostname,
        pathname
    } = urlParser(domain);

    const {htmlString} = await getHtml({hostname, pathname});
    urlFinder(htmlString, urls, domain, expArr);

    for await (const url of urls) {
        const {hostname, pathname} = urlParser(url);
        const {htmlString, statusCode} = await getHtml({hostname, pathname});
        outputData.push(new OutputEntity({website: domain, link: url, statusCode}));

        urlFinder(htmlString, urls, domain, expArr);
    }

};

const inputData = [{_website: ['https://encro.dev/?attr=3&aasjadn=asjasd']},
    {_website: ['https://esterox.am']}
];

const main = async (inputData) => {
    const outputArr = [];
    for await (const el of inputData) {
        const domain = el._website[0];
        await collector(domain, outputArr);
    }
    console.log('see the output below...');
    for (const element of outputArr) {
        console.log(`output of the website ${element[0]._website}`);
        console.log(`quantity of pages: ${element.length}`);
        for (const elementElement of element) {
            console.log('output', elementElement);
        }
    }
}

main(inputData);
