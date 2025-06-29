let counter = document.getElementById("counter");
let plusBtn = document.getElementById("plus");
let minusBtn = document.getElementById("minus");
let heartBtn = document.getElementById("heart");
let pauseBtn = document.getElementById("pause");
let submitBtn = document.getElementById("submit");
let likesUl = document.querySelector(".likes");
let commentForm = document.getElementById("comment-form");
let commentList = document.getElementById("list");

let count = 0;
let isPaused = false;
let interval = startTimer();
let likes = {};

function startTimer() {
  return setInterval(() => {
    if (!isPaused) {
      counter.textContent = ++count;
    }
  }, 1000);
}

// Plus
plusBtn.addEventListener("click", () => {
  counter.textContent = ++count;
});

// Minus
minusBtn.addEventListener("click", () => {
  counter.textContent = --count;
});

// Heart (Like)
heartBtn.addEventListener("click", () => {
  let currentNumber = counter.textContent;
  likes[currentNumber] = (likes[currentNumber] || 0) + 1;

  let existingLi = document.querySelector(`[data-num="${currentNumber}"]`);
  if (existingLi) {
    existingLi.textContent = `${currentNumber} has been liked ${likes[currentNumber]} time${likes[currentNumber] > 1 ? 's' : ''}`;
  } else {
    let li = document.createElement("li");
    li.dataset.num = currentNumber;
    li.textContent = `${currentNumber} has been liked 1 time`;
    likesUl.appendChild(li);
  }
});

// Pause/Resume
pauseBtn.addEventListener("click", () => {
  if (isPaused) {
    interval = startTimer();
    pauseBtn.textContent = "pause";
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    heartBtn.disabled = false;
    submitBtn.disabled = false;
  } else {
    clearInterval(interval);
    pauseBtn.textContent = "resume";
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    heartBtn.disabled = true;
    submitBtn.disabled = true;
  }
  isPaused = !isPaused;
});

// Comment form
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const commentInput = document.getElementById("comment-input");
  const commentText = commentInput.value.trim();

  if (commentText !== "") {
    const p = document.createElement("p");
    p.textContent = commentText;
    commentList.appendChild(p);
    commentInput.value = "";
  }
});
