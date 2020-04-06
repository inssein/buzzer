# Buzzer

Very simple buzzer system.

## What does it do?

It does two very simple things:

1. It connects to a phone modem, and when a phone call is received, if the lock is open, it opens the door by dialing 9
2. Simple web page that allows you to control the status of the lock and shows you the last 10 entries.

## Requirements:

- Raspberry Pi (or anything to run this project)
- A connected phone modem

## Notes
I ended up using pm2 to auto start the server on a raspberry pi.
