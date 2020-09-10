// ------------------------------------------
//  CONSTANTS
// ------------------------------------------

const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const employees = []
// ------------------------------------------
//  FETCH DATA
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Error:', error))
    }      

fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => { 
        data.results.map(result => employees.push(result))
        employees.map(employee => generateEmployeeCard(employee))

        const cards = gallery.querySelectorAll('.card')
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                let target = e.target.closest('.card');
                let index = Array.from(cards).indexOf(target)
                generateModal(employees[index], index) 
            })  
        })
        
        // Search employees
        const search = document.getElementById("search-input")
        const employeeArray = Array.from(cards)
        const submit = document.getElementById("search-submit")

        submit.addEventListener('click', (event) => {
            searchNames(search, employeeArray);
        });

        search.addEventListener('keyup', (event) => {
            searchNames(search, employeeArray);
        });


    })     
    
        
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// ------------------------------------------
// GENERATE EMPLOYEE CARD
function generateEmployeeCard(employee) {
    // Create employee card HTML
    const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${employee.name.last}" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
    `;
    
    // Insert employee card HTML
    gallery.insertAdjacentHTML('beforeend', html)   
}

// ------------------------------------------
// GENERATE MODAL 
function generateModal(employees, index) {
    // Create modal HTML
    const modalHtml = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employees.picture.thumbnail}" alt="profile picture">
                    <h3 id="${employees.name.last}" class="modal-name cap">${employees.name.first} ${employees.name.last}</h3>
                    <p class="modal-text">${employees.email}</p>
                    <p class="modal-text cap">${employees.location.city}</p>
                    <hr>
                    <p class="modal-text">${employees.phone[0]}${employees.phone[1]}${employees.phone[2]}${employees.phone[3]}${employees.phone[4]} ${employees.phone[6]}${employees.phone[7]}${employees.phone[8]}${employees.phone[9]}${employees.phone[10]}${employees.phone[11]}${employees.phone[12]}${employees.phone[13]}</p>
                    <p class="modal-text">${employees.location.street.number} ${employees.location.street.name} ${employees.location.city}, ${employees.location.state} ${employees.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employees.dob.date[5]}${employees.dob.date[6]}/${employees.dob.date[8]}${employees.dob.date[9]}/${employees.dob.date[0]}${employees.dob.date[1]}${employees.dob.date[2]}${employees.dob.date[3]}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    
    // Insert modal HTML
    const body = document.querySelector('BODY')
    body.insertAdjacentHTML('beforeend', modalHtml)

    // Close modal
    const modalContainer = document.querySelector('.modal-container')
    const close = modalContainer.querySelector('.modal-close-btn')
    close.addEventListener('click', (e) => {
        let target = e.target.closest('.modal-close-btn');
            if (target.className === 'modal-close-btn') {
                document.querySelector('.modal-container').style.display = 'none'; 
                modalContainer.classList.remove('modal-container')
                modalContainer.classList.add('modal-closed')
            }
    })

    // Previous and next modals
    const prevButton = document.querySelector('.modal-prev')
    prevButton.addEventListener('click', (e) => {
        // let employeeArray = Array.from(employees)
        switchModal(employees[index - 1])
    })

    const nextButton = document.querySelector('.modal-next')
    nextButton.addEventListener('click', (e) => {
        // let employeeArray = Array.from(employees)
        switchModal(employees[index + 1])
    })
}

// ------------------------------------------
// SEARCH EMPLOYEES 
searchContainer.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;
function searchNames(search, employeeArray) {

    if (search.value.length != 0) {
      for (let i = 0; i < employeeArray.length; i++) {
        let employeeName = employeeArray[i].querySelector("h3").textContent;
        if (employeeName.toLowerCase().includes(search.value.toLowerCase())) {
          employeeArray[i].style.display = 'inline-block';
        } else {
          employeeArray[i].style.display = 'none'; 
        };
      }; 
    } else {
        for (let i = 0; i < 12; i++) {
            employeeArray[i].style.display = 'inline-block';
        };
    };
};


// ------------------------------------------
// DISPLAY PREVIOUS AND NEXT MODAL
function switchModal(employees, index) {
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.style.display = 'none';
    modalContainer.classList.remove('modal-container')
    modalContainer.classList.add('modal-closed')
    generateModal(employees, index)
}










// ATTEMPTS : Click anywhere to close out of the modal
// document.querySelector('.modal-container').addEventListener('click', (e) => {
//     let target = event.target;
//     if (target.closest.className != 'modal-info-container') {
//         document.querySelector('.modal-container').style.display = 'none';
//     }
// })

// document.addEventListener('click', (e) => {
//     let modalContainer = document.querySelector('.modal-container')
//     if (modalContainer.style.display != 'none') {
//         let target = event.target;
//             if (target.className != '.modal') {
//                 document.querySelector('.modal-container').style.display = 'none';
//             }
//     }
// })