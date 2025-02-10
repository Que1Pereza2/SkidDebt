# SkidDebt
 Subscription manager app - 'All your subscriptions, all over the place!'

This nodeJS API will aid the client with subscriptions management. It will use
Express.js as a framework for the routes and HTTP requests and MongoDB as a 
 database to store the users and their subscriptions.

The API needs to implement JWT for the user login, bcrypt for the password hash 
 apart from the basic elements already mentioned.

The API will has the following end points:
	Authentication
		• POST /api/auth/register → signing up a new user.
		• POST /api/auth/login → Logging in a user and generating the JWT token.
	Subscriptions (all requires authentication)
		• POST /api/subscriptions → Create a new subscription.
		• GET /api/subscriptions → Show all subscriptions.
		• PUT /api/subscriptions/:id → Modify an existing subscription.
		• DELETE /api/subscriptions/:id → Eliminate a subscription.

JWT basics
	JWT (JSON Web Token) is the standard when authenticating or sharing 
information safely between two parties (server - client).
	It's commonly used in RESTful API tu authenticate instead of traditional 
methods.
	
	JWT is a long string composed of 3 parts which are separated by periods( . ).
		
		Header 										Payload												Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiJKdWFuIiwiaWF0IjoxNjg4MDAwMDB9.tXWvBOeJ_hR8KljVRhG2xO9m7d8Ptd_bTzJ1JoOj5EA
	
	JWT is used to manage sessions without depending on cookies or data base 
 calls in every request. Here is the process fleshed out.
		The user logs in
			The user sends his credentials trough a POST/Login and if they are 
         correct the server responds with a JWT
		
		The user uses the token on every request
			The user stores the token and uses it in subsequent request.
			In order to use it the user needs to placethe token in the header
             Authorization.
				ex:
					GET /api/profile
					Authorization: Bearer <JWT>
			
		The server verifies the token
			When the server recieves the token it verifies it's authenticity
         using the sercret key.
		
		If the token is valid it executes the request.
		If the token it's invalid of it expired the server returns the error 
     403 - Invalid Token.