
const COURSES_API = 'https://60d4611a61160900173cb070.mockapi.io/courses'
let header = document.querySelector('.navigation')
let navBar = document.querySelector('.navbar-collapse')

let navBarToggle = document.querySelector('.navbar-toggle')
navBarToggle.addEventListener('click', () => {
    navBarToggle.classList.toggle('active')
    navBar.classList.toggle('active')
})

let backToTop = document.querySelector('.back-to-top')
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
    })
})

window.onscroll = () => {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }

    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        backToTop.classList.add('active')
    } else {
        backToTop.classList.remove('active')
    }
}


let carouselItems = document.querySelectorAll('.single-slider')
let prevBtn = document.querySelector('.prev-btn')
let nextBtn = document.querySelector('.next-btn')

let slidePosition = 0
const totalSlide = carouselItems.length

prevBtn.addEventListener("click", function () {
    moveToPrevSlide();
});

nextBtn.addEventListener("click", function () {
    moveToNextSlide();
});

let infinite = setInterval(moveToNextSlide, 10000)

function updateSlidePosition() {
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].classList.remove('slider-active')
        carouselItems[i].classList.add('slider-hidden')
    }
    carouselItems[slidePosition].classList.add('slider-active');
}

function moveToNextSlide() {
    if (slidePosition === totalSlide - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    resetInfinite()
    updateSlidePosition();
}

function moveToPrevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSlide - 1;
    } else {
        slidePosition--;
    }
    resetInfinite()
    updateSlidePosition();
}

function resetInfinite() {
    clearInterval(infinite)
    infinite = setInterval(moveToNextSlide, 10000)
}

let prevButton = document.querySelector('.category-prev')
let nextButton = document.querySelector('.category-next')

document.addEventListener('DOMContentLoaded', () => {
    $('.category-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: prevButton,
        nextArrow: nextButton,
         responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
              breakpoint: 767.98,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 575.98,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });

    $('.feedback-container').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        dotsClass: 'feedback-dot',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2
            //   }
            // },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1
            //   }
            // }
        ]
    });

    $('.logo-container').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2
            //   }
            // },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1
            //   }
            // }
        ]
    });
})


let courseContainer = document.querySelector('.course-container')
let coursePrev = document.querySelector('.course-prev')
let courseNext = document.querySelector('.course-next')

const getData = async (url) => {
    try {
        let res = await fetch(url)
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

const renderCourse = async (url) => {
    let data = await getData(url)
    let html = ''
    data.map(item => {
        let arrRated = ''
        let arrUnRated = ''
        for (let i = 0; i < item.rate; i++) {
            arrRated += '<li class="course-rated"><i class="fa fa-star"></i></li>'
        }
        for (let i = 0; i < 5 - item.rate; i++) {
            arrUnRated += '<li><i class="fa fa-star"></i></li>'
        }

        html += `
        <div class="single-course" style="width: 400px;">
        <div class="course-top relative">
            <div>
                <img src=${item.image} referrerpolicy="no-referrer" alt="Course">
            </div>
            <div class="level">
                ${item.level}
            </div>
            <div class="save">
                <i class="fa-regular fa-bookmark"></i>
            </div>
        </div>
        <div class="course-body">
            <ul>
            ${arrRated}             
            ${arrUnRated}             
            </ul>
            <span>${item.rate}.00 (${item.rate_quantity})</span>
            <a href="#">
                <h4>${item.name}</h4>
            </a>
            <ul class="user">
                <li><a href="#"><i class="fa fa-user"></i><span>${item.total_enrolled}</span></a></li>
                <li><a href="#"><i class="fa-regular fa-clock"></i><span>${item.duration}</span></a></li>
            </ul>
            <div class="course-teacher flex items-center justify-between">
                <div class="flex items-center">
                    <a href="#">
                        <img src="./src/imgs/t-1.jpg" alt="teacher">
                    </a>
                    <a href="#" class="ml-3">
                        by <span>
                            ${item.teacher}
                        </span>
                        in
                        <span>
                            ${item.categories}
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="course-bottom">
            <div class="flex justify-between items-center">
                <div class="bottom-item">
                    $${item.price}
                </div>
                <div class="bottom-item">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Get enrolled</span>
                </div>
            </div>
        </div>
    </div>
    `
        courseContainer.innerHTML = html
    })

    let saveBtns = document.querySelectorAll('.save')
    saveBtns.forEach(item => item.addEventListener('click', () => {
        item.classList.toggle('saved')
    }))

    $('.course-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: coursePrev,
        nextArrow: courseNext,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
              breakpoint: 767.98,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1
            //   }
            // }
        ]
    });
}

renderCourse(COURSES_API)


let videoBtn = document.querySelector('.Video-popup')
let myModal = document.querySelector('.myModal')
let modalClose = document.querySelector('.close-btn')
let iframe = document.querySelector('iframe');

let stopAllYouTubeVideos = () => {
    let iframeSrc = iframe.src;
    iframe.src = iframeSrc;
}

videoBtn.addEventListener('click', () => {
    myModal.classList.add('active')
})

modalClose.addEventListener('click', () => {
    stopAllYouTubeVideos();
    myModal.classList.remove('active')
})

window.onclick = (e) => {
    if (e.target === myModal) {
        stopAllYouTubeVideos();
        myModal.classList.remove('active')
    }
}

