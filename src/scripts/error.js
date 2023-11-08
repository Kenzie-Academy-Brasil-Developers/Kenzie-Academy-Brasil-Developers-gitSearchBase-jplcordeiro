function redirectToHomePage() {
    window.location.replace("../../");
  }

const novaBuscaButton = document.querySelector(".new-search__button");
novaBuscaButton.addEventListener("click", redirectToHomePage);
  