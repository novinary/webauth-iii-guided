dependecies 
- express
- helment
- nodemon --dev
- knex and sqlite3
- add bcryptjs

client > orders (decide cascade stragegy)

.onUpdate('CASCADE')
.onDelete('RESTRICT')

workflow
- user logs in 
- server creates a session and provides a cookie with session info
- subsequent requests the client sends the cookie
- server checks the cookie find find the session and provides/denies access

OAuth2: authorization framework.
Open ID Connect: authentication.

Tokens:
- authentication/id token     who are you?
- acces/authorization token   what can you do?
- referesh token. 


working with JWTs

Server's responsbility
- producing the token
- sending the token to the client
- reading the token from the request
- verifying the token is valid
- providing data(payload) from the token to the rest of the application

client's responsibility
- store the token and hold on to it
- send the token on every request
- on logout, destroy the token

- yarn add jsonwebtoken