let array = [];
const arraySize = 30;
const arrayContainer = document.getElementById("array-container");
const descriptionContainer = document.getElementById(
  "algorithm-description-container"
);

function generateArray() {
  array = Array.from(
    { length: arraySize },
    () => Math.floor(Math.random() * 200) + 20
  );
  drawArray();
  setDescription();
}

function setDescription() {
  const algorithm = document.getElementById("algorithm").value;
  let description = "";

  switch (algorithm) {
    case "bubbleSort":
      description = `
        <h3>Bubble Sort</h3>
        <p>Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The algorithm keeps going until no more swaps are needed.</p>
        <p>Speed: O(n^2). Bubble Sort is generally inefficient for large datasets.</p>
        <p>Preferred For: Learning purposes, not for production or large data sets.</p>
      `;
      break;
    case "insertionSort":
      description = `
        <h3>Insertion Sort</h3>
        <p>Insertion Sort works by building a sorted portion of the array, one element at a time. It takes each element from the unsorted portion and inserts it into its correct position in the sorted portion.</p>
        <p>Speed: O(n^2). Works better than bubble sort for partially sorted data.</p>
        <p>Preferred For: Small datasets or nearly sorted data.</p>
      `;
      break;
    case "mergeSort":
      description = `
        <h3>Merge Sort</h3>
        <p>Merge Sort is a divide and conquer algorithm. It divides the array into two halves, recursively sorts each half, and then merges the sorted halves back together.</p>
        <p>Speed: O(n log n). Merge Sort is much faster than Bubble and Insertion Sort for large datasets.</p>
        <p>Preferred For: Large datasets and when stability is required.</p>
      `;
      break;
    case "quickSort":
      description = `
        <h3>Quick Sort</h3>
        <p>Quick Sort is another divide and conquer algorithm. It selects a pivot element, partitions the array into two subarrays around the pivot, and recursively sorts them.</p>
        <p>Speed: O(n log n) on average, but O(n^2) in the worst case.</p>
        <p>Preferred For: Large datasets and when average-case performance is critical.</p>
      `;
      break;
  }

  descriptionContainer.innerHTML = description;
  resetTime();
}

document.getElementById("algorithm").addEventListener("change", setDescription);

function drawArray() {
  arrayContainer.innerHTML = "";
  array.forEach((height) => {
    const bar = document.createElement("div");
    bar.style.height = `${height}px`;
    bar.classList.add("array-bar");
    arrayContainer.appendChild(bar);
  });
}

function resetTime() {
  document.getElementById("time-taken").innerText = `Time Taken: 0 seconds`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".array-bar");
  let startTime = Date.now();
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        const tempHeight = bars[j].style.height;
        bars[j].style.height = bars[j + 1].style.height;
        bars[j + 1].style.height = tempHeight;
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await sleep(50);
      }
    }
  }
  let endTime = Date.now();
  document.getElementById("time-taken").innerText = `Time Taken: ${
    (endTime - startTime) / 1000
  } seconds`;
}

async function insertionSort() {
  const bars = document.querySelectorAll(".array-bar");
  let startTime = Date.now();
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      j = j - 1;
      await sleep(50);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
  let endTime = Date.now();
  document.getElementById("time-taken").innerText = `Time Taken: ${
    (endTime - startTime) / 1000
  } seconds`;
}

async function mergeSort(arr = array, l = 0, r = array.length - 1) {
  const bars = document.querySelectorAll(".array-bar");
  let startTime = Date.now();
  if (l >= r) return;
  const m = Math.floor((l + r) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m + 1, r);
  await merge(arr, l, m, r, bars);

  let endTime = Date.now();
  document.getElementById("time-taken").innerText = `Time Taken: ${
    (endTime - startTime) / 1000
  } seconds`;
}

async function merge(arr, l, m, r, bars) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0,
    j = 0,
    k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }
    k++;
    await sleep(50);
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${left[i]}px`;
    i++;
    k++;
    await sleep(50);
  }
  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${right[j]}px`;
    j++;
    k++;
    await sleep(50);
  }
}

async function quickSort(arr = array, low = 0, high = array.length - 1) {
  const bars = document.querySelectorAll(".array-bar");
  let startTime = Date.now();
  if (low < high) {
    let pi = await partition(arr, low, high, bars);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
  let endTime = Date.now();
  document.getElementById("time-taken").innerText = `Time Taken: ${
    (endTime - startTime) / 1000
  } seconds`;
}

async function partition(arr, low, high, bars) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = `${arr[i]}px`;
      bars[j].style.height = `${arr[j]}px`;
      await sleep(50);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = `${arr[i + 1]}px`;
  bars[high].style.height = `${arr[high]}px`;
  await sleep(50);
  return i + 1;
}

async function startSort() {
  const algorithm = document.getElementById("algorithm").value;
  switch (algorithm) {
    case "bubbleSort":
      await bubbleSort();
      break;
    case "insertionSort":
      await insertionSort();
      break;
    case "mergeSort":
      await mergeSort();
      break;
    case "quickSort":
      await quickSort();
      break;
  }
}

generateArray();
