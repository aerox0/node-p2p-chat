# How to use

## Machine 1: ./main-linux
`server listening 0.0.0.0:4123`
Memorise the port

## Machine 2: ./main-linux [dport] [dipaddr]
On localhost is enough dport
`server listening 0.0.0.0:54123`
Machine 1 to identify second machine it should receive its ip and addr for that from Machine 2 we send any message:
`Write: Hi!`

Now we can chat with each other!
