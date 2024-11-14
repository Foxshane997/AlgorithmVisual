let array = [];
let searchAlgorithm = "linearSearch";
let target = -1;

document.addEventListener('DOMContentLoaded', function () {
  generateArray();
  updateSearchableNumbers();
  updateAlgorithmDescription();
});

function setSearchAlgorithm() {
  searchAlgorithm = document.getElementById("algorithm").value;
  generateArray();
  updateSearchableNumbers();
  updateAlgorithmDescription();
}

function generateArray() {
  if (searchAlgorithm === "binarySearch") {
    array = [1, 5, 8, 10, 12, 14, 18, 20, 23, 25];
  } else if (searchAlgorithm === "jumpSearch") {
    array = [2, 4, 7, 10, 13, 16, 19, 21, 24, 27];
  } else if (searchAlgorithm === "exponentialSearch") {
    array = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  } else {
    array = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
  }

  target = Math.floor(Math.random() * 100);
  updateVisualization();
}

function updateVisualization() {
  const container = document.getElementById("array-display");
  container.innerHTML = `Array: ${array.join(", ")}`;
}

function updateSearchableNumbers() {
  const searchableContainer = document.getElementById("searchable-numbers");
  let searchableNumbers = "";

  if (searchAlgorithm === "binarySearch") {
    searchableNumbers =
      "You can search for numbers in this sorted array: 1, 5, 8, 10, 12, 14, 18, 20, 23, 25";
  } else if (searchAlgorithm === "jumpSearch") {
    searchableNumbers =
      "You can search for numbers in this sorted array: 2, 4, 7, 10, 13, 16, 19, 21, 24, 27";
  } else if (searchAlgorithm === "exponentialSearch") {
    searchableNumbers =
      "You can search for numbers in this sorted array: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512";
  } else {
    searchableNumbers =
      "You can search for numbers in this unsorted array: 3, 5, 7, 9, 11, 13, 15, 17, 19, 21";
  }
  searchableContainer.innerHTML = searchableNumbers;
}

function updateAlgorithmDescription() {
  const algorithmDescriptionContainer = document.getElementById("algorithm-description");

  if (searchAlgorithm === "linearSearch") {
    algorithmDescriptionContainer.textContent =
      "Linear Search: This algorithm checks each element of the array one by one until the desired element is found or the end of the array is reached. It's simple but can be slow for large arrays.";
  } else if (searchAlgorithm === "binarySearch") {
    algorithmDescriptionContainer.textContent =
      "Binary Search: This algorithm works on sorted arrays. It repeatedly divides the search interval in half, quickly narrowing down the possible locations of the target value. Very efficient for large datasets.";
  } else if (searchAlgorithm === "jumpSearch") {
    algorithmDescriptionContainer.textContent =
      "Jump Search: This algorithm is designed for sorted arrays. It checks values at intervals (jumps) and then performs a linear search within the identified block. It's faster than linear search but less efficient than binary search.";
  } else if (searchAlgorithm === "exponentialSearch") {
    algorithmDescriptionContainer.textContent =
      "Exponential Search: This algorithm starts by checking increasingly larger ranges of elements and then uses binary search in the identified range. It's efficient for very large sorted datasets.";
  }
}

function handleSearchInput() {
  const searchValue = parseInt(
    document.getElementById("search-input").value,
    10
  );
  let resultMessage = "";

  if (array.includes(searchValue)) {
    resultMessage = `Number ${searchValue} found in the array!`;
  } else {
    resultMessage = `Number ${searchValue} not found in the array.`;
  }

  document.getElementById("result").textContent = resultMessage;
}
