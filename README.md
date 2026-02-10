## Project Title

GBDA302 Week 4 Side Quest: Enhanced maze with lava (Red Tile)

---

## Authors

Emily He

---

## Description

This project is a tile-based maze game built using p5.js. Based on the "Week 4 Example 3" curriculum, it demonstrates how to separate game data from game logic by loading level designs from an external JSON file.
---

## Learning Goals

Learning Goals:

- I implemented a check in the movement loop to detect specific tile values. This allows the game to distinguish between walls (block movement), lava (reset position), and goals (load next level).
- I practiced separating responsibilities. The Level class handles drawing the different terrain colors, while the Player class handles movement, and the sketch.js file manages the game state (winning/losing).
- Level.js (grid + drawing + tile meaning)
- Player.js (position + movement rules)

---

## Assets

N/A

---

## GenAI

I used the starter code provided by Dr. Karen Cochrane and David Han (Week 4 Examples) as the foundation. I used GenAI (Gemini) to help troubleshoot my collision detection logic—specifically why the player wasn't resetting when touching the lava and to help generate the comments that explain the new functions in sketch.js.
---
