const userIDList = document.querySelector('#user-list')
const searchForm = document.querySelector('#github-form')
const searchBar = document.querySelector('#search')
const submitButton = document.querySelector('[name = "submit"')
const gitContainer = document.querySelector('#github-container')
const repoList = document.querySelector('#repos-list')
// repoList.style.height = '100px'
// repoList.style = 'top: 0; position: sticky'



submitButton.addEventListener('click', function(e){
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${searchBar.value}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => { 
        userIDList.innerHTML = ''
        if (data.items.length < 1){
            let noProfile = document.createElement('li')
            noProfile.innerText = 'No matching profile'
            userIDList.append(noProfile)
            return
        }
        // console.log(data)
        // userIDList.innerHTML = ''
        for (const element of data.items.slice(0, 5)){
        // console.log(element)
        //Username list item
        let userNameLi = document.createElement('li')
        userNameLi.textContent = element.login
        userNameLi.style.fontSize = '24'
        userNameLi.style.textDecoration = 'underline'
        userNameLi.style.marginBottom = '8px'
        userNameLi.setAttribute('class', 'user-name')
        userIDList.append(userNameLi)
        //Profile link list item
        let userLi = document.createElement('li')
        let a = document.createElement('a')
        let textNode = document.createTextNode('Profile')
        a.append(textNode)
        a.href = element.html_url
        a.target = "_blank"
        userLi.append(a)
        userLi.style.fontSize = '18'
        userLi.style.marginBottom = '8px'
        userIDList.append(userLi)
        //Profile picture posted
        let userProfilePic = document.createElement('img')
        userProfilePic.src = element.avatar_url
        userProfilePic.style.marginBottom = '24px'
        userIDList.append(userProfilePic)



        
        
        
    }
    const userNames = document.querySelectorAll('.user-name')
    repoDataCall(userNames)
    repoList.style = "position: sticky;top: 175;height: 100px;"

    //cookies
    // document.cookie = "username=searchBarvalue"
    // console.log(document.cookie)
    
    

    })
    // .catch(function(error){
    //     if(userIDList.hasAttribute('li')) {
    //         // console.log('This works')
    //     } else {
    //         let errorLi = document.createElement('li')
    //         errorLi.innerText = 'Unknown Error'
    //         console.log(errorLi)
    //         userIDList.append(errorLi)
            
            
    //     }
        
    // })
    searchForm.reset()

    
        
})

function repoDataCall(userNames){
    userNames.forEach(name => {
        name.addEventListener('click', function(e) {
            console.log(e.target.innerText)
            fetch(`https://api.github.com/users/${e.target.innerText}/repos`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            })
            .then(response => response.json())
            .then(data => {
                listRepositories(data)
            })
        })
    })
}

function listRepositories(data){
    repoList.innerHTML = ' '
    for (const element of data.slice(0, 5)){
        let subList = document.createElement('ul')
        let repoLi = document.createElement('li')
        let a = document.createElement('a')
        let textNode = document.createTextNode(`${element.name}`)
        console.log(textNode)
        a.append(textNode)
        a.href = element.html_url
        a.target = "_blank"
        repoLi.append(a)
        repoList.append(repoLi)

    }
}

window.addEventListener('DOMContentLoaded', function(){
    console.log('Here is a sentence')
    searchBar.value = 'A'
    const newEvent = new Event('click')
    submitButton.dispatchEvent(newEvent)
    // console.log(document.cookie)

    
})






