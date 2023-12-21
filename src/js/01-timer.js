import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daySpan = document.querySelector('span[data-days]');
const hourSpan = document.querySelector('span[data-hours]');
const minuteSpan = document.querySelector('span[data-minutes]');
const secondSpan = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userSelectedDate = selectedDates[0].getTime();
    let currentDate = new Date().getTime();
    if (currentDate > userSelectedDate) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else if (currentDate < userSelectedDate) {
      startButton.disabled = false;
    }
  },
};

flatpickr(timeInput, options);

startButton.addEventListener('click', timerHandler);

function timerHandler(event) {
  event.preventDefault();
  let ms = options.userSelectedDate - new Date().getTime();
  console.log(options.userSelectedDate);
  daySpan.textContent = convertMs(ms).days;
  hourSpan.textContent = convertMs(ms).hours;
  minuteSpan.textContent = convertMs(ms).minutes;
  secondSpan.textContent = convertMs(ms).seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
