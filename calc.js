const get2Expression = (exp) => {
  let first = null;
  let second = null;
  let i = 0;
  let start = 0;
  let count = 0;

  if (exp[i] === "(") {
    count++;
    for (let j = i + 1; j < exp.length; j++) {
      const c = exp[j];
      if (c === "(") count++;
      if (c === ")") {
        count--;
        if (!count) {
          first = expFormatter(exp.slice(i, j + 1));
          i = j + 2;
          j = exp.length;
        }
      }
    }
  } else {
    const end = exp.slice(start).indexOf(" ");
    first = parseInt(exp.slice(start, start + end));
    i = start + end + 1;
  }

  if (exp[i] === "(") {
    second = expFormatter(exp.slice(i, -1));
  } else {
    second = parseInt(exp.slice(i, -1));
  }

  return { first, second };
};

const expFormatter = (exp) => {
  const lastIndexFunc = exp.indexOf(" ");
  const isAdd = exp.slice(1, lastIndexFunc) === "add";

  const { first, second } = get2Expression(exp.slice(lastIndexFunc + 1));

  return isAdd ? first + second : first * second;
};

const getResult = (exp) => {
  if (exp[0] !== "(") return parseInt(exp);
  return expFormatter(exp);
};

const { argv } = process;
const userInput = argv[2];

const result = getResult(userInput);
console.log(result);
