const get2Exp = (exp) => {

  // i is the index that seperate the 2 expression/integer
  let i = 0;

  if (exp[i] !== "(") {
    // the first expression is an integer
    i = exp.indexOf(" ");
  } else if (exp[exp.length - 1] !== ")") {
    // the second expression is an integer
    const words = exp.split(" ");
    i = exp.length - words[words.length - 1].length - 1;
  } else {
    // both expression are not an integer
    let count = 1;
    for (let j = i + 1; j < exp.length && count; j++) {
      const c = exp[j];
      if (c === "(") count++;
      if (c === ")") {
        count--;
        if (!count) i = j + 2;
      }
    }
  }

  return {
    num1: getResult(exp.slice(0, i)),
    num2: getResult(exp.slice(i + 1)),
  };
};

const getExpAnswer = (exp) => {
  const lastIndexFunc = exp.indexOf(" ");
  const isAdd = exp.slice(1, lastIndexFunc) === "add";

  const { num1, num2 } = get2Exp(exp.slice(lastIndexFunc + 1, -1));

  return isAdd ? num1 + num2 : num1 * num2;
};

const getResult = (exp) => {
  if (exp[0] !== "(") return parseInt(exp);
  return getExpAnswer(exp);
};

const { argv } = process;
const userInput = argv[2];

const result = getResult(userInput);
console.log(result);
