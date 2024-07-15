const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const cardContainer = document.getElementById('card-container');
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;
const itemsPerPage = 10; // Number of posts per page

async function fetchPosts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

function displayPosts(posts, page) {
  cardContainer.innerHTML = ''; // Clear previous cards
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  paginatedPosts.forEach(post => {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-4', 'mb-4');
    
    const imageUrl = `https://picsum.photos/300/200?random=${post.id}`;
    
    const image  = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('card-img-top');
    image.alt = 'Card image cap';
    card.appendChild(image);
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = post.title;
    cardBody.appendChild(title);
    
    const body = document.createElement('p');
    body.classList.add('card-text');
    body.textContent = post.body;
    cardBody.appendChild(body);
    
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
  });
}

function createPaginationButtons(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = ''; // Clear previous pagination buttons

  const createButton = (pageNumber, text, isActive, isDisabled) => {
    const li = document.createElement('li');
    li.classList.add('page-item');
    if (isActive) li.classList.add('active');
    if (isDisabled) li.classList.add('disabled');
    
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = '#';
    a.textContent = text;
    a.dataset.page = pageNumber;
    li.appendChild(a);
    
    return li;
  };

  const prevButton = createButton(currentPage - 1, 'Previous', false, currentPage === 1);
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(i, i, currentPage === i, false);
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = createButton(currentPage + 1, 'Next', false, currentPage === totalPages);
  paginationContainer.appendChild(nextButton);
}

paginationContainer.addEventListener('click', async (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const page = parseInt(event.target.dataset.page);
    if (page !== currentPage) {
      currentPage = page;
      const posts = await fetchPosts();
      displayPosts(posts, currentPage);
      createPaginationButtons(posts.length);
    }
  }
});

async function createCards() {
  const posts = await fetchPosts();
  displayPosts(posts, currentPage);
  createPaginationButtons(posts.length);
}

createCards();
