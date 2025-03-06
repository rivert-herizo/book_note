const addBookBtn = document.querySelector('.addbook');
const modal = document.querySelector('.form');
const closeBtn = document.querySelector('.close');

addBookBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
document.addEventListener('click', function(e) {
    if (modal.style.display === 'flex' && !modal.contains(e.target) && !addBookBtn.contains(e.target)) {
        modal.style.display = 'none';
    }
});


