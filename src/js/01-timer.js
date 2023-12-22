import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';

const timeInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daySpan = document.querySelector('span[data-days]');
const hourSpan = document.querySelector('span[data-hours]');
const minuteSpan = document.querySelector('span[data-minutes]');
const secondSpan = document.querySelector('span[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userSelectedDate = selectedDates[0].getTime();
    let currentDate = new Date().getTime();
    if (currentDate >= userSelectedDate) {
      iziToast.error({
        class: 'errorMessage',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: 'red',
        theme: 'light',
        color: 'red',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else if (currentDate < userSelectedDate) {
      startButton.disabled = false;
    }
  },
};

const datePicker = flatpickr(timeInput, options);

startButton.addEventListener('click', timerHandler);

function timerHandler(event) {
  const intervalId = setInterval(() => {
    event.preventDefault();
    startButton.disabled = true;
    let ms = datePicker.selectedDates[0].getTime() - new Date().getTime();
    if (ms <= 1000) {
      clearInterval(intervalId);
    }
    daySpan.textContent = convertMs(ms).days;
    hourSpan.textContent = convertMs(ms).hours;
    minuteSpan.textContent = convertMs(ms).minutes;
    secondSpan.textContent = convertMs(ms).seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
