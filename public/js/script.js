const addBookBtn = document.querySelector('.addbook');
const modal = document.querySelector('.form');
const closeBtn = document.querySelector('.close');

// Open Add Book Modal
addBookBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
});

// Close Add Book Modal
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close Add Book Modal when clicking outside
document.addEventListener('click', function(e) {
    if (modal.style.display === 'flex' && !modal.contains(e.target) && !addBookBtn.contains(e.target)) {
        modal.style.display = 'none';
    }
});

// Get all edit buttons and forms
const editBookBtns = document.querySelectorAll('.editBook');
const editModals = document.querySelectorAll('.editBookForm');
const editCloseBtns = document.querySelectorAll('.editclose');

// Loop through each edit button and add event listeners
editBookBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        editModals[index].style.display = 'flex';
    });

    // Close Edit Modal when clicking the close button
    editCloseBtns[index].addEventListener('click', function() {
        editModals[index].style.display = 'none';
    });

    // Close Edit Modal when clicking outside
    document.addEventListener('click', function(e) {
        if (editModals[index].style.display === 'flex' &&
            !editModals[index].contains(e.target) &&
            !btn.contains(e.target)) {
            editModals[index].style.display = 'none';
        }
    });
});
