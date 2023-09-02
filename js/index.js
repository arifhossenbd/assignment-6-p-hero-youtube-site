const loadData = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const allData = await response.json();
    const data = allData.data;
    displayData(data)

}

const displayData = category => {
    const categoriesContainer = document.getElementById('category-container');
    category.forEach(categories => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="handle-categories"onclick="handleCategoriesData('${categories.category_id}')" class=" bg-slate-100 hover:bg-red-500 hover:text-white px-6 py-2 text-xl rounded-md">${categories.category}</button>
        `;
        categoriesContainer.appendChild(div)
    });

}

const handleCategoriesData = async (id) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
  const allData = await response.json();
  const data = allData.data
  displayCategoriesCards(data)
}

const displayCategoriesCards = categoriesCards => {
  const categoriesCardsContainer = document.getElementById('categories-cards-container')
  
  categoriesCardsContainer.innerHTML = ""
  if (categoriesCards.length === 0) {
    document.getElementById('noDataImg').classList.remove('hidden')
    document.getElementById('noAvailable').classList.remove('hidden')
  }
  else{
    document.getElementById('noDataImg').classList.add('hidden')
    document.getElementById('noAvailable').classList.add('hidden')
  }
    categoriesCards.forEach((category)  => {
      const postedTime = category.others.posted_date;
      let timeDisplay = '';
      
      const timeInSeconds = parseInt(postedTime, 10);
      
      if (!isNaN(timeInSeconds)) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        timeDisplay = `${hours}h ${minutes}m ${seconds}s ago`;
      } else {
        timeDisplay = " ";
      }
      
      const categoriesDiv = document.createElement('div')
      categoriesDiv.innerHTML = `
      <div class="rounded-md w-auto relative">
      <div class="">
      <figure><img class="w-96 h-48" src="${category?.thumbnail}" alt=""/></figure>
      </div>
      <div class="absolute mb-20"><p>${timeDisplay}</p></div>
      <div class="flex gap-2 mt-5">
        <img src="${category?.authors[0]?.profile_picture}" alt="" class="w-10 h-10 rounded-full"/>
        <div>
          <h2 class="category-title text-xl font-bold">${category?.title}</h2>
          <div class="flex gap-2 items-center text-base font-medium">
          <h2>${category.authors[0]?.profile_name}</h2>
          <div>${category.authors[0].verified ? '<img src="./images/verified.png" alt="" class="w-5">' : ''}</div>
          </div>
          <p class="font-medium">${category?.others?.views} Views</p>
        </div>
      </div>
    </div>
      `;
      categoriesCardsContainer.appendChild(categoriesDiv)
    })

    const loadAllData = async (id) => {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
      const allData = await response.json();
      const data = allData.data;
      
      const noDataAvailable = document.getElementById('noData')
      data.forEach(element => {
        console.log(element)
        const div = document.createElement('div')
        div.innerHTML = `
        `;
        noDataAvailable.appendChild(div)
      });
    }
    loadAllData()
  
  }

loadData()
handleCategoriesData('1000')

