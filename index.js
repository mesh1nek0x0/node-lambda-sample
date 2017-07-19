'use strict';

module.exports.handler = function (event, context) {
    console.log(event);
    console.log('lambda started');
    if (!event.result) {
        return context.succeed('done fail');
    }
    context.succeed('done success');
};
