# How to use

## Machine 1:
Run chat `$ ./main-linux`
Chat output: `server listening 0.0.0.0:4123`

Memorise the port

## Machine 2:
Run chat `$ ./main-linux [dport] [dipaddr]`, on localhost is enough dport.

Chat output: `server listening 0.0.0.0:54123`, remember port.

Machine 1 to identify second machine it should receive its ip and addr for that from Machine 2 we have to send any message:
`Write: Hi!`

Now we can chat with each other!
