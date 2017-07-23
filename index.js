'use strict';

const Promise = require('bluebird');
const phantom = require('phantom');


module.exports.handler = function (event, context) {
    console.log('lambda is started');
    let instance;

    Promise.coroutine(function* () {
        instance = yield phantom.create();
        const page = yield instance.createPage();

        let status = yield page.open('https://httpbin.org/');
        console.log(status);
        if (status != 'success') {
            throw new Error('page is not opend');
        }

        yield page.evaluate(function() {
            return document.getElementsByTagName('title')[0].innerHTML;
        }).then(function(title){
            console.log(title);
        });
    })().then(() => {
        console.log('lambda will ended with success');
        context.succeed('done success');
    }).catch((err) => {
        console.error(err.stack);
        console.log('lambda will ended with failure');
        context.fail('done failure');
    }).finally(() => {
        console.log('finally is started');
        Promise.coroutine(function *() {
            yield instance.exit();
        })().then(() => {
            console.log('lambda is closed');
        });
    });
};
