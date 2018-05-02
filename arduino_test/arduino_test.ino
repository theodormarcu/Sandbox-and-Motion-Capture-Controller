int incomingByte = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  static char buffer[32];
    static size_t pos;
    if (Serial.available()) {
        char c = Serial.read();
        if (c == '\n') {  // on end of line, parse the number
            buffer[pos] = '\0';
            float value = atof(buffer);
            Serial.print("received: ");
            Serial.println(value);
            pos = 0;
        } else if (pos < sizeof buffer - 1) {  // otherwise, buffer it
            buffer[pos++] = c;
        }
    }
}
