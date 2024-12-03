# MASTERMIND_digital

## About The Project
This was my final project for the “Programming Basics” module at my school. This game only works inside the Terminal. 
<br><br>
In Mastermind, the coder creates a secret number combination that the decryptor must guess. 
After each attempt, the decryptor gets feedback with 🔴, 🟡 and 🟢.
        
  🔴 = indicates how many numbers do not exist in the solution
  <br>
  🟡 = indicates how many numbers appear in the solution but are in the wrong place
  <br>
  🟢 = indicates how many numbers are on their right place

The decryptor has to find out the combination in as few attempts as possible.

#### Difficulty-Level:
You can select a difficulty level and a single-player or multiplayer mode for the game.
There are three different difficulty levels:
  * Easy:   Code length: 3, Attempts: 15
  * Normal:  Code length: 4, Attempts: 10
  * Hard:  Code length: 5, Attempts: 5

#### Singleplayermode: 
In singleplayer mode you play against the PC. This generates a code that corresponds to the difficulty level and then the player has the chance to guess it within the specified attempts.
Meanwhile, the attempts are counted and output at the end. When you have finished the game, you can restart the game within the game and redefine the modes.

#### Multiplayermode: 
In multiplayer mode, you play against a friend on the same PC. In the first round, the first player sets a code and the second player has to guess it. The roles then swap. At the end, the winner is crowned who has had the fewest attempts. You can also restart the game within the game afterwards

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With
In this module we were limited to Javascript only. Therefore, this game was only written in Javascript. 
However, I used chalk and prompt-synch to make the outputs in the appointment more visually responsive and the game more interactive. 
  * https://www.npmjs.com/package/chalk
  * https://www.npmjs.com/package/prompt-sync


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screenshots
![Screenshot1](/images/Screenshot_Mastermind_instructions.png) 
Instructions
<br>
<br>
![Screenshot2](/images/Screenshot_Mastermind_Singleplayer.png) 
Singleplayermode
<br>
<br>
![Screenshot3](/images/Screenshot_Mastermind_Multiplayer.png) 
<br>
Multiplayermode - Player selection
<br>
<br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
<!-- ## Roadmap


<p align="right">(<a href="#readme-top">back to top</a>)</p>
-->


<!-- CONTACT -->
## Contact

Judith Bohmann
<br><br>
Mail: ju.bohmann@gmx.de
<br><br>
Repo-Link: <a href="https://github.com/You-Did-Bowman/JavaScript-Practice"> github.com/You-Did-Bowman/JavaScript-Practice</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
