#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <fcntl.h>
#include <errno.h>
#include <wiringPi.h>
#include <pthread.h>

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
#define BG_LATCH_PIN 2
#define BG_CLOCK_PIN 3 

#define RY_DATA_PIN 1
#define RY_LATCH_PIN 4
#define RY_CLOCK_PIN 5

#define BLUE_BUTTON 21
#define GREEN_BUTTON 22
#define RED_BUTTON 28
#define YELLOW_BUTTON 29 

//this macro shifts then removes the 4th bit.. 0x77 is 0b01110111
//purpose: each row of 4 lights is in half of a byte, 1 bit each after each time interval, 
//we need to move lights down so shift each 4 to the left but when top 4 are shifted, it bleeds into bottom 4
//so set the top bit of the bottom half to 0... we will set left most bit in top half to 0 too for safety.
#define shiftRemove3(a) ((a >> 1) & 0x77)

void initialize(int * GPIOPINS, int * GPIODIR, int n); //GPIODIR -> array of integers, 0 for output, 1 for input
void destroyPins(int * GPIOPINS, int n);
void sendData(u_int8_t dataPin, u_int8_t clockPin, u_int8_t latchPin, u_int8_t data);
int isActive(u_int8_t data, int low);
void * startButtonStuff(void * arg);
void addToRightStuff(u_int8_t blueGreen, u_int8_t redYellow, int * rightNotes, int * allNotes);

//sorta inter thread communication via shared memory....
//way too late to do proper synchronization and critical section protection things
//so buggy multithread but whatever for now
//tired just make it work...
int musicEnd = 0;
int pressedBlue = 0;
int pressedGreen = 0;
int pressedRed = 0;
int pressedYellow = 0;

typedef struct button_thread_info {
    pthread_t threadId;
    int threadNum;
} button_thread_info;

int main(){
    u_int8_t pins[] = {BG_DATA_PIN, BG_LATCH_PIN, BG_CLOCK_PIN, RY_DATA_PIN, RY_LATCH_PIN, RY_CLOCK_PIN, BLUE_BUTTON, GREEN_BUTTON, RED_BUTTON, YELLOW_BUTTON};
    int pinModes[] = {0,0,0,0,0,0,1,1,1,1};

    pthread_attr_t threadAttr;
    if(pthread_attr_init(&threadAttr)){
        printf("Thread attributes not initialized");
        exit(1);
    }
    button_thread_info buttonThread;
    buttonThread.threadNum = 1;

    u_int8_t blueGreen = 0; //green is high 4 bit, blue is low 4 bits
    u_int8_t redYellow = 0; //yellow is high 4 bit, red is low 4 bits
    int musicNotes[] = {15,13,8,0,9,15,0,13,12,0,7,0,4,5,0,1,0,0,10,11,0,-1};
    int totalNotes = 0;
    int rightNotes = 0;

    //Next note is in binary
    //lowest 4 bits bbbb denote if there is a next note for yellow, red, green, blue respectively
    //so 1000 or 8 means there is a note for yellow next, -1 is end

    wiringPiSetup();
    for(int i = 0;i < 10;i++){
        if(pinModes[i]){
            pinMode(pins[i], INPUT);
        } else {
            pinMode(pins[i], OUTPUT);
        }
    }
    pthread_create(&(buttonThread.threadId), &threadAttr, &startButtonStuff, NULL);

    int i = 0;
    int shiftBits[2]; //(blue, green) and (yellow, red)
    while(musicNotes[i] != -1){
        shiftBits[0] = musicNotes[i] & 1;
        shiftBits[1] = (musicNotes[i] & (1 << 1)) >> 1;
        blueGreen = shiftRemove3(blueGreen)| (shiftBits[1] << 7 | shiftBits[0] << 3);

        shiftBits[0] = (musicNotes[i] & (1 << 2)) >> 2;
        shiftBits[1] = (musicNotes[i] & (1 << 3)) >> 3;
        redYellow = shiftRemove3(redYellow)| (shiftBits[1] << 7 | shiftBits[0] << 3);

        sendData(BG_DATA_PIN, BG_CLOCK_PIN, BG_LATCH_PIN, blueGreen);
        sendData(RY_DATA_PIN, RY_CLOCK_PIN, RY_LATCH_PIN, redYellow); 
        i++;

        delay(300);
        addToRightStuff(blueGreen, redYellow, &rightNotes, &totalNotes);
    }

    for(int j = 0;j < 4;j++){ //shift 4 more times at end of song to make sure the notes finish
        blueGreen = shiftRemove3(blueGreen);
        redYellow = shiftRemove3(redYellow);
        sendData(BG_DATA_PIN, BG_CLOCK_PIN, BG_LATCH_PIN, blueGreen);
        sendData(RY_DATA_PIN, RY_CLOCK_PIN, RY_LATCH_PIN, redYellow);

        delay(300);
        addToRightStuff(blueGreen, redYellow, &rightNotes, &totalNotes);
    }

    musicEnd = 1;
    printf("Accuracy: %f", ((float)rightNotes)/((float)totalNotes));
    exit(0);
}

void initialize(int * GPIOPINS, int * GPIODIR, int n){
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

void * startButtonStuff(void * arg){
    int buttonStuff;
    while(!musicEnd){
        buttonStuff = digitalRead(BLUE_BUTTON);
        if(buttonStuff) pressedBlue++;

        buttonStuff = digitalRead(RED_BUTTON);
        if(buttonStuff) pressedRed++;

        buttonStuff = digitalRead(GREEN_BUTTON);
        if(buttonStuff) pressedGreen++;
        buttonStuff = digitalRead(YELLOW_BUTTON);
        if(buttonStuff) pressedYellow++;
    }
    void * smth = malloc(5);
    return smth;
}

int isActive(u_int8_t data, int low){ //check if the 1st and 5th byte are set
    if(low){
        return !!(data & 1);
    } else {
        return !!(data & (1 << 4));
    }
}

void addToRightStuff(u_int8_t blueGreen, u_int8_t redYellow, int * rightNotes, int * allNotes) {
    if(isActive(blueGreen, 1)) {
        (*allNotes)++;
        if(pressedBlue >= 1) (*rightNotes)++;
    }
    else if(!isActive(blueGreen, 1) && pressedBlue >= 1) (*allNotes)++;

    if(isActive(blueGreen, 0)) {
        (*allNotes)++;
        if(pressedGreen >= 1) (*rightNotes)++;
    }
    else if(!isActive(blueGreen, 0) && pressedGreen >= 1) (*allNotes)++;

    if(isActive(redYellow, 1)) {
        (*allNotes)++;
        if(pressedRed>= 1) (*rightNotes)++;
    }
    else if(!isActive(redYellow, 1) && pressedRed >= 1) (*allNotes)++;

    if(isActive(redYellow, 0)) {
        (*allNotes)++;
        if(pressedYellow >= 1) (*rightNotes)++;
    }
    else if(!isActive(redYellow, 0) && pressedYellow >= 0) (*allNotes)++;

    pressedYellow = 0;
    pressedRed = 0;
    pressedGreen = 0;
    pressedBlue = 0;
}
