let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const toyCollection = document.querySelector("#toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
toyFormContainer.addEventListener('submit', (e) => {
  e.preventDefault()
  postToy(e.target.name.value, e.target.image.value)
  })
toyCollection.addEventListener('click', (e) => { 
  if (e.target.className === 'like-btn') {
    let currentLikes = parseInt(e.target.previousElementSibling.innerHTML)
    let newLikes = currentLikes + 1 
    e.target.previousElementSibling.innerHTML = newLikes + " likes "

    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: 'PATCH',
      headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
      }, 
      body: JSON.stringify({
        likes: newLikes
      })
    })
  }
  })

})

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.map(t => renderToy(t))
  })
}

function renderToy(toy) {
  const toyCard = `<div class="card">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button data-id=${toy.id} class="like-btn" id="[toy_id]">Like ❤️</button>
  </div>`

  const toyBox = document.getElementById('toy-collection')
  toyBox.innerHTML += toyCard
}

function postToy(name, URL) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": URL,
      "likes": 0
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(data => renderToy(data))
}

