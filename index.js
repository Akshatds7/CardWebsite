const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const cardContainer = document.getElementById('card-container');

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

async function createCards() {
  const posts = await fetchPosts();
  posts.forEach(post => {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-4', 'mb-4');
    
    const imageUrl = `https://picsum.photos/300/200?random=${post.id}`; // Example using Lorem Picsum for random images
    
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

createCards();