// write your code here
const imageContainerEl = document.querySelector(".image-container");
console.log("imageContainerEl:", imageContainerEl);


// input: imageData: object
// action: create a likes section
// output: returns the like section element
function createLikesSection(imageData) {
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "likes-section");

  const likesEl = document.createElement("span");
  likesEl.setAttribute("class", "likes");
  likesEl.innerText = `${imageData.likes} likes`;

  const likeBtn = document.createElement("button");
  likeBtn.setAttribute("class", "like-button");
  likeBtn.innerText = "♥";


likeBtn.addEventListener("click", function(){
  fetch(`http://localhost:3000/images/${imageData.id}`, {
    method: "PATCH",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({"likes": imageData.likes++})
  }).then(function (response) {
    return response.json()
}).then(function (response){
  likesEl.innerText = `${response.likes} likes`;
})

})
  divEl.append(likesEl, likeBtn);
  return divEl;
}

// create a single cards
function createSingleCard(imageData) {
  const articleEl = document.createElement("article");
  articleEl.setAttribute("class", "image-card");

  const h2El = document.createElement("h2");
  h2El.setAttribute("class", "title");
  h2El.innerText = imageData.title;

  const imageEl = document.createElement("img");
  imageEl.setAttribute("class", "image");
  imageEl.setAttribute("src", imageData.image);

  const likesSectionEl = createLikesSection(imageData);

  const ulEl = document.createElement("ul");
  ulEl.setAttribute("class", "comments");

  for (const comment of imageData.comments) {
    const liEl = document.createElement("li");
    liEl.innerText = comment.content;
    ulEl.append(liEl);
  }

  articleEl.append(h2El, imageEl, likesSectionEl, ulEl);

  imageContainerEl.append(articleEl);
}

// create multiple cards
function createMultipleCards(imagesData) {
  for (const imageData of imagesData) {
    createSingleCard(imageData);
  }
}

// get images from the server
function getImages() {
  fetch("http://localhost:3000/images")
    .then(function (response) {
      return response.json();
    })
    .then(function (images) {
      createMultipleCards(images);
    });
}

getImages();
