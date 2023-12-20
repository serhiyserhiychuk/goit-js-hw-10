const form = document.querySelector('.feedback-form');
const email = form.elements.email;
const message = form.elements.message;
const localStorageKey = 'feedback-form-state';

function setFormValues() {
  const isInStorage = localStorage.getItem(localStorageKey);
  if (isInStorage) {
    const storageObj = JSON.parse(isInStorage);
    email.value = storageObj.email;
    message.value = storageObj.message;
  }
}

setFormValues();

form.addEventListener('input', inputHandler);

function inputHandler(event) {
  event.preventDefault();
  localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      email: email.value,
      message: message.value,
    })
  );
}

form.addEventListener('submit', submitHandler);

function submitHandler(evt) {
  evt.preventDefault();
  const emailText = evt.target.elements.email.value.trim();
  const messageText = evt.target.elements.message.value.trim();
  if (emailText !== '' && messageText !== '') {
    console.log({
      email: emailText,
      message: messageText,
    });
  } else {
    console.error('All inputs must be filled!');
  }
  localStorage.removeItem(localStorageKey);
  form.reset();
}
