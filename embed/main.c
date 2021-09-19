#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <errno.h>
#include <wiringPi.h>

//SN74HC595N shift reg
//GPIO pin stuff:
//#define BG_DATA_PIN 17 //output pins for the 8 bit shift register - parallel out
//#define BG_LATCH_PIN 27 //for blue and green leds
//#define BG_CLOCK_PIN 22
//
//#define RY_DATA_PIN 18 //for red and yellow leds
//#define RY_LATCH_PIN 23
//#define RY_CLOCK_PIN 24
//
//#define BLUE_BUTTON 5
//#define GREEN_BUTTON 6
//#define RED_BUTTON 20
//#define YELLOW_BUTTON 21

//wiringPI pin config;
#define BG_DATA_PIN 0 //output pins for the 8 bit shift register - parallel out
#define BG_LATCH_PIN 2 //for blue and green leds
#define BG_CLOCK_PIN 3 

#define RY_DATA_PIN 1 //for red and yellow leds
#define RY_LATCH_PIN 4
#define RY_CLOCK_PIN 5

#define BLUE_BUTTON 21
#define GREEN_BUTTON 22
#define RED_BUTTON 28
#define YELLOW_BUTTON 29 

#define shiftRemove3(a) ((a >> 1) & 0xF7)

void initialize(int * GPIOPINS, int * GPIODIR, int n){ //GPIODIR -> array of integers, 0 for output, 1 for input
    int exportFD = open("/sys/class/gpio/export", O_WRONLY);
    for(int i = 0;i < n;i++){
        write(exportFD, GPIOPINS[i], 2);
        int GPIOFD = open("/sys/class/gpio/gpio24/direction", O_WRONLY);
        if(GPIODIR[i]){
            write(GPIOFD, "in", 2);
        } else{
            write(GPIOFD, "out", 3);
        }
    }
}

//to set a value to pins, you can open /sys/class/gpio/gpioNUMBEr/value and write to it either 1 or 0

void destroyPins(int * GPIOPINS, int n){
    int unexportFD = open("/sys/class/gpio/unexport", O_WRONLY);
    for(int i = 0;i < n;i++){
        write(unexportFD, GPIOPINS[i], 2);
    }
}

void sendData(u_int8_t dataPin, u_int8_t clockPin, u_int8_t latchPin, u_int8_t data){
  digitalWrite(latchPin, LOW);
  digitalWrite(dataPin, LOW);
  digitalWrite(clockPin, LOW);
  
  for(int i = 0; i < 8; i++){
    
    if((1 << i) & data) {
      digitalWrite(dataPin, HIGH);
    } else{
      digitalWrite(dataPin, LOW);
    }

    digitalWrite(clockPin, LOW);
    digitalWrite(clockPin, HIGH);
  }
  
  digitalWrite(clockPin, LOW);
  digitalWrite(dataPin, LOW);
  digitalWrite(latchPin, HIGH);
}

int main(){
    u_int8_t pins[] = {BG_DATA_PIN, BG_LATCH_PIN, BG_CLOCK_PIN, RY_DATA_PIN, RY_LATCH_PIN, RY_CLOCK_PIN, BLUE_BUTTON, GREEN_BUTTON, RED_BUTTON, YELLOW_BUTTON};
    int pinModes[] = {0,0,0,0,0,0,1,1,1,1};

    u_int8_t blueGreen = 0;
    u_int8_t redYellow = 0;
    int musicNotes[] = {4, 3, 2, 1, 0, 15, 12, 9, 7, 0, -1};
    int musicNotesTest[] = {12,0,0,0,0,12,0,12,12,0,0,0,0,0,0,8,0,0,0,0,0,-1};
    int musicNotesTest2[] = {8,0,0,0,0,-1};
    int musicNotesTest3[] = {3,0,0,0,0,3,0,3,3,0,0,0,0,0,0,2,0,0,0,0,0,-1};
    int musicNotesTest4[] = {3,0,0,0,0,-1};
    //Next note is in binary
    //lowest 4 bits bbbb denote if there is a next note for red, yellow, green, blue respectively
    //so 1000 or 8 means there is a note for yellow next, -1 is end

    wiringPiSetup();
    for(int i = 0;i < 10;i++){
        if(pinModes[i]){
            pinMode(pins[i], INPUT);
        } else {
            pinMode(pins[i], OUTPUT);
        }
    }

    int i = 0;
    int shiftBits[2]; //(blue, green) and (red, yellow)
    while(musicNotesTest[i] != -1){
        //shiftBits[0] = musicNotesTest[i] & 1;
        //shiftBits[1] = (musicNotesTest[i] & (1 << 1)) >> 1;
        //blueGreen = shiftRemove3(blueGreen)| (shiftBits[1] << 7 | shiftBits[0] << 3);

        shiftBits[0] = (musicNotesTest[i] & (1 << 2)) >> 2;
        shiftBits[1] = (musicNotesTest[i] & (1 << 3)) >> 3;
        redYellow = shiftRemove3(redYellow)| (shiftBits[1] << 7 | shiftBits[0] << 3);

        //sendData(BGDATA, BGCLOCK, BGLATCH, blueGreen);
        sendData(RY_DATA_PIN, RY_CLOCK_PIN, RY_LATCH_PIN, redYellow); 
        i++;
        delay(500);
    }

    for(int j = 0;j < 4;j++){ //finish the sequence here
        //blueGreen = shiftRemove3(blueGreen);
        redYellow = shiftRemove3(redYellow);
        //sendData(BGDATA, BGCLOCK, BGLATCH, blueGreen);
        sendData(RY_DATA_PIN, RY_CLOCK_PIN, RY_LATCH_PIN, redYellow);
        delay(500);
    }

    exit(0);
    //return 0;
}
