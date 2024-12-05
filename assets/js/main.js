/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// /////////////chat bot/////////////////////
// Function to toggle chatbot visibility
function openChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.style.display = "flex"; // Show the chatbot
}

setTimeout(() => {
  generateBotResponse("hello");
}, 500);


// Function to close the chat container
function closeChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.style.display = "none"; // Hide the chatbot
}

// Function to send a message
function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  const chatBox = document.getElementById("chat-box");

  if (userInput === "") return;  // Prevent sending empty messages

  // Add the user's message
  addMessage(userInput, "user-msg");

  // Clear the input field
  document.getElementById("user-input").value = "";

  // Simulate bot response after a short delay
  setTimeout(() => {
    generateBotResponse(userInput);
  }, 500);
}

// Function to generate the bot's response
function generateBotResponse(userMessage) {
  const response = getBotResponse(userMessage.toLowerCase());
  addMessage(response, "bot-msg");
}

// Function to add messages to the chatbox
function addMessage(message, className) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);

  // Scroll to the bottom of the chatbox to show the new message
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get the bot's response based on user input
function getBotResponse(input) {
  const responses = {
    "hello": "Hi there! How can I assist you?",
    "hey": "Hi there! How can I assist you?",
    "hi": "Hi there! How can I help you today?",
    "services": "Web & Mobile Application,Building with HTML & CSS,Security and Compliance,Designs,Server-side programming",
    "skills": "Nondumiso's soft skills include punctuality, good communication skills, reliability, and fast learning.",
    "thank you": "You're welcome! Feel free to reach out if you need any help.",
    "bye": "Goodbye! Have a wonderful day.",
    "how are you": "I'm doing great, thank you for asking! How can I assist you?",
    "what is your name": "I am Abel Nondumiso's assistant. How can I help you today?",
    "where are you located": "We are a virtual company, but we are always here to assist you online.",
    "can you help me": "Of course! Please let me know how I can help you.",
    "how do I contact support": "You can reach out to support through our contact page or by email.",
    "links": "Click any icon below my profile and it will redirect to my to my profiles",
    "education":" Nondumiso Studies at the Tshwane University of Technology, Information Technology(Software Development)",
    "default": "Sorry, I didn't understand that. Can you try again?"
  };

  return responses[input] || responses["default"];
}
