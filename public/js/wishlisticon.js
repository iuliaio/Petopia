document.addEventListener("DOMContentLoaded", function () {
  const heartButton = document.getElementById("heartButton");
  const emptyHeartIcon = document.getElementById("emptyHeartIcon");
  const filledHeartIcon = document.getElementById("filledHeartIcon");

  /* Retrieve user preference or default to false */
  let isFilled = false;

  if (isFilled) {
    emptyHeartIcon.style.display = "none";
    filledHeartIcon.style.display = "inline";
  } else {
    filledHeartIcon.style.display = "none";
    emptyHeartIcon.style.display = "inline";
  }

  heartButton.addEventListener("click", function () {
    isFilled = !isFilled; // Toggle the state

    if (isFilled) {
      emptyHeartIcon.style.display = "none";
      filledHeartIcon.style.display = "inline";
    } else {
      filledHeartIcon.style.display = "none";
      emptyHeartIcon.style.display = "inline";
    }
  });
});
