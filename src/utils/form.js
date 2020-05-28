const userForm = () => {
  const form = document.createElement('form');
  form.setAttribute("id", "user-form")
  const input = document.createElement('input');
  input.setAttribute('placeholder', 'enter name to play...');
  const submit = document.createElement('button');
  submit.innerText = "start game"
  submit.setAttribute("type", "submit")

  form.append(input, submit);
  return form
}
const operationsBtn = () => {
  const div = document.createElement('div');
  div.setAttribute('id', "opsBtn")

  const restart = document.createElement('button');
  restart.innerText = "Game scores"
  restart.setAttribute("type", "button")
  restart.setAttribute('id', "gameRestart")

  
  

  div.append(restart)
  return div

}

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
}
const generateTableHead = (table, mydata) => {
    const thead = table.createTHead();
    const row = thead.insertRow();
    const data = Object.keys(mydata[0]);
    data.forEach((key) => {
      const th = document.createElement('th');
      const text = document.createTextNode(key.toUpperCase());
      th.appendChild(text);
      row.appendChild(th);
    });
  
}



export { userForm, operationsBtn, generateTableHead, generateTableContent}