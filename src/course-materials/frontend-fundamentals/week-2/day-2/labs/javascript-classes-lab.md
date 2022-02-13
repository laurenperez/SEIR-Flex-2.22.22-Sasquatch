---
track: "Frontend Fundamentals"
title: "JavaScript Classes Lab"
week: 2
day: 2
type: "lab"
---

# JavaScript Classes Lab

<br>
<br>
<br>

## Intro

Now that you've learned about using **classes** in JavaScript to create objects, it's time for some practice! <br>In this lab, you will choose one of the object hierarchies below, **Bank Accounts** or **People**, and write the classes to implement it.

<br>
<br>

## Setup

Create a `JavaScript` `REPL` from [repl.it](https://repl.it) -- you can name it `"JavaScript Classes Lab"`.`

<br>
<br>

### Bank Accounts

**`BankAccount`** class:

| Derived From |                                  Properties                                  |        Methods        |
| :----------: | :--------------------------------------------------------------------------: | :-------------------: |
|     n/a      | `ownerName`, `balance`, `acctNum` (generated in constructor - not passed in) | `deposit`, `withdraw` |

**`CheckingAccount`** class:

| Derived From  | Additional Properties |                 Additional Methods                 |
| :-----------: | :-------------------: | :------------------------------------------------: |
| `BankAccount` |  `overdraftEnabled`   | Override `withdraw` to implement overdraft feature |

**`SavingsAccount`** class:

| Derived From  | Additional Properties |                    Additional Methods                     |
| :-----------: | :-------------------: | :-------------------------------------------------------: |
| `BankAccount` |         None          | Override `withdraw` to disallow withdrawals completely :) |

<br>
<br>

### People

**`Person`** class:

| Derived From |       Properties        |  Methods   |
| :----------: | :---------------------: | :--------: |
|     n/a      | `firstName`, `lastName` | `sayHello` |

**`Employee`** class:

| Derived From |                        Additional Properties                        |                          Additional Methods                          |
| :----------: | :-----------------------------------------------------------------: | :------------------------------------------------------------------: |
|   `Person`   | `company`, `wage` (string), `active` (set to `true` in constructor) | `receiveRaise` (updates `wage`), `terminate` (set `active` to false) |

**`Manager`** class:

| Derived From | Additional Properties |                         Additional Methods                          |
| :----------: | :-------------------: | :-----------------------------------------------------------------: |
|  `Employee`  |     `department`      | `giveRaise` (calls `receiveRaise` on Employee object passed as arg) |

**`Worker`** class:

| Derived From |           Additional Properties           |     Additional Methods     |
| :----------: | :---------------------------------------: | :------------------------: |
|  `Employee`  | `manager` (references a `Manager` object) | Your choice - be creative! |
