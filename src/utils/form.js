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
  restart.innerText = "restart game"
  restart.setAttribute("type", "button")
  restart.setAttribute('id', "gameRestart")

  const stop = document.createElement('button');
  stop.innerText = "stop game"
  stop.setAttribute("type", "button")
  stop.setAttribute('id', "stop")

  div.append(restart)
  return div

}

export { userForm, operationsBtn}