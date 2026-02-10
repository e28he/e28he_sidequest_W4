let levelsData;   // JSON data loaded from the file
let world;        // The current Level object
let player;       // The Player object
let currentLevel = 0; // Index of the current level
let tileSize = 40;    // Size of each tile in pixels

// Global variables: track the start position (2) for the current level
// We need this to reset the player if they hit lava
let startRow = 1;
let startCol = 1;

function preload() {
  // Load the JSON file before the game starts
  levelsData = loadJSON("levels.json");
}

function setup() {
  createCanvas(400, 400); 

  // 1. Create the Player instance (only need to do this once)
  player = new Player(tileSize);

  // 2. Load the first level
  loadCurrentLevel();
}

function draw() {
  background(220);
  
  // Draw the world first (background), then the player (foreground)
  if (world) world.draw();
  if (player) player.draw();
}

function keyPressed() {
  // If the world or player hasn't loaded yet, do nothing
  if (!world || !player) return;

  // 1. Attempt to move
  // The player class handles wall collisions (Tile 1) internally
  let moved = false;
  if (keyCode === UP_ARROW)    moved = player.tryMove(world, -1, 0);
  if (keyCode === DOWN_ARROW)  moved = player.tryMove(world, 1, 0);
  if (keyCode === LEFT_ARROW)  moved = player.tryMove(world, 0, -1);
  if (keyCode === RIGHT_ARROW) moved = player.tryMove(world, 0, 1);

  // 2. Logic to check what tile the player is standing on after moving
  if (moved) {
    let currentTile = world.grid[player.r][player.c];

    // --- CASE A: Stepped on Lava (4) ---
    if (currentTile === 4) {
      console.log("Stepped on lava! Resetting to start...");
      player.setCell(startRow, startCol); // Reset position to the start of the level
    }

    // --- CASE B: Reached the Goal (3) ---
    if (currentTile === 3) {
      console.log("Level Complete! Loading next level...");
      
      // Increment level index
      currentLevel++;

      // Check if there are more levels in the JSON data
      if (currentLevel < levelsData.levels.length) {
        loadCurrentLevel(); // Load the new level data
      } else {
        console.log("Congratulations! You have finished all levels!");
        noLoop(); // Stop the game loop
        // Optional: You could reset currentLevel = 0 here to loop the game
      }
    }
  }
}

// --- Helper Function: Handles loading level data ---
function loadCurrentLevel() {
  // 1. Get the grid array for the current level index
  let levelGrid = levelsData.levels[currentLevel];

  // 2. Create a new Level object with this grid
  world = new Level(levelGrid, tileSize);

  // 3. Resize canvas to fit the new level dimensions (Optional but recommended)
  // This ensures the whole map is visible if levels have different sizes
  resizeCanvas(world.grid[0].length * tileSize, world.grid.length * tileSize);

  // 4. Find the Start Position (2) in the new grid
  // We scan the array to find where the player should start
  for (let r = 0; r < world.grid.length; r++) {
    for (let c = 0; c < world.grid[r].length; c++) {
      if (world.grid[r][c] === 2) {
        startRow = r;
        startCol = c;
      }
    }
  }

  // 5. Move the player to the found start position
  player.setCell(startRow, startCol);
}