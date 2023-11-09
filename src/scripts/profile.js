const getUserFromLocalStorage = () => {
    const userDataJson = localStorage.getItem('githubUserInfo');

    if (userDataJson){
        const userData = JSON.parse(userDataJson)
        renderUserInfo(userData)
        renderUserRepos(userData.login);
    }
    else{
        console.log("Não há dados disponíveis")
    }
}

const renderUserInfo = (userInfo) =>{
    const avatar = document.querySelector('.profile__image');
    const login = document.querySelector('.profile__username');

    avatar.src = userInfo.avatar_url;
    login.textContent = userInfo.login
}


const renderUserRepos = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (response.ok) {
            const repositorios = await response.json();

            const ul = document.querySelector('.profile__ul');

            ul.innerHTML = '';

            repositorios.forEach((repo) => {
                const li = document.createElement('li');
                const h4 = document.createElement('h4');
                const p = document.createElement('p');
                const a = document.createElement('a');

                h4.textContent = repo.name;
                p.textContent = repo.description || 'Repositório sem descrição';
                a.textContent = 'Repositório';
                a.href = repo.html_url;
                a.target = '_blank';

                li.appendChild(h4);
                li.appendChild(p);
                li.appendChild(a);
                ul.appendChild(li);
            });
        } else {
            console.error('Erro ao obter repositórios do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na solicitação:', error.message);
    }
};


const changeUser = document.querySelector(".profile__change-user--button")
changeUser.addEventListener("click", function(){
    window.location.replace("../../");
})

document.addEventListener('DOMContentLoaded', renderUserRepos);
document.addEventListener('DOMContentLoaded', getUserFromLocalStorage);