const cart = document.querySelector('#carrito');
const courseList = document.querySelector('#lista-cursos');
const contentCart = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.querySelector('#vaciar-carrito');
let articlesCart = [];

loadEventListeners();
function loadEventListeners() {
    courseList.addEventListener('click', addCourse);
    cart.addEventListener('click', deleteCourse);
    emptyCartBtn.addEventListener('click', () => {
        articlesCart = [];
        clearHTML();
    });
    
}

function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const course = e.target.parentElement.parentElement;
        readCourseData(course);
    }
}

function deleteCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const courseId = e.target.getAttribute('data-id');
        articlesCart = articlesCart.filter(course => course.id !== courseId);
        insertCart();
    }
}

function readCourseData (course) {
    //object with course data
    const courseData = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    
    const exist = articlesCart.some(course => course.id === courseData.id);
    if (exist) {
        const courses = articlesCart.map(course => {
            if (course.id === courseData.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });
        articlesCart = [...courses];
    }else {
        articlesCart = [...articlesCart, courseData];
    }


    console.log(articlesCart);
    insertCart();
}


function insertCart() {
    clearHTML();
    //read cart data and generate html
    articlesCart.forEach(course => {
        const {image, title, price, quantity, id} = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
                <img src="${image}" width=100>
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        contentCart.appendChild(row);
        
    });
}

function clearHTML() {
    // contentCart.innerHTML = '';

    while(contentCart.firstChild) {
        contentCart.removeChild(contentCart.firstChild);
    }
}