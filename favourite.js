 function renderEmojis(list) {
    const sorted = [...list];
    const sortValue = sortSelect.value;
    if (sortValue === "asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortValue === "desc") sorted.sort((a, b) => b.name.localeCompare(a.name));

    container.innerHTML = "";
    if (sorted.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500 text-center col-span-full">Result doesn\'t found</p>';
      return;
    }

    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    sorted.forEach((emoji) => {
      const isFav = favourites.some((e) => e.id === emoji.id);

      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center hover:shadow-lg transition relative";
      card.innerHTML = `
        <div class="text-4xl mb-2 cursor-pointer">${emoji.htmlCode[0]}</div>
        <strong class="mb-1">${emoji.name}</strong>
        <small class="text-gray-500">${emoji.category}</small>
        <button 
          class="absolute top-2 right-2 text-xl heart-btn ${
            isFav ? "text-red-500" : "text-gray-300"
          }" title="Toggle Favourite">♥</button>
      `;

      const favButton = card.querySelector("button");
      favButton.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavourite(emoji);

   
        favButton.classList.add("pop");
        setTimeout(() => favButton.classList.remove("pop"), 200);

        renderEmojis(sorted); 
      });

      container.appendChild(card);
    });
  }

  function toggleFavourite(emoji) {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const index = favourites.findIndex((e) => e.id === emoji.id);

    if (index > -1) {
      favourites.splice(index, 1); 
    } else {
      favourites.push({
        id: emoji.id,
        name: emoji.name,
        char: emoji.htmlCode[0],
        category: emoji.category,
      });
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
  }