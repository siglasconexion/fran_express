const huevopelao = require("jspdf");
console.log(huevopelao);
const doc = new huevopelao();

doc.text("Hello world!", 10, 80);
doc.save("a4.pdf");
