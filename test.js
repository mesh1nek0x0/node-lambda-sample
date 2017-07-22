'use strict';

const Promise = require('bluebird');
const phantom = require('phantom');

Promise.coroutine(function* () {
    const instance = yield phantom.create();
    const page = yield instance.createPage();

    yield page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
    });

    let status = yield page.open('https://httpbin.org/');
    console.log(status);

    yield page.evaluate(function() {
        return document.getElementsByTagName('title')[0].innerHTML;
    }).then(function(title){
        console.log(title);
    });

    yield instance.exit();
})().catch(function (err) {
    console.error(err.stack);
}).finally(() => {
    console.log('done');
});
