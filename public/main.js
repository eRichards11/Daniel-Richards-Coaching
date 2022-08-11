//scroll animation

const scrollOffset = 10;

const scrollElement = document.querySelectorAll(".scroll")


const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top

  return (
    elementTop <=
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  )
}

scrollElement.forEach(scrolled => {
    const displayScrollElement = () => {
        scrolled.classList.add('scrolled')
      }

      const hideScrollElement = () => {
        scrolled.classList.remove('scrolled')
      }

      const handleScrollAnimation = () => {
        if (elementInView(scrolled, scrollOffset)) {
            displayScrollElement()
        } else {
          hideScrollElement()
        }
      }

    let throttleTimer = false

    const throttle = (callback, time) => {
        if (throttleTimer) return
        throttleTimer = true

        setTimeout(() => {
            callback();
            throttleTimer = false
        }, time)
    }

    window.addEventListener('scroll', () => {
        throttle(handleScrollAnimation, 250)
    })

})



//checking for 'prefer reduced animation'
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

window.addEventListener("scroll", () => {
  if (mediaQuery && !mediaQuery.matches) {
    handleScrollAnimation()
  }
})

// Adding jQuery

const head = document.getElementsByTagName('head')[0];
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-2.2.1.min.js";

script.onreadystatechange = handler;
script.onload = handler;

head.appendChild(script);

function handler(){
   console.log('jquery added :)');
}

//tab styling

const tabs = document.querySelectorAll('[data-tab-target]')
const tabContent = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContent.forEach(tabContent => {
      tabContent.classList.remove('activeTab')
    })

    tabs.forEach(tab => {
        tab.classList.remove('activeTab')
      })

    tab.classList.add('activeTab')
    target.classList.add('activeTab')
  })
})

//exercise search bar function

function searchPlays() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('drills')

    for (let i = 0; i < x.length; i++) {
        let tag = x[i].getAttribute('data-filter')
        if (!tag.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";
        }
    }
}

//filter box

function openFilter() {
  document.getElementById('filter-input-wrapper').style.display = 'block'
}


let addFilter = document.getElementById('addFilter')

addFilter.addEventListener('click', (e) => {
let x = document.getElementsByClassName('drills')
let checkboxes = document.querySelectorAll('input[name="filter"]:checked')
let values = []
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    })
  for (let element of x) {
    const filter = element.getAttribute('data-filter');
    element.style.display = values.includes(filter)? 'block' : 'none'
  }

document.getElementById('filter-input-wrapper').style.display = 'none'
})


let removeFilter = document.getElementById('removeFilter')

removeFilter.addEventListener('click', (e) => {
  let x = document.getElementsByClassName('drills')
    for (let element of x) {
      element.style.display = 'block'
    }
  document.getElementById('filter-input-wrapper').style.display = 'none'
})

const targetImg = document.getElementsByClassName('resourceImg')
const closeImg = document.getElementsByClassName('closeEnlarge')


  for (const img of targetImg) {
    img.addEventListener('click', () => {
    img.classList.add('activeView')
      for(const closeEnlarge of closeImg) {
        closeEnlarge.classList.add('activeView')
      }
      window.scrollTo(0, 0)
  })
}

for(const closeEnlarge of closeImg) {
  closeEnlarge.addEventListener('click', () => {
    closeEnlarge.classList.remove('activeView')
    for (const img of targetImg) {
      img.classList.remove('activeView')
    }
  })
}


  