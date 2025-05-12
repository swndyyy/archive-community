const groups = [
  {
    title: 'Royal Roundtable Groups',
    description: 'A group that discusses website creation, WhatsApp bots, artificial intelligence projects and the latest in technology. Royal Roundtable group is a group with random discussions like groups in general, but we will always maintain this community with positive and useful things for this community itself.',
    image: 'https://files.catbox.moe/7ki9wu.jpg',
    url: 'https://chat.whatsapp.com/DrqZxEeI8v9H83ynYvkVOP'
  },
  {
    title: 'Shizuku Murasaki Groups',
    description: 'A special group to try all the features of Shizuku AI which is equipped with Downloader, Search, Nsfw, and Tools that might be useful for you.',
    image: 'https://files.catbox.moe/762bte.jpg',
    url: 'https://chat.whatsapp.com/EUH2RUBs9gvISoIMeFD4N9'
  },
  {
    title: 'Shooting Star Groups',
    description: 'A regular chat group filled with interesting people and a place for you if you want to make more friends.',
    image: 'https://files.catbox.moe/fkwswl.jpg',
    url: 'https://chat.whatsapp.com/KzG7ih7qSWlL4b7fzqZTvl'
  }
];

const groupsContainer = document.getElementById('groups');
let activeIndex = null;

groups.forEach((group, index) => {
  const card = document.createElement('div');
  card.className = 'bg-white/40 border border-black p-5 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer';
  card.id = `card-${index}`;

  card.innerHTML = `
    <div class="flex items-center space-x-4">
      <img src="${group.image}" alt="${group.title}" class="w-16 h-16 rounded-full object-cover border border-black">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 normal-font">${group.title}</h2>
      </div>
    </div>

    <div id="detail-${index}" class="overflow-hidden transition-all max-h-0">
      <div class="pt-4 border-t mt-4">
        <p class="text-gray-700 mb-4">${group.description}</p>
        <a href="${group.url}" target="_blank" class="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 shadow-md">
          <i class="fa-solid fa-paper-plane"></i> Join Now
        </a>
      </div>
    </div>
  `;

  card.addEventListener('click', () => toggleDetail(index));
  groupsContainer.appendChild(card);
});

function toggleDetail(index) {
  if (activeIndex !== null && activeIndex !== index) {
    const prevDetail = document.getElementById(`detail-${activeIndex}`);
    prevDetail.classList.remove('max-h-[500px]');
    prevDetail.classList.add('max-h-0');
  }

  const detail = document.getElementById(`detail-${index}`);
  if (activeIndex === index) {
    detail.classList.remove('max-h-[500px]');
    detail.classList.add('max-h-0');
    activeIndex = null;
  } else {
    detail.classList.remove('max-h-0');
    detail.classList.add('max-h-[500px]');
    activeIndex = index;
  }
}

const pageLoader = document.getElementById('page-loader');

function showLoader() {
  const scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add('noscroll');
  if (pageLoader) {
    pageLoader.style.display = 'flex';
    pageLoader.style.opacity = '1';
  }
}

function hideLoader() {
  setTimeout(() => {
    const scrollPosition = parseInt(document.body.style.top || '0') * -1;
    document.body.classList.remove('noscroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
    if (pageLoader) {
      pageLoader.style.opacity = '0';
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 800);
    }
  }, 500);
}

window.addEventListener('load', () => {
  hideLoader();
  AOS.init();
});