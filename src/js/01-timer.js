import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daySpan = document.querySelector('spam[data-days]');
const hourSpan = document.querySelector('spam[data-hours]');
const minuteSpan = document.querySelector('spam[data-minutes]');
const secondSpan = document.querySelector('spam[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateCheck(selectedDates);
  },
};

flatpickr(timeInput, options);

function dateCheck(selectedDates) {
  let userSelectedDate = selectedDates[0].getTime();
  let currentDate = new Date().getTime();
  if (currentDate > userSelectedDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;
  } else if (currentDate < userSelectedDate) {
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', timerHandler);

function timerHandler(event) {
  event.preventDefault();
}
