const todoDataValidation = ({ todoText }) => {
  return new Promise((resolve, reject) => {
    if (!todoText) reject("Kuch to likh k de bhai!!!!");

    if (typeof todoText !== "string") reject("It is not a text");

    if (todoText.length < 3 || todoText > 100) reject("3 se 100 sabdo k bich likna hai!!!!");

    resolve();
  });
};

module.exports = { todoDataValidation };
