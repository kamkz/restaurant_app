// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const cartBtn = document.getElementById("cart-btn")
const cartCount = document.getElementById("cart-count")

// Hero Slider Elements
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")

// Modal Elements
const orderModal = document.getElementById("order-modal")
const cartModal = document.getElementById("cart-modal")
const orderNowBtn = document.getElementById("order-now-btn")
const closeOrderModal = document.getElementById("close-order-modal")
const closeCartModal = document.getElementById("close-cart-modal")

// Gallery Elements
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxClose = document.getElementById("lightbox-close")
const lightboxPrev = document.getElementById("lightbox-prev")
const lightboxNext = document.getElementById("lightbox-next")

// Global Variables
let currentSlide = 0
let currentTestimonial = 0
let currentGalleryImage = 0
let cart = JSON.parse(localStorage.getItem("cart")) || []
let slideInterval

// Menu Data
const menuItems = [
  {
    id: 1,
    name: "Grilled Beef Skewers",
    category: "mains",
    price: 8500,
    description: "Tender beef marinated in local spices, grilled to perfection with plantains",
    image: "./assets/grilled-beef-skewers-with-plantains-on-wooden-plat.png",
  },
  {
    id: 2,
    name: "Ubwoba (Mushroom Soup)",
    category: "appetizers",
    price: 3500,
    description: "Traditional mushroom soup with local herbs and vegetables",
    image: "/assets/traditional-rwandan-mushroom-soup-in-clay-bowl-wit.png",
  },
  {
    id: 3,
    name: "Igikoma (Milk Tea)",
    category: "drinks",
    price: 2000,
    description: "Traditional Rwandan milk tea with honey and local spices",
    image: "/assets/traditional-rwandan-milk-tea-in-ceramic-cup-with-h.png",
  },
  {
    id: 4,
    name: "Ubuki (Honey Cake)",
    category: "desserts",
    price: 4000,
    description: "Sweet honey cake made with local honey and traditional methods",
    image: "/assets/traditional-rwandan-honey-cake-slice-on-wooden-pla.png",
  },
  {
    id: 5,
    name: "Inyama n'Amaru (Meat & Vegetables)",
    category: "mains",
    price: 9500,
    description: "Mixed grilled meats with seasonal vegetables and ugali",
    image: "/assets/mixed-grilled-meats-with-vegetables-and-ugali-on-t.png",
  },
  {
    id: 6,
    name: "Ibirayi (Sweet Potatoes)",
    category: "appetizers",
    price: 2500,
    description: "Roasted sweet potatoes with butter and local herbs",
    image: "/assets/roasted-sweet-potatoes-with-herbs-on-rustic-plate.png",
  },
  {
    id: 7,
    name: "Urwagwa (Banana Beer)",
    category: "drinks",
    price: 3000,
    description: "Traditional fermented banana beverage, mildly alcoholic",
    image: "/assets/traditional-rwandan-banana-beer-in-gourd-cup.png",
  },
  {
    id: 8,
    name: "Ubwoba bw'Ibinyomoro (Fruit Salad)",
    category: "desserts",
    price: 3500,
    description: "Fresh local fruits with honey and mint",
    image: "/assets/fresh-tropical-fruit-salad-with-honey-and-mint-in-.png",
  },
]

// Gallery Data
const galleryImages = [
  {
    src: "/assets/beautiful-restaurant-interior-with-traditional-rwa.png",
    alt: "Restaurant interior",
  },
  {
    src: "/assets/chef-preparing-traditional-rwandan-grilled-meat-ov.png",
    alt: "Chef preparing food",
  },
  {
    src: "/assets/colorful-display-of-fresh-local-vegetables-and-spi.png",
    alt: "Fresh ingredients",
  },
  {
    src: "/assets/happy-customers-enjoying-meal-at-outdoor-terrace-w.png",
    alt: "Happy customers",
  },
  {
    src: "/assets/traditional-rwandan-cooking-pots-and-utensils-in-r.png",
    alt: "Traditional cooking",
  },
  {
    src: "/assets/elegant-plated-dish-with-grilled-meat--vegetables-.png",
    alt: "Plated dish",
  },
]

// Testimonials Data
const testimonials = [
  {
    name: "Marie Uwimana",
    image: "/assets/smiling-rwandan-woman-in-traditional-dress.png",
    quote: "The best traditional food in Huye District! The grilled meat reminds me of my grandmother's cooking.",
  },
  {
    name: "Lelia Kayiranga Kamikazi",
    image: "/assets/1.jpg",
    quote: "Butare Flavors brings authentic taste with modern presentation. Highly recommended!",
  },
  {
    name: "Antoinette Mukamana",
    image: "/assets/2.jpg",
    quote: "Perfect place for family gatherings. The atmosphere is warm and the service is excellent.",
  },
  {
    name: "Grace Mutesa",
    image: "/assets/3.jpg",
    quote: "I travel often, but this is the best Rwandan restaurant I've experienced. Authentic and delicious!",
  },
  {
    name: "Sarah Keza",
    image: "/assets/4.jpg",
    quote: "The honey cake is incredible! Takes me back to my childhood. Will definitely return.",
  },
]

// FAQ Data
const faqData = [
  {
    question: "What are your opening hours?",
    answer: "We are open Monday through Sunday from 8:00 AM to 10:00 PM.",
  },
  {
    question: "Do you offer vegetarian options?",
    answer:
      "Yes, we have several vegetarian dishes including our famous mushroom soup and various vegetable preparations.",
  },
  {
    question: "Can I make reservations?",
    answer: "You can make reservations through our contact form or by calling us directly.",
  },
  {
    question: "Do you provide catering services?",
    answer: "Yes, we offer catering for events and special occasions. Please contact us for more details.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have free parking available for our customers right next to the restaurant.",
  },
]

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeHeroSlider()
  initializeMenu()
  initializeGallery()
  initializeTestimonials()
  initializeFAQ()
  initializeModals()
  initializeForms()
  initializeScrollEffects()
  updateCartDisplay()

  // Start auto-slider
  startSlideShow()
})

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Navigation link clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetSection = link.getAttribute("data-section")
      showSection(targetSection)

      // Update active link
      navLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Close mobile menu
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Scroll effects for navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")

    // Trigger animations for timeline if about section
    if (sectionId === "about") {
      animateTimeline()
    }
  }
}

// Hero Slider Functions
function initializeHeroSlider() {
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Previous/Next buttons
  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })
}

function goToSlide(slideIndex) {
  // Handle wrap around
  if (slideIndex >= slides.length) slideIndex = 0
  if (slideIndex < 0) slideIndex = slides.length - 1

  // Update slides
  slides[currentSlide].classList.remove("active")
  dots[currentSlide].classList.remove("active")

  currentSlide = slideIndex

  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}

function startSlideShow() {
  slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)
}

function stopSlideShow() {
  clearInterval(slideInterval)
}

// Menu Functions
function initializeMenu() {
  const menuGrid = document.getElementById("menu-grid")
  const categoryBtns = document.querySelectorAll(".category-btn")

  // Category filter buttons
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category")

      // Update active button
      categoryBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter menu items
      filterMenuItems(category)
    })
  })

  // Initial menu load
  renderMenuItems(menuItems)
}

function renderMenuItems(items) {
  const menuGrid = document.getElementById("menu-grid")
  menuGrid.innerHTML = ""

  items.forEach((item, index) => {
    const menuItemElement = document.createElement("div")
    menuItemElement.className = "menu-item"
    menuItemElement.style.animationDelay = `${index * 0.1}s`

    menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">${item.price.toLocaleString()} RWF</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})" aria-label="Add ${item.name} to cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `

    menuGrid.appendChild(menuItemElement)
  })
}

function filterMenuItems(category) {
  const filteredItems = category === "all" ? menuItems : menuItems.filter((item) => item.category === category)

  renderMenuItems(filteredItems)
}

// Cart Functions
function addToCart(itemId) {
  const item = menuItems.find((item) => item.id === itemId)
  if (item) {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    updateCartDisplay()
    saveCart()

    // Show feedback
    showNotification(`${item.name} added to cart!`)
  }
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId)
  updateCartDisplay()
  saveCart()
  renderCartItems()
}

function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>"
    cartTotal.textContent = "0"
    return
  }

  cartItemsContainer.innerHTML = ""
  let total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal

    const cartItemElement = document.createElement("div")
    cartItemElement.className = "cart-item"
    cartItemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>${itemTotal.toLocaleString()} RWF</p>
            </div>
            <button onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name} from cart">Remove</button>
        `

    cartItemsContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString()
}

// Gallery Functions
function initializeGallery() {
  const galleryGrid = document.getElementById("gallery-grid")

  galleryImages.forEach((image, index) => {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"
    galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
            <div class="gallery-overlay">
                <span>🔍</span>
            </div>
        `

    galleryItem.addEventListener("click", () => {
      openLightbox(index)
    })

    galleryGrid.appendChild(galleryItem)
  })
}

function openLightbox(imageIndex) {
  currentGalleryImage = imageIndex
  lightboxImg.src = galleryImages[imageIndex].src
  lightboxImg.alt = galleryImages[imageIndex].alt
  lightbox.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.style.display = "none"
  document.body.style.overflow = "auto"
}

function navigateLightbox(direction) {
  if (direction === "next") {
    currentGalleryImage = (currentGalleryImage + 1) % galleryImages.length
  } else {
    currentGalleryImage = currentGalleryImage === 0 ? galleryImages.length - 1 : currentGalleryImage - 1
  }

  lightboxImg.src = galleryImages[currentGalleryImage].src
  lightboxImg.alt = galleryImages[currentGalleryImage].alt
}

// Testimonials Functions
function initializeTestimonials() {
  const testimonialContainer = document.getElementById("testimonial-container")
  const testimonialPrev = document.getElementById("testimonial-prev")
  const testimonialNext = document.getElementById("testimonial-next")

  // Render testimonials
  testimonials.forEach((testimonial, index) => {
    const testimonialElement = document.createElement("div")
    testimonialElement.className = `testimonial ${index === 0 ? "active" : ""}`
    testimonialElement.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <blockquote>"${testimonial.quote}"</blockquote>
            <cite>- ${testimonial.name}</cite>
        `

    testimonialContainer.appendChild(testimonialElement)
  })

  // Navigation buttons
  testimonialPrev.addEventListener("click", () => {
    navigateTestimonials("prev")
  })

  testimonialNext.addEventListener("click", () => {
    navigateTestimonials("next")
  })

  // Auto-rotate testimonials
  setInterval(() => {
    navigateTestimonials("next")
  }, 7000)
}

function navigateTestimonials(direction) {
  const testimonialElements = document.querySelectorAll(".testimonial")

  testimonialElements[currentTestimonial].classList.remove("active")

  if (direction === "next") {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length
  } else {
    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1
  }

  testimonialElements[currentTestimonial].classList.add("active")
}

// FAQ Functions
function initializeFAQ() {
  const faqContainer = document.getElementById("faq-container")

  faqData.forEach((faq) => {
    const faqItem = document.createElement("div")
    faqItem.className = "faq-item"
    faqItem.innerHTML = `
            <div class="faq-question">
                <span>${faq.question}</span>
                <span>+</span>
            </div>
            <div class="faq-answer">
                <p>${faq.answer}</p>
            </div>
        `

    const question = faqItem.querySelector(".faq-question")
    const answer = faqItem.querySelector(".faq-answer")
    const icon = question.querySelector("span:last-child")

    question.addEventListener("click", () => {
      const isActive = answer.classList.contains("active")

      // Close all other FAQ items
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.classList.remove("active")
      })
      document.querySelectorAll(".faq-question span:last-child").forEach((i) => {
        i.textContent = "+"
      })

      // Toggle current item
      if (!isActive) {
        answer.classList.add("active")
        icon.textContent = "-"
      }
    })

    faqContainer.appendChild(faqItem)
  })
}

// Modal Functions
function initializeModals() {
  // Order modal
  orderNowBtn.addEventListener("click", () => {
    orderModal.style.display = "block"
    document.body.style.overflow = "hidden"
  })

  closeOrderModal.addEventListener("click", () => {
    orderModal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Cart modal
  cartBtn.addEventListener("click", () => {
    renderCartItems()
    cartModal.style.display = "block"
    document.body.style.overflow = "hidden"
  })

  closeCartModal.addEventListener("click", () => {
    cartModal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Lightbox events
  lightboxClose.addEventListener("click", closeLightbox)
  lightboxPrev.addEventListener("click", () => navigateLightbox("prev"))
  lightboxNext.addEventListener("click", () => navigateLightbox("next"))

  // Close modals on outside click
  window.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      orderModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
    if (e.target === cartModal) {
      cartModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Checkout button
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty!")
      return
    }

    showNotification("Order submitted! We will contact you soon.")
    cart = []
    updateCartDisplay()
    saveCart()
    cartModal.style.display = "none"
    document.body.style.overflow = "auto"
  })
}

// Form Functions
function initializeForms() {
  // Order form
  document.getElementById("order-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showNotification("Order submitted! We will contact you soon.")
    orderModal.style.display = "none"
    document.body.style.overflow = "auto"
    e.target.reset()
  })

  // Contact form
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showNotification("Message sent! We will get back to you soon.")
    e.target.reset()
  })

  // Reservation form
  document.getElementById("reservation-form").addEventListener("submit", (e) => {
    e.preventDefault()
    showNotification("Table reserved! We will confirm your reservation soon.")
    e.target.reset()
  })
}

// Scroll Effects
function initializeScrollEffects() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item")

  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate")
    }, index * 200)
  })
}

// Utility Functions
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--amber-600);
        color: #374151;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 4000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        border: 2px solid var(--amber-500);
        font-weight: 500;
    `
  notification.textContent = message

  // Add to DOM
  document.body.appendChild(notification)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}


// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // Escape key closes modals
  if (e.key === "Escape") {
    if (orderModal.style.display === "block") {
      orderModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
    if (cartModal.style.display === "block") {
      cartModal.style.display = "none"
      document.body.style.overflow = "auto"
    }
    if (lightbox.style.display === "block") {
      closeLightbox()
    }
  }

  // Arrow keys for lightbox navigation
  if (lightbox.style.display === "block") {
    if (e.key === "ArrowLeft") {
      navigateLightbox("prev")
    }
    if (e.key === "ArrowRight") {
      navigateLightbox("next")
    }
  }

  // Arrow keys for hero slider
  if (document.getElementById("home").classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      goToSlide(currentSlide - 1)
    }
    if (e.key === "ArrowRight") {
      goToSlide(currentSlide + 1)
    }
  }
})

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img)
  })
}

// Service Worker for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/assets/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
