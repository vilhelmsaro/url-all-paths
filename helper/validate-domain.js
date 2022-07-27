module.exports = (domain) => {
    if (!(~domain.indexOf('http://') || ~domain.indexOf('https://'))) throw new Error('bad domain link!');
    const questionMarkI = domain.indexOf('?');
    if (questionMarkI !== -1) {
        domain = domain.replace(domain.substring(questionMarkI), '');
    }
    if (domain[domain.length - 1] !== '/') domain += '/';
    return domain;
}
