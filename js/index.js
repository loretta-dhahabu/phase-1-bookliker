document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
    const showPanel = document.querySelector('#show-panel')
    let id
    let users = []
    const user = { "id": 1, "username": "pouros"}
    setTimeout(()=>{
        const lists = document.querySelectorAll('.title')
        Array.from(lists).forEach((title)=>{
            title.addEventListener('click', (eventFn)=>{
                id = eventFn.target.id
                fetchDetail(id)
            })
        })
    },1000)

    showPanel.addEventListener('click', (eventFn)=>{
        if(eventFn.target && eventFn.target.id === 'likes'){
            const likeContainer = eventFn.target.previousSibling
            const currentLikes = eventFn.target.previousSibling.childNodes
            currentLikes.forEach((user)=>{
                const userObject = {'id': parseInt(user.id), 'username': user.textContent}
                users.push(userObject)
            })
            const newLike = document.createElement('li')
            newLike.id = user.id
            newLike.innerText = user.username
            likeContainer.appendChild(newLike)
            users.push(user)
            updateDetail(id, users)
            users = []
        }
    })
});

function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(data => bookList(data))
}

function bookList(bookOject){
    Array.from(bookOject).forEach((book)=>{
        const list = document.querySelector('#list')
        const line = document.createElement('li')
        line.innerText = book.title
        line.id = book.id
        line.className = 'title'
        list.appendChild(line)
    })
}

function fetchDetail(bookId){
    fetch(`http://localhost:3000/books/${bookId}`)
    .then(response => response.json())
    .then(data => showDetail(data))
}

function showDetail(book){
    const panel = document.querySelector('#show-panel')
    const img = document.createElement('img')
    const title = document.createElement('h4')
    const subtitle = document.createElement('h4')
    const author = document.createElement('h4')
    const descr = document.createElement('p')
    const userLikes = document.createElement('ul')
    const btn = document.createElement('button')
    panel.innerHTML = ''
    img.src = book['img_url']
    title.innerText = book.title
    subtitle.innerText = book.subtitle
    author.innerText = book.author
    descr.innerText = book.description
    btn.innerText = 'LIKE'
    btn.id = 'likes'
    book.users.forEach((user)=>{
        const like = document.createElement('li')
        like.innerText = user.username
        like.id = user.id
        userLikes.appendChild(like)
    })
    panel.append(img, title, subtitle, author, descr, userLikes, btn)
}

function updateDetail ( bookId, userArray )
{
    fetch( `http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accepter: 'application/json'
        },
        body: JSON.stringify( { 'users': userArray } )
    } )
}