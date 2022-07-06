// function to check if card number is valid using Luhns algorithm 

const validateCred = (arr) => {
  let algArr = [];
  
  //starting from right iterate to the left - every other digit is doubled. if doubled number is greater than 9, subtract 9
  
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    if ((arr[i] * 2) > 9) {
    algArr.push((arr[i] * 2) - 9);
    } else {
    algArr.push(arr[i] * 2);
    };
  };

  //merge remaining digits to new array and reduce to one total figure  
  
  for (let j = arr.length - 1; j >= 0; j -= 2) {
    algArr.push(arr[j]);
  };

  algArr = algArr.reduce((a, b) => {
    return a + b;
  });

  //divide total by 10. if integer then return true, if not then return false. 
  
  if (Number.isInteger(algArr / 10)) {
    return true;
  } else {
    return false;
  };
}

// function to return a nested array of invalid card numbers from a nested array of card numbers

const findInvalidCards = (nestedArr) => {
  let invalidCard = [];
  //check through array for valid/invalid, if invalid return new array of invalid cards.
  nestedArr.forEach(card => {
    if (validateCred(card) === false) {
      invalidCard.push(card)
    };
  });
   return invalidCard; 
  };

// function to identify credit card companies that have issued faulty card numbers. 

const idInvalidCardCompanies = (nestedArr) => {
  let digitOne = [];
  let providers = [];
  
  //take first digit of each card and add to array
  
  nestedArr.forEach(card => digitOne.push(card[0]));
  
  //check digits for the following providers and add them to a new array
  
  if(digitOne.some(digit => digit === 3))  {
    providers.push('Amex (American Express)');
  }; 
  if (digitOne.some(digit => digit === 4)) {
    providers.push('Visa');
  };
  if (digitOne.some(digit => digit === 5)) {
    providers.push('Mastercard');
  };
  if (digitOne.some(digit => digit === 6)) {
    providers.push('Discover');
  };
  if (digitOne.some(digit => digit != (3 && 4 && 5 && 6))) {
    providers.push('Company not found');
  }; 

  return providers;
};  

// function that accepts a string and converts into an array

const convertFromString = (str) => {

  //convert string into card array
  
  let stringCardArray = [];
  let cardArray = Array.from(String(str), Number);
  return cardArray;
};

// function to convert invalid numbers into valid numbers

const makeInvalidValid = (arr) => {

  // include code from validateCred function to carry out Luhn algorithm and find remainder when divided by 10. 
  // then iterate back through card number array and either add or subtract a number from the digits of the card number until card number is valid.

  let algArr = [];
  
  //starting from right iterate to the left - every other digit is doubled. if doubled number is greater than 9, subtract 9
  
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    if ((arr[i] * 2) > 9) {
      algArr.push((arr[i] * 2) - 9);
    } else {
      algArr.push(arr[i] * 2);
    };
  };

  //merge remaining digits to new array and reduce to one total figure  
  
  for (let j = arr.length - 1; j >= 0; j -= 2) {
    algArr.push(arr[j]);
  };

  algArr = algArr.reduce((a, b) => {
    return a + b;
  });

  //get remainder of total divided by 10. 

  let remainder = algArr % 10;
  
  //edit card number to absorb remainder by iterating from right to left and either adding or subtracting on to every other number. 

  for (let k = arr.length - 1; remainder > 0; k -= 2) {
    if (arr[k] >= remainder) {
      arr[k] -= remainder;
      remainder -= remainder;
    } else {
      if (arr[k] < 5) {
        let remPos = 9 - arr[k];
        if (remPos >= remainder) {
          arr[k] += remainder;
          remainder -= remainder;
        } else {
          arr[k] += remPos;
          remainder -= remPos;
        };
      } else {
        arr[k] -= arr[k];
        remainder -=arr[k];
      };
    };
  };
  return arr;
};

// for testing

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
