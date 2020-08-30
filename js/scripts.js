// ------------------------------------------
//  CONSTANTS
// ------------------------------------------

const gallery = document.getElementById('gallery');


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
        const students = data.results
        students.map(student => generateStudentCard(student))
              
        const cards = gallery.querySelectorAll(".card")
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                let target = event.target;
                const index = Array.from(cards).indexOf(target)
                // const index = cards.indexOf(target)
                generateModal(students[index])
                console.log(students[index])                
            })
        })
    })     
    
        
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateStudentCard(student) {
    const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${student.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${student.name.last}" class="card-name cap">${student.name.first} ${student.name.last}</h3>
                <p class="card-text">${student.email}</p>
                <p class="card-text cap">${student.location.city}, ${student.location.state}</p>
            </div>
        </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html)
    
}

// generateModal(users[index]);
function generateModal(student) {
    const modalHtml = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${student.picture.thumbnail}" alt="profile picture">
                    <h3 id="${student.name.last}" class="modal-name cap">${student.name.first} ${student.name.last}</h3>
                    <p class="modal-text">${student.email}</p>
                    <p class="modal-text cap">${student.location.city}</p>
                    <hr>
                    <p class="modal-text">${student.phone}</p>
                    <p class="modal-text">${student.location.street.number} ${student.location.street.name} ${student.location.city}, ${student.location.state} ${student.location.postcode}</p>
                    <p class="modal-text">Birthday: ${student.dob.date}</p>
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


// Attempts: Click anywhere outside the modal to close the modal
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
