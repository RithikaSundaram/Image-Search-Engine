const searchForm = document.getElementById("search-form")
const searchBox = document.getElementById("search-input")
const searchResult = document.getElementById("show-more")
const showMoreBtn = document.getElementById("show-more-btn")
const accessKey = "EfiEFD1GqjEHwwuE0DXfEDqvVYLapmgJ8JY7HRfuThA";//access key from my account in unsplash
let key="";
let page=1;
  

//from unspalsh
async function searchImages(){
    key = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${key}&client_id=${accessKey}&per_page=12`;
    
    const response = await fetch(url);
    const data = await response.json();
    

    //if one search is made after that next search made the previous should be hidden
    if(page === 1){
        searchResult.innerHTML = "";
    }
     
    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";//to open the image in  the new tab
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block";//to show the "show more" button
}

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})
//for the shoe more button
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})
