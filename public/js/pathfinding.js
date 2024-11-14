document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("grid-container");
  const rows = 20;
  const cols = 20;
  let startNode = null;
  let endNode = null;

  function createGrid() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener("click", () => handleCellClick(cell));
        gridContainer.appendChild(cell);
      }
    }
  }

  function handleCellClick(cell) {
    if (!startNode) {
      startNode = cell;
      cell.classList.add("start");
    } else if (!endNode) {
      endNode = cell;
      cell.classList.add("end");
    } else {
      cell.classList.add("obstacle");
    }
  }

  document.getElementById("reset-btn").addEventListener("click", () => {
    gridContainer.innerHTML = "";
    startNode = null;
    endNode = null;
    createGrid();
  });

  document.getElementById("visualize-btn").addEventListener("click", () => {
    if (!startNode || !endNode) {
      alert("Please set both start and end points!");
      return;
    }
    visualizePathfinding();
  });

  async function visualizePathfinding() {
    const queue = [];
    const visited = new Set();
    const startCoords = [
      parseInt(startNode.dataset.row),
      parseInt(startNode.dataset.col),
    ];
    const endCoords = [
      parseInt(endNode.dataset.row),
      parseInt(endNode.dataset.col),
    ];
    queue.push([startCoords, []]);

    while (queue.length) {
      const [[row, col], path] = queue.shift();
      const key = `${row},${col}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (
        !cell.classList.contains("start") &&
        !cell.classList.contains("end")
      ) {
        cell.classList.add("visited");
      }
      await delay(50);
      if (row === endCoords[0] && col === endCoords[1]) {
        showPath(path);
        return;
      }

      const neighbors = getNeighbors(row, col);
      for (const [nRow, nCol] of neighbors) {
        if (!visited.has(`${nRow},${nCol}`)) {
          queue.push([
            [nRow, nCol],
            [...path, [nRow, nCol]],
          ]);
        }
      }
    }
  }

  function getNeighbors(row, col) {
    const directions = [
      [0, 1], // Right
      [1, 0], // Down
      [0, -1], // Left
      [-1, 0], // Up
    ];
    const neighbors = [];
    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (
        r >= 0 &&
        r < rows &&
        c >= 0 &&
        c < cols &&
        cell &&
        !cell.classList.contains("obstacle")
      ) {
        neighbors.push([r, c]);
      }
    }
    return neighbors;
  }

  async function showPath(path) {
    for (const [row, col] of path) {
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (
        !cell.classList.contains("start") &&
        !cell.classList.contains("end")
      ) {
        cell.classList.add("path");
      }
      await delay(100);
    }
  }
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  createGrid();
});
