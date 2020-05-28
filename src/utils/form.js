const userForm = () => {
  const form = document.createElement('form');
  form.setAttribute('id', 'user-form');
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'enter name to play...');
  const submit = document.createElement('button');
  submit.innerText = 'start game';
  submit.setAttribute('type', 'submit');

  form.append(input, submit);
  return form;
};
const operationsBtn = () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'opsBtn');

  const restart = document.createElement('button');
  restart.innerText = 'Game scores';
  restart.setAttribute('type', 'button');
  restart.setAttribute('id', 'gameRestart');


  div.append(restart);
  return div;
};

const generateTableContent = (table, mydata) => {
  const tbody = table.createTBody();

  mydata.forEach((element) => {
    const row = tbody.insertRow();

    const cell = row.insertCell();
    const text = document.createTextNode(element.score);
    cell.appendChild(text);

    const cell1 = row.insertCell();
    const text1 = document.createTextNode(element.user);
    cell1.appendChild(text1);
  });
};
const generateTableHead = (table) => {
  const thead = table.createTHead();
  const row = thead.insertRow();

  const th = document.createElement('th');
  const text = document.createTextNode('score'.toUpperCase());
  th.appendChild(text);

  const th1 = document.createElement('th');
  const text1 = document.createTextNode('user'.toUpperCase());
  th1.appendChild(text1);

  row.append(th, th1);
};


export {
  userForm, operationsBtn, generateTableHead, generateTableContent,
};