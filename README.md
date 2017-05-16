# Mastermind Game

A few years ago I built a version of the code breaking game Mastermind. It works well but looking back, the code has lots of room for improvement. I'm currently rebuilding in React and making it responsive.

Original repo is here: [Old Version](https://github.com/lwalker5/mastermind)  
Older working version: [Mastermind](http://lindsaymwalker.com/mastermind/)


React version in progress: [Mastermind React](http://lindsaymwalker.com/mastermind-react/dist/index.html)

Technologies used: React, ES6, Babel, Webpack

The gist of the game is this:
Upon starting, a random sequence of colors is generated of either 4, 5, or 6 pegs depending on the difficulty chosen. For each row the player selects a combination of colors in hopes of matching it with the sequence generated. The program responds with some clues in the form of white and black pegs in no particular order. White indicates a correct color and black indicates a correct color and spot. Using the information the goal is to break the code in as few rows as possible. 

![Gameplay screenshot](/mastermind_screencap.png?raw=true "Winning Game")