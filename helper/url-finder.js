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
    }
}

module.exports = urlFinder;
