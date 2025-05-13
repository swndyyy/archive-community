const groups = [
  {
    title: 'Royal Roundtable',
    description: 'A vibrant community discussing website creation, WhatsApp bots, AI projects and the latest in technology. We maintain a positive environment for meaningful tech discussions.',
    image: 'https://files.catbox.moe/7ki9wu.jpg',
    url: 'https://chat.whatsapp.com/DrqZxEeI8v9H83ynYvkVOP',
    icon: 'fa-crown',
    color: 'bg-purple-500'
  },
  {
    title: 'Shizuku Murasaki',
    description: 'Exclusive group to explore Shizuku AI features including Downloader, Search, NSFW, and useful tools. Perfect for AI enthusiasts and developers.',
    image: 'https://files.catbox.moe/762bte.jpg',
    url: 'https://chat.whatsapp.com/EUH2RUBs9gvISoIMeFD4N9',
    icon: 'fa-robot',
    color: 'bg-blue-500'
  },
  {
    title: 'Shooting Stars',
    description: 'A friendly social group filled with interesting people. Perfect place to make new friends and enjoy casual conversations in a welcoming space.',
    image: 'https://files.catbox.moe/fkwswl.jpg',
    url: 'https://chat.whatsapp.com/KzG7ih7qSWlL4b7fzqZTvl',
    icon: 'fa-star',
    color: 'bg-yellow-500'
  }
];

function initGroups() {
  const groupsContainer = document.getElementById('groups');
  let activeIndex = null;

  groups.forEach((group, index) => {
    const card = document.createElement('div');
    card.className = `group-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 mb-4 hover:shadow-lg cursor-pointer ${activeIndex === index ? 'ring-2 ring-blue-500' : ''}`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
    
    card.innerHTML = `
      <div class="p-5" onclick="toggleGroupDetail(${index}, event)">
        <div class="flex items-center gap-4">
          <div class="relative">
            <img src="${group.image}" alt="${group.title}" class="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm">
            <span class="absolute -bottom-1 -right-1 ${group.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">
              <i class="fas ${group.icon}"></i>
            </span>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-800">${group.title}</h3>
            <p class="text-sm text-gray-500 mt-1">${group.description.substring(0, 60)}...</p>
          </div>
          <i class="fas fa-chevron-down text-gray-400 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}"></i>
        </div>
      </div>
      
      <div id="detail-${index}" class="transition-all duration-300 overflow-hidden max-h-0">
        <div class="px-5 pb-5 pt-0 border-t border-gray-100">
          <p class="text-gray-600 text-sm mb-4">${group.description}</p>
          <a href="${group.url}" target="_blank" 
             class="inline-flex items-center justify-center w-full ${group.color} hover:${group.color.replace('500', '600')} text-white py-2 px-4 rounded-lg shadow-sm transition-all">
            <i class="fas fa-paper-plane mr-2"></i>
            Join Community
          </a>
        </div>
      </div>
    `;
    
    groupsContainer.appendChild(card);
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function toggleGroupDetail(index, event) {
  if (event.target.tagName === 'A' || event.target.parentElement.tagName === 'A') {
    return;
  }

  const detail = document.getElementById(`detail-${index}`);
  const allCards = document.querySelectorAll('.group-card');
  const allArrows = document.querySelectorAll('.fa-chevron-down');
  let activeIndex = null;

  document.querySelectorAll('[id^="detail-"]').forEach((el, i) => {
    if (i !== index && el.classList.contains('max-h-[300px]')) {
      el.classList.remove('max-h-[300px]');
      el.classList.add('max-h-0');
      allCards[i].classList.remove('ring-2', 'ring-blue-500');
      allArrows[i].classList.remove('rotate-180');
    }
  });

  if (detail.classList.contains('max-h-[300px]')) {
    detail.classList.remove('max-h-[300px]');
    detail.classList.add('max-h-0');
    allCards[index].classList.remove('ring-2', 'ring-blue-500');
    allArrows[index].classList.remove('rotate-180');
    activeIndex = null;
  } else {
    detail.classList.remove('max-h-0');
    detail.classList.add('max-h-[300px]');
    allCards[index].classList.add('ring-2', 'ring-blue-500');
    allArrows[index].classList.add('rotate-180');
    activeIndex = index;
    
    setTimeout(() => {
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

const pageLoader = document.getElementById('page-loader');

function showLoader() {
  document.documentElement.style.scrollBehavior = 'auto';
  const scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add('fixed', 'w-full');
  
  if (pageLoader) {
    pageLoader.style.display = 'flex';
    setTimeout(() => {
      pageLoader.style.opacity = '1';
    }, 10);
  }
}

function hideLoader() {
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    setTimeout(() => {
      pageLoader.style.display = 'none';
      document.body.classList.remove('fixed', 'w-full');
      const scrollPosition = parseInt(document.body.style.top || '0') * -1;
      document.body.style.top = '';
      document.documentElement.style.scrollBehavior = 'smooth';
      window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      
      initGroups();
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  showLoader();
  
  setTimeout(hideLoader, 1500);
});

window.toggleGroupDetail = toggleGroupDetail;