const getResult = (exp) => {
  if (exp[0] !== "(") return parseInt(exp);
  return "";
}

const { argv } = process;
const userInput = argv[2];

const result = getResult(userInput)
console.log(result);