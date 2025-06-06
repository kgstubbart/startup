[My startup](https://startup.libraryace.click/)

## Helpful links

- [MDN](https://developer.mozilla.org)

## WebSocket Notes

WebSocket for Library Ace was significantly easier than past projects, especially the WebSockets implemented in Chess. I believe a large reason for this is I have spent more time in other phases of deployment getting a framework for these WebSockets in. My WebSocket implementation is very similar to Simon which was a very helpful guide on my own functions. Testing on my machine took time because I had to figure out how to tell if the recent aces were going through WebSocket or still through the database, which I learned to tell by not seeing a fetch command from another users prospective.

## DB Notes

After using MySQL in my chess application and using MongoDB here, I believe I enjoy SQL more. This was a bit more streamlined but I felt as though I had more access with SQL and it was a bit more clear. Adding the database after doing the service was quite simple though, essentially just adding a line to most functions in my service/index.js and redoing some logic in the database.js.

## Service Notes

Should have started with service endpoints since I ended up adding functionality without and needed to chnage it. Making sure to connect all endpoints is important. I forgot to fetch the login/createUser/logout endpoints and that made me think something else was wrong when testing when, in reality, it was that no authentication was actually being passed through.

## React Pt2 Notes

Keeping things organized was the most difficult part of this phase. Adding mock capabilities will be extremely useful for future phases. Local storage is easy to access but not a long term solution. Passing through variables was also important.

## React Pt1 Notes

Headers changed for different pages, meaning basic template did not transfer over correctly. I needed to make a seperate header.jsx file, and then import it into app.jsx. The header.jsx checked page location to find if additions to header are necessary. For future cleanup, I may be able to reduce code lines in my locations checks in header.jsx.

## CSS Notes

Bootstrap is very useful if you are going for a singular design, it gets a bit harder to use if you want more freedom. For example, I wanted the My Ace button to match the color scheme to the website, meaning I had to custom design that button yet match it to the bootstrap buttons I had used. Poeple notice slight changes, so I made sure to even get the hover color similar in shade difference. Some CSS items are very easy to carry over between pages, and add much better visual appeal to the site.

## HTML Notes

I learned that without CSS, paragraph spacing is difficult to work with. Sometimes there are ways around it, such as span tags, but the p tag didn't really work. Making sure to get spacing right is important, which I had to deal with a bit for my buttons to make suure they weren't located in a weird spot.
