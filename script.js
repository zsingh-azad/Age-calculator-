const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let timer = null;

function getAge(birthDate, now) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    );

    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const lastBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (lastBirthday > now) {
    lastBirthday.setFullYear(now.getFullYear() - 1);
  }

  const elapsed = now - lastBirthday;

  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor(elapsed / (1000 * 60)) % 60;
  const seconds = Math.floor(elapsed / 1000) % 60;

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
}

function updateAge() {
  if (!dobInput.value) return;

  const birthDate = new Date(dobInput.value + "T00:00:00");
  const now = new Date();

  if (birthDate > now) {
    error.textContent = "Date of birth cannot be in the future.";
    result.classList.add("hidden");
    return;
  }

  error.textContent = "";

  const age = getAge(birthDate, now);

  yearsEl.textContent = age.years;
  monthsEl.textContent = age.months;
  daysEl.textContent = age.days;
  hoursEl.textContent = age.hours;
  minutesEl.textContent = age.minutes;
  secondsEl.textContent = age.seconds;

  result.classList.remove("hidden");
}

calculateBtn.addEventListener("click", () => {
  if (!dobInput.value) {
    error.textContent = "Please select your date of birth.";
    result.classList.add("hidden");
    return;
  }

  updateAge();

  clearInterval(timer);
  timer = setInterval(updateAge, 1000);
});

dobInput.max = new Date().toISOString().split("T")[0];
