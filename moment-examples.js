// see doc in moment.js website
var moment = require('moment');
var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.valueOf());

var timestamp = 1498115352215;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mm a'));
// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('MMM do YYYY, h:mma'));