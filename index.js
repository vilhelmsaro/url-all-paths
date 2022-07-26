const getHtml = require('./getHtml');
const urlFinder = require('./helper/url-finder');
const urlParser = require('./helper/url-parser');
const OutputEntity = require('./output-entity');
const validateDomain = require('./helper/validate-domain');

const builder = async () => {
    const html = await getHtml({hostname: 'stackoverflow.com', pathname: ''});
    const urls = urlFinder(html);

    console.log('res -------------------------------', html)
    console.log('11111111111', urls)

}

const collector = async (inputDomain, outputArr) => {
    const domain = validateDomain(inputDomain);
    console.log('domain', domain);
    // console.log('new dom', domain);
    let urls = new Set();
    let expArr = [];
    //add https by default if nothing is found! as examples always contain a protocol!
    if (!((~domain.indexOf(`http://`)) || (~domain.indexOf(`https://`)))) {
        domain = 'https://' + domain;
        // console.log('in if if if', domain);
    }
    urls.add(domain);

    const outputData = [];
    outputArr.push(outputData);

    const {
        hostname,
        pathname
    } = urlParser(domain);//'https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f'

    const {htmlString, statusCode} = await getHtml({hostname, pathname});
    // console.log('outputData', outputData);
    // console.log('htmlString, statusCode', statusCode);
    urlFinder(htmlString, urls, domain, expArr);
    // console.log('urls before the big bang', urls);

    for await (const url of urls) {
        //case of another domains, or something like "#"
        if (!~url.indexOf(domain) || ~url.indexOf(`.${domain}`)) continue;
        const {hostname, pathname} = urlParser(url);
        // console.log('hostname, pathname in for await and url -> ', url, hostname, pathname);
        const {htmlString, statusCode} = await getHtml({hostname, pathname});
        outputData.push(new OutputEntity({website: domain, link: url, statusCode}));

        urlFinder(htmlString, urls, domain, expArr);


        // console.log('hostname, pathname', hostname, pathname);
        // console.log('urlurlurl', url)
        //
        // // throw new Error('asadkjasddsa');
        // const {htmlString, statusCode} = await getHtml({hostname, pathname});
        // console.log('htmlString, statusCode in for await URL ', url, ':  statusCode', statusCode);
    }
    // console.log('i times ---', expArr.length)
    // console.log('urls', urls, urls.size);
    // console.log('outputData after bigbang', outputData, outputData.length)

};

// builder();

const inputData = [{_website: ['https://encro.dev/?attr=3&aasjadn=asjasd']},
    {_website: ['https://esterox.am']}
];

const main = async (inputData) => {
    const outputArr = [];
    for await (const el of inputData) {
        console.log('el', el);
        const domain = el._website[0]; //to get the website itself! not the array ! TODO ask
        await collector(domain, outputArr);
        console.log('outputArr', outputArr);

        console.log('--------------------');
    }
    for (const element of outputArr) {
        console.log('element ', element.length);
        for (const elementElement of element) {
            console.log(', elementElement._website', elementElement._link)
        }
    }
    // inputData.forEach((el) => {
    //     console.log('el', el);
    //     const outputArr = [];
    //     const domain = el._website[0]; //to get the website itself! not the array ! TODO ask
    //     collector(domain, outputArr);
    //     console.log('outputArr', outputArr);
    // });
}

main(inputData);