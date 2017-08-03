var net     = require('net');
var moment = require('moment');
var leftpad = require('leftpad');

var start = function() {
  var client = net.connect({ host: '192.168.11.193', port: 10001 }, function() {
    console.log('Server: connected');

    client.on('data', function(data) {
      console.log('----- NEW -----');
        modernBuffer = new ModernBuffer(data);
    });

    client.on('timeout', function () {
        console.log('Server: timeout');
    });

    client.on('error', function(error) {
        console.log('Server: error: ' + error);
    });

    client.on('end', function() {
      console.log('Server: client disconnected');
    });

    bytes = Buffer.from(
      "00" + "00" + "00" + "00" + "00" + "01" + "5A" + "30" + "30" +
      "02" + // STX
      "4524" + new Buffer("AAU1998FFFFABU1998FFFF").toString('hex') + //memory config
      "03" + // ETX
      "02" + // STX
      new Buffer("AA").toString('hex') +
      "1B" + // ESC
      "30" + // FILL
      "62" + // HOLD
      "1C37" + // Orange
      "1A" + // Font
      "39" + // Full Size
      new Buffer("Time: ").toString('hex') +
      "1041" + // DLE A
      "03" + // ETX
      "04" + // EOT
    "", 'hex');
    console.log(bytes.toString('hex'));
    client.write(bytes);
    client.end();
    startTimer();
  });
};

var timer;
var date;
var startTimer = function() {
  date = moment();
  timer = setInterval(writeTime, 100);
};

var stopTimer = function() {
  timer = clearInterval(timer);
};

var writeTime = function() {
  var client = net.connect({ host: '192.168.11.193', port: 10001 }, function() {
    console.log('Server: connected');

    client.on('data', function(data) {
      console.log('----- NEW -----');
        modernBuffer = new ModernBuffer(data);
    });

    client.on('timeout', function () {
        console.log('Server: timeout');
    });

    client.on('error', function(error) {
        console.log('Server: error: ' + error);
    });

    client.on('end', function() {
      console.log('Server: client disconnected');
    });

    var duration = moment.duration(moment().diff(date));
    var hours = duration.get('hours');
    var minutes = duration.get('minutes');
    var seconds = duration.get('seconds');
    var milliseconds = duration.get('milliseconds');


    bytes = Buffer.from(
      "00" + "00" + "00" + "00" + "00" + "01" + "5A" + "30" + "30" +
      "02" + // STX
      "4741"  + // write string file A
      new Buffer(leftpad(hours, 2) + ':' + leftpad(minutes, 2) + ':' + leftpad(seconds, 2) + '.' + leftpad(milliseconds, 3)).toString('hex') +
      "03" + // ETX
      "04" + // EOT
    "", 'hex');
    // console.log(bytes.toString('hex'));
    client.write(bytes);
    client.end();
  });;
};

var stop = function() {
  stopTimer();
}

start('192.168.11.193', 10001);
setTimeout(stop, 120 *60*1000);
