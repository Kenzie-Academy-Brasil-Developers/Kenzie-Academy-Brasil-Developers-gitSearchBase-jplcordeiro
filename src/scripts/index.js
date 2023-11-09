const fetchUserData = () => {
    const username = document.querySelector('.index__input').value;

    const apiUrl = `https://api.github.com/users/${username}`;

  fetch(apiUrl)

    .then((response) => {
      if (response.status === 404) {
        window.location.replace("/src/pages/error.html");
      }
      else if(response.status === 200){
        return response.json();
      }
    })

    .then((data) => {
        if(data){
          localStorage.setItem("githubUserInfo", JSON.stringify(data));
          window.location.replace("/src/pages/profile.html");
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error)  
      })
  }     

const profileButton = document.querySelector('.index__button');
profileButton.addEventListener('click', fetchUserData);