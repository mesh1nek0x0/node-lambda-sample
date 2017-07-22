'use strict';

const Promise = require('bluebird');
const phantom = require('phantom');


module.exports.handler = function (event, context) {
    console.log('lambda is started');

    Promise.coroutine(function* () {
        const instance = yield phantom.create();
        const page = yield instance.createPage();

        let status = yield page.open('https://httpbin.org/');
        console.log(status);

        yield page.evaluate(function() {
            return document.getElementsByTagName('title')[0].innerHTML;
        }).then(function(title){
            console.log(title);
        });

        yield instance.exit();
        console.log('lambda will ended with success');
    })().catch(() => {
        console.log('lambda will ended with failure');
    }).finally(() => {
        context.succeed('lambda done');
    });
};
