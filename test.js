var fs = require('fs');
var EJSON = require('meteor-ejson');

function test (buffer) {
  console.log('buffer length: ', buffer.length);
  var arrayView = new Uint8Array(buffer);
  var serialized = EJSON.stringify(arrayView);
  var deserialized = EJSON.parse(serialized);
  console.log('Is the deserialized Uint8Array equal to the original?', JSON.stringify(arrayView) == JSON.stringify(deserialized));

  var nodeBase64 = (new Buffer(arrayView)).toString('base64');
  var ejsonBase64 = EJSON._base64Encode(arrayView);
  console.log('Is the base64 encoding correct?', nodeBase64 == ejsonBase64);

  var base64Decoded = new Buffer(nodeBase64, 'base64');
  var ejsonBase64Decoded = new Buffer(EJSON._base64Decode(ejsonBase64));
  console.log('NodeJS: ',  base64Decoded);
  console.log('EJSON: ', ejsonBase64Decoded);
  console.log('Is the base64 decoding correct?', JSON.stringify(base64Decoded) == JSON.stringify(ejsonBase64Decoded));
}

function testWithSize (size) {
  console.log('*** Testing with Characters ***');
  var str = '';
  for (var i = 0; i < size; i++) {
    str += 'a';
  }

  var buffer = new Buffer(str);
  test(buffer);
  console.log('');
}

function testWithPDF () {
  console.log('*** Testing with PDF File ***');
  var buffer = fs.readFileSync('hello-world.pdf');
  test(buffer);
}

testWithPDF();
