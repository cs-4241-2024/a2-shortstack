## article publisher

Anthony Titcombe
https://webware-a3-7443f86eaef6.herokuapp.com/

The article website allows users to publish the article on their mind and see the ones they have already published. they can create, read, edit, and delete their favorite articles. They can only access this features if they are a logged in user. else they will be redirected to the index page. The challenges i faced where with implementing the oauth because I was misunderstanding the redirect uri and also integrating it with the cookies. I choise the github oauth strategy because you said it was the hardest. I like challenges. I used native CSS because it worked good for my use case with tables and simple user experience.

Technical achievement 1
I used Girhub oauth for authentication and users. I used their username to associate their data and register the users.

Technical 2:
I hosted the website on heroku rather than glitch. What I like about heroku is the support for scaling and abstracting a lot of enginerring work like logging. Makes a little sense why it's paid instead of the free tier at Glitch. It had a lot of different envornments, supported staging, auto deployment from github, etc.

Technical 3:
I also scored a 100% on the light house tests. Attach image to repository

Technical 4:
The 5 middleware packages: 
body parser: I used it to parse the body of the http request I sent
cookie parser: I used it for parsing the cookie header and adding coodkie data
Cookie session: used it for session management for the cookie
morgan: i used morgan while developing for logigin the requests and errors
express session: used it as well for creating and managing sessions.
