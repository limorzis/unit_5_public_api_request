// ------------------------------------------
//  CONSTANTS
// ------------------------------------------

const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const employeeData = []
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
        data.results.map(result => employeeData.push(result))
        employeeData.map(employee => generateEmployeeCard(employee))

        const cards = gallery.querySelectorAll('.card')
        const cardsArray = Array.from(cards)
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                let target = e.target.closest('.card');
                let index = cardsArray.indexOf(target)
                generateModal(employeeData[index], index) 
            })  
        })
        
        // Search employees
        const search = document.getElementById("search-input")
        const submit = document.getElementById("search-submit")

        submit.addEventListener('click', (event) => {
            searchNames(search, cardsArray);
        });

        search.addEventListener('keyup', (event) => {
            searchNames(search, cardsArray);
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
function generateModal(employee, index) {
    // Create modal HTML
    const modalHtml = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.thumbnail}" alt="profile picture">
                    <h3 id="${employee.name.last}" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.phone[0]}${employee.phone[1]}${employee.phone[2]}${employee.phone[3]}${employee.phone[4]} ${employee.phone[6]}${employee.phone[7]}${employee.phone[8]}${employee.phone[9]}${employee.phone[10]}${employee.phone[11]}${employee.phone[12]}${employee.phone[13]}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employee.dob.date[5]}${employee.dob.date[6]}/${employee.dob.date[8]}${employee.dob.date[9]}/${employee.dob.date[0]}${employee.dob.date[1]}${employee.dob.date[2]}${employee.dob.date[3]}</p>
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
        switchModal(employeeData[index - 1])
    })

    const nextButton = document.querySelector('.modal-next')
    nextButton.addEventListener('click', (e) => {
        switchModal(employeeData[index + 1])
    })
}


// ------------------------------------------
// DISPLAY PREVIOUS AND NEXT MODAL
function switchModal(employee, index) {
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.style.display = 'none';
    modalContainer.classList.remove('modal-container')
    modalContainer.classList.add('modal-closed')
    generateModal(employee, index)
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