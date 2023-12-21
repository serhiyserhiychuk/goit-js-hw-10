import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.input');
const stateLabels = document.querySelectorAll('.stateLabel');

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateLabels[0].checked) {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delayInput.value}ms`,
          messageColor: 'white',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: 'green',
          theme: 'light',
          color: 'green',
          position: 'topRight',
        });
      } else {
        iziToast.error({
          message: `❌ Rejected promise in ${delayInput.value}ms`,
          messageColor: 'white',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: 'red',
          theme: 'light',
          color: 'red',
          position: 'topRight',
        });
      }
    }, delayInput.value);
  });

  promise.then(value => console.log(value)).catch(error => console.log(error));
}
