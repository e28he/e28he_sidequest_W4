/*
Level.js

A Level represents ONE maze grid loaded from levels.json. 

Tile legend (from your original example): 
0 = floor
1 = wall
2 = start
3 = goal

Responsibilities:
- Store the grid
- Find the start tile
- Provide collision/meaning queries (isWall, isGoal, inBounds)
- Draw the tiles (including a goal highlight)
*/

class Level {
  constructor(grid, tileSize) {
    // Store the tile grid and tile size (pixels per tile).
    this.grid = grid;
    this.ts = tileSize;

    // Start position in grid coordinates (row/col).
    // We compute this by scanning for tile value 2. 
    this.start = this.findStart();

    // Optional: if you don't want the start tile to remain "special"
    // after you’ve used it to spawn the player, you can normalize it
    // to floor so it draws like floor and behaves like floor. 
    if (this.start) {
      this.grid[this.start.r][this.start.c] = 0;
    }
  }

  // ----- Size helpers -----

  rows() {
    return this.grid.length;
  }

  cols() {
    return this.grid[0].length;
  }

  pixelWidth() {
    return this.cols() * this.ts;
  }

  pixelHeight() {
    return this.rows() * this.ts;
  }

  // ----- Semantic helpers -----

  inBounds(r, c) {
    return r >= 0 && c >= 0 && r < this.rows() && c < this.cols();
  }

  tileAt(r, c) {
    // Caller should check inBounds first.
    return this.grid[r][c];
  }

  isWall(r, c) {
    return this.tileAt(r, c) === 1;
  }

  isGoal(r, c) {
    return this.tileAt(r, c) === 3;
  }

  // ----- Start-finding -----

  findStart() {
    // Scan entire grid to locate the tile value 2 (start). 
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        if (this.grid[r][c] === 2) {
          return { r, c };
        }
      }
    }

    // If a level forgets to include a start tile, return null.
    // (Then the game can choose a default spawn.)
    return null;
  }

  // ----- Drawing -----

  draw() { 
    // FIX 1: Use 'this.grid.length' to get the total number of rows
    for (let r = 0; r < this.grid.length; r++) {
      
      // FIX 2: Use 'this.grid[r].length' to get the columns in the current row
      for (let c = 0; c < this.grid[r].length; c++) {
        
        let tile = this.grid[r][c];
  
        // Set the color based on the tile number
        if (tile === 1) {
          fill(50);             // Wall
        } else if (tile === 0) {
          fill(255);            // Floor
        } else if (tile === 2) {
          fill(0, 0, 255);      // Start
        } else if (tile === 3) {
          fill(0, 255, 0);      // Goal
        } else if (tile === 4) { 
          fill(255, 50, 50);    // Lava
        }
  
        // Draw the rectangle
        // x position = column * tileSize
        // y position = row * tileSize
        rect(c * this.ts, r * this.ts, this.ts, this.ts);
      }
    }
  }
}
