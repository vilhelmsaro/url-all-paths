const url = require("url");
const urlFinder = (str, urlsSet, domain, arr) => {
    let flag = true;
    let indexOfPrev = 0;
    while (flag) {
        const indexOfA = str.indexOf('<a ', indexOfPrev);
        if (indexOfA === -1) {
            break;
        }
        const endOfA = str.indexOf('</a>', indexOfA + 1);
        const startOfLink = str.indexOf(`href="`, indexOfA) + 5;
        const endOfLink = str.indexOf(`"`, startOfLink + 1);
        let link = str.substring(startOfLink + 1, endOfLink);
        // console.log('link ', link);
        arr.push(link);

        //if is URL (starts with https or http)
        if (~link.indexOf('http://') || ~link.indexOf('https://')) {
            if (~link.indexOf(domain)) {
                urlsSet.add(link);
            }
            //else if is a path in the same domain
        } else if (link.indexOf('/') === 0) {
            urlsSet.add(domain + link);
        }
        //search after the link of the current link during next iteration
        indexOfPrev = endOfA + 1;


        // if (link === 'https://stackoverflow.com/legal/cookie-policy') console.log('link source', str.substring(startOfLink - 150, endOfLink + 150))
        //
        // if (~link.indexOf(`javascript`)) {
        //     indexOfPrev = endOfA + 1;
        //     continue;
        // }
        //
        // console.log('${domain', domain)
        //
        // if (~link.indexOf('http://') || ~link.indexOf('https://')) {
        //     urlsSet.add(link);
        //     indexOfPrev = endOfA + 1;
        //     continue;
        // }
        //
        // if (!~link.indexOf(domain)) {
        //     console.log(' before link after fi ~indexof', link);
        //     link = domain + link;
        //     console.log('link after fi ~indexof', link);
        // }
        // urlsSet.add(link);
        // // console.log('indexOfA' + 'endOfA', indexOfA, endOfA);
        // indexOfPrev = endOfA + 1;
    }
    // return urlsSet;
}

// urlFinder(`<li class="md:d-none">
//                         <a href="https://stackoverflow.co/" class="s-navigation--item js-gps-track"
//                            data-gps-track="top_nav.products.click({location:1, destination:7})"
//                             data-ga="[&quot;top navigation&quot;,&quot;about menu click&quot;,null,null,null]">About</a><a href="https://123456.co/" class="s-navigation--item js-gps-track"
//                            data-gps-track="top_nav.products.click({location:1, destination:7})"
//                             data-ga="[&quot;top navigation&quot;,&quot;about menu click&quot;,null,null,null]">About</a>
//                     </li>
// `)

module.exports = urlFinder;