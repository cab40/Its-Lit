CC=gcc
CFLAGS="-Wall" "-lwiringPi"

lights: main.c
	$(CC) $(CFLAGS) -o lights main.c

.PHONY: clean 

clean:
	rm -rf ./lights
