class Level {
  constructor(grid, tileSize) {
    this.grid = grid;
    this.ts = tileSize;
  }

  // 检查坐标是否在地图内
  inBounds(r, c) {
    return r >= 0 && r < this.grid.length && c >= 0 && c < this.grid[0].length;
  }

  // 【关键修改】定义什么是"墙"
  // 只有 1 是墙。
  // 4 (岩浆) 必须返回 false，否则玩家走不上去，也就无法触发 sketch.js 里的复位逻辑。
  isWall(r, c) {
    let tile = this.grid[r][c];
    return tile === 1; 
  }

  draw() {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        let tile = this.grid[r][c];
        
        // 设置颜色
        if (tile === 1) fill(50);             // 墙 (灰)
        else if (tile === 0) fill(255);       // 地板 (白)
        else if (tile === 2) fill(0, 0, 255); // 起点 (蓝)
        else if (tile === 3) fill(0, 255, 0); // 终点 (绿)
        else if (tile === 4) fill(255, 50, 50); // 岩浆 (红/橙)!!!

        rect(c * this.ts, r * this.ts, this.ts, this.ts);
      }
    }
  }
}