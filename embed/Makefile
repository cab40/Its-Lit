CC=gcc
CFLAGS="-Wall" "-lwiringPi"

lights: main.c
	$(CC) $(CFLAGS) -o lights main.c

.PHONY: clean run

run:
	./lights

clean:
	rm -rf ./lights
