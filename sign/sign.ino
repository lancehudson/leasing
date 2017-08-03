#include <SoftwareSerial.h>

// Commands for Alpha Sign Communication Protocol
const byte NUL = 0x00;
const byte START_HEADER = 0x01;
const byte START_TEXT = 0x02;
const byte END_TRANSMISSION = 0x04;
const byte ESC = 0x1B;
const byte FILL = 0x30;
const byte ROTATE = 0x61;
const byte SLOW = 0x15;
const byte FAST = 0x19;
const byte TIME = 0x13;
const byte CALL_STRING = 0x10;
const byte CALL_SIZE = 0x1A;
const byte SIZE_LARGE = 0x33;
const byte SIZE_SMALL = 0x31;

// Init
SoftwareSerial mySerial(10, 11); // RX, TX
String buffer;

void setup() {
  // Open mySerial communications and wait for port to open:
  mySerial.begin(9600);
  writeText();
}

void loop() {
}


void writeText() {
  mySerial.write(NUL); // Start frame sync chars
  mySerial.write(NUL);
  mySerial.write(NUL);
  mySerial.write(NUL);
  mySerial.write(NUL); // end frame sync chars
  mySerial.write(START_HEADER); // start of header
  mySerial.write("Z00"); // all sign types, all addresses
  mySerial.write(START_TEXT); //start of text
  mySerial.write("AA"); // write command, text file A
  mySerial.write(ESC);
  mySerial.write(FILL);
  mySerial.write(ROTATE);
  mySerial.print("hi");
  mySerial.write(END_TRANSMISSION);
}

