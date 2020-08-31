// ------------------------------------------
//  CONSTANTS
// ------------------------------------------

const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log('Error:', error))
    }      

fetchData('https://randomuser.me/api/?results=12')
    .then(data => { 
        const employees = data.results
        employees.map(employee => generateEmployeeCard(employee))
              
        const cards = gallery.querySelectorAll(".card")
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                let target = event.target;
                const index = Array.from(cards).indexOf(target)
                // const index = cards.indexOf(target)
                generateModal(employees[index])             
            })
        })
    })     
    
        
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateEmployeeCard(employee) {
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
    gallery.insertAdjacentHTML('beforeend', html)
    
}

// generateModal(users[index]);
function generateModal(employee) {
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
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${employee.dob.date}</p>
                </div>
            </div>
        </div>
    `;
    gallery.insertAdjacentHTML('afterend', modalHtml)
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// Click the "X" button to close out of the modal
document.addEventListener('click', (e) => {
	let target = event.target;
	if (target.tagName === 'BUTTON') {
        document.querySelector('.modal-container').style.display = 'none';
    }
})


// ATTEMPTS: Click anywhere outside the modal to close the modal
// document.addEventListener('click', (e) => {
//     let modalContainer = document.querySelector('.modal-container')
//     if (modalContainer.style.display != 'none') {
//         let target = event.target;
//             if (target.className != '.modal') {
//                 document.querySelector('.modal-container').style.display = 'none';
//             }
//     }
// })
// document.querySelector('.modal-container').addEventListener('click', (e) => {
//     // let modalContainer = document.querySelector('.modal-container')
//     let target = event.target;
//     if (target.className != 'modal-info-container') {
//                 document.querySelector('.modal-container').style.display = 'none';
//             }
//     })


// ------------------------------------------
//  SEARCH FUNCTIONALITY
// ------------------------------------------

// Add search to HTML
searchContainer.innerHTML = `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`;

const search = document.getElementById("search-input")
const searchValue = search.value

// Array of all the employee cards
const cards = gallery.querySelectorAll(".card")