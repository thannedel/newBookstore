fetching();
var allBooks;

function fetching() {
  var fetchConfig = fetch("books.json")
    .then(function (res) {
      if (res.ok) return res.json();
    })
    .then(function (json) {
      data = json;
      allBooks = data.books;
      //console.log(allBooks);
      books(allBooks);
      search(allBooks);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function books(allBooks) {
  document.getElementById("theBooks").innerHTML = "";
  for (var i = 0; i < allBooks.length; i++) {
    var flipCard = document.createElement("div");
    flipCard.setAttribute("id", "flip-card");
    flipCard.setAttribute("class", "flip-card");
    var flipCardInner = document.createElement("div");
    flipCardInner.setAttribute("id", "flip-card-inner");
    flipCardInner.setAttribute("class", "flip-card-inner");
    var flipCardFront = document.createElement("div");
    var flipCardBack = document.createElement("div");
    flipCardFront.setAttribute("class", "flip-card-front");
    flipCardBack.setAttribute("class", "flip-card-back");
    var image = document.createElement("img");
    image.setAttribute("class", "img");
    image.setAttribute("src", allBooks[i].cover);
    var titel = allBooks[i].title;
    var desc = allBooks[i].description;
    var lang = allBooks[i].language; //i ll need it to make a filter
    var det = allBooks[i].detail; // i have to make a button
    var bookTitle = document.createElement("h3");
    bookTitle.setAttribute("class", "book");
    bookTitle.setAttribute("id", "book");
    var descrip = document.createElement("p");
    descrip.setAttribute("class", "des");
    var details = document.createElement("a");
    details.setAttribute("class", "card-button");
    details.setAttribute("id", "card-button");
    details.setAttribute("data-fancybox", "images");
    details.setAttribute("data-caption", "Caption" + i);
    details.innerHTML = "More Infos";
    details.setAttribute("href", det);
    //console.log(titel);
    //console.log(details);
    bookTitle.append(titel);
    descrip.append(desc);
    flipCardFront.append(image);
    flipCardBack.append(bookTitle);
    flipCardBack.append(descrip);
    //flipCardBack.append(details);
    flipCardBack.append(details);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);
    document.getElementById("theBooks").appendChild(flipCard);
  }
}

function search(allBooks) {
  const searchingTitles = document.querySelectorAll(".flip-card");
  console.log(searchingTitles);
  const searchBar = document.forms["search-books"].querySelector("input");
  searchBar.addEventListener("keyup", function (e) {
    const term = e.target.value.toLowerCase();
    console.log(term);
    let filteredBooks = [];
    allBooks.forEach(function (book) {
      if (book.title.toLowerCase().indexOf(term) != -1) {
        filteredBooks.push(book);
      }
    });
    console.log(filteredBooks);
    books(filteredBooks);
  });
}

//second way with templates
/* await fetch(url) 
    .then(res => res.json())
    .then(data => {
        data.books.forEach(book => {
            booksArr.push(book);
            let card = document.createElement("div");
            card.className = "flip-card";
            card.innerHTML = `
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="${book.cover}" alt="Avatar">
            </div>
            <div class="flip-card-back">
              <h2>${book.title}</h2>
              <button class="card-button" data-book="${book.title}">More info</button>
            </div>
          </div>`
            cardsContainer.appendChild(card);
        }) */

        