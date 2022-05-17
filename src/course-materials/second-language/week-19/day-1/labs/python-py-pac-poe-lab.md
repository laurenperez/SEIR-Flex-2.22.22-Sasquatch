---
track: "Second Language"
title: "Python Py Pac Poe Group Lab"
week: 19
day: 3
type: "lab"
---


# Python Py Pac Poe Group Lab


<br>
<br>
<br>

## Getting Started

First, your team will create a file inside a folder locally on a teammate's machine and push to Github, the rest of the team will fork and clone a copy. 

<br>
<br>
<br>


## Py Pac Poe User Stories

1. As a player (AAP), I want to see a welcome message at the start:

	```text
	----------------------
	Let's play Py-Pac-Poe!
	----------------------
	```

<br>
<br>


2. AAP, before being prompted for a move, I want to see the board printed out in the console, so that I know what moves have been made:

	```text
	    A   B   C
	
	1)  X |   | O 
	   -----------
	2)    | X |  
	   -----------
	3)  X | O | O 
	  
	```

<br>
<br>


3. AAP, I want to be prompted with which player's move it is.

<br>
<br>


4. AAP, I want to be prompted on how to enter a valid move so that I don't make mistakes:

	```text
	    A   B   C
	
	1)  X |   | O 
	   -----------
	2)    | X |  
	   -----------
	3)  X | O | O 
	
	Player X's Move (example B2):  
	``` 

<br>
<br>


5. AAP, I want to be able to enter my move's column letter in upper or lower case (a/A, b/B or c/C) to make it easier to enter my move.

<br>
<br>


6. AAP, if I enter a move in an invalid format, or if I try to occupy a cell already taken, I want to see a message chastising me and be re-prompted:

```text
Player X's Move (example B2): Z9
Bogus move! Try again...

Player X's Move (example B2):
```

<br>
<br>


7. AAP, at the end of a game I want to see who won the game:

```shell
Player X wins the game!
```
or if it was a tie

```shell
Another tie!
```

<br>
<br>
<br>


## Hints

You can access, but not assign to global variables from within a function because it actually creates a new local variable instead (this is a downside of not have keywords like `let` in the language).

There's a couple of solutions.  One is use the `global` statement as follows:

```python
# Global variables
board = {}
turn = 'X'

# Will not work
def init_game():
	# Will not work because this creates a new variable
	# instead of assigning to the global board variable
	board = {
	'a1': None, `b1`: None, 'c1' None,
	# etc
	}
	turn = 'X'
	
# Do it like this
def init_game():
	# Use the global keyword to update global variables
	global board, turn
	board = {
	'a1': None, `b1`: None, 'c1' None,
	# etc
	}
	turn = 'X'
```

<br>
<br>


Using `global` is easy and works, however, it could be frowned upon by purists.
<br>
<br>


Another approach would be to use a global dictionary named something like `state`, which could then be mutated (updated) without a problem:
	
```python
	# Global variables
	state = {}
	
	# The following works
	def init_game():
	  state['board'] = {
	  	'a1': None, `b1`: None, 'c1' None,
	  	# etc
	  }
	  state['turn'] = 'X'
```

<br>
<br>

1. Think through the game play of Tic-Tac-Toe and, if necessary, pseudocode it.

1. Think about how/where looping makes sense, e.g., loop until the player enters a correct move, until the game's over, etc.

1. Write several small functions, each performing a single purpose, e.g., `init_game`, `print_board`, `get_move`, `get_winner`, etc.

1. Modeling the board itself as a dictionary and naming the keys appropriately, can simplify updating the board based upon what the player types in. For example, assume you store the player's input in a variable named `move`, you can convert it to lower case using `.lower()`, and use it as the key to access the board, i.e., `board[move]`.

1. The `in` operator is a great way to check if the player has entered a valid coordinate (`a1`, `b1`, etc.).

<br>
<br>
<br>


## Bonus User Stories

1. AAP, I want to be prompted for a number of wins to play to before playing the first game.

2. AAP, I want to see the score after each game has ended:

```shell
SCORE:
Player X: xx   Player O: xx   Ties: xx
```

<br>
<br>


3. AAP, I want to see a congratulatory message when either player achieves the entered number of wins to play to:

```shell
Congrats to player X for winning 2 games!
```