// First alqoritmic task, function for cardinality number

function number_cardinality(number) {
   let lastDigit1Str = String(number).slice(-1)
   let lastDigit1Num = Number(lastDigit1Str)
   let arr = []
   if(lastDigit1Num == 0) {
    arr.push('zero')
   }
   else if(lastDigit1Num == 5){
      arr.push('five')
   }else if(lastDigit1Num %2 == 0 && lastDigit1Num !== 0){
      arr.push('even')
   }else if(lastDigit1Num %2 == 1 && lastDigit1Num !== 5){
      arr.push('odd')
   }else {
      arr.push(lastDigit1Num)
   }
   console.log(arr)
}
number_cardinality()

// Second alqoritmik task,function for check sudoku
const newGrid = (size) => {
  let arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = new Array(size);
  }
  for (let i = 0; i < Math.pow(size, 2); i++) {
    arr[Math.floor(i / size)][i % size] = 0;
  }
  return arr;
};

const isColSafe = (grid, col, value) => {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};
const isRowSafe = (grid, col, value) => {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};
const isBoxSafe = (grid, box_row, box_col, value) => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row + box_row][col + box_col] === value) return false;
    }
  }
};
const isSafe = (grid, row, col, value) => {
  return (
    isColSafe(grid, col, value) &&
    isRowSafe(grid, row, value) &&
    isBoxSafe(grid, row - (row % 3), col - (col % 3), value) &&
    value !== 0
  );
};
const findUnassignedPos = (grid, pos) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        pos.row = row;
        pos.col = col;
        return true
      }
    }
  }
  return false;
};
const shuffleArray = (arr) => {
    let curr_index = arr.length;

    while (curr_index !== 0) {
        let rand_index = Math.floor(Math.random() * curr_index);
        curr_index -= 1;

        let temp = arr[curr_index];
        arr[curr_index] = arr[rand_index];
        arr[rand_index] = temp;
    }

    return arr;
}

// check puzzle is complete
const isFullGrid = (grid) => {
    return grid.every((row, i) => {
        return row.every((value, j) => {
            return value !== 0;
        });
    });
}

const sudokuCreate = (grid) => {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let unassigned_pos = {
        row: -1,
        col: -1
    }

    if (!findUnassignedPos(grid, unassigned_pos)) return true;

    let number_list = shuffleArray(...numbers);

    let row = unassigned_pos.row;
    let col = unassigned_pos.col;

    number_list.forEach((num, i) => {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;

            if (isFullGrid(grid)) {
                return true;
            } else {
                if (sudokuCreate(grid)) {
                    return true;
                }
            }

            grid[row][col] = 0;
        }
    });

    return isFullGrid(grid);
}

const sudokuCheck = (grid) => {
    let unassigned_pos = {
        row: -1,
        col: -1
    }

    if (!findUnassignedPos(grid, unassigned_pos)) return true;

    grid.forEach((row, i) => {
        row.forEach((num, j) => {
            if (isSafe(grid, i, j, num)) {
                if (isFullGrid(grid)) {
                    return true;
                } else {
                    if (sudokuCreate(grid)) {
                        return true;
                    }
                }
            }
        })
    })

    return isFullGrid(grid);
}
let su_answer = undefined;
const isGameWin = () => sudokuCheck(su_answer);