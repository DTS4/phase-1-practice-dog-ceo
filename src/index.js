console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];
    fetch(imgUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const images = data.message;
            const imageContainer = document.getElementById("image-container");

            images.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Random Dog Image";
                img.style.width = "200px";
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    fetch(breedUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            allBreeds = data.message;
            displayBreeds(allBreeds);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    function displayBreeds(breeds) {
        const breedList = document.getElementById("breed-list");
        breedList.innerHTML = "";

        for (const breed in breeds) {
            const listItem = document.createElement("li");
            listItem.textContent = breed;
            breedList.appendChild(listItem);
        }
    }
    const breedFilter = document.getElementById("breed-filter");
    breedFilter.addEventListener("change", () => {
        const selectedLetter = breedFilter.value;
        const filteredBreeds = Object.keys(allBreeds).filter(breed =>
            breed.startsWith(selectedLetter)
        );
        displayBreeds(filteredBreeds);
    });
});



