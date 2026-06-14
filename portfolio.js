// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// Voting System
const votes = {
    gill: localStorage.getItem('gill-votes') ? parseInt(localStorage.getItem('gill-votes')) : 0,
    farhan: localStorage.getItem('farhan-votes') ? parseInt(localStorage.getItem('farhan-votes')) : 0
};

function vote(player) {
    votes[player]++;
    
    // Save to localStorage
    localStorage.setItem(player + '-votes', votes[player]);
    
    // Update display
    document.getElementById(player + '-votes').textContent = votes[player];
    
    // Show animation
    const btn = event.target;
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Initialize vote counts on page load
window.addEventListener('load', () => {
    document.getElementById('gill-votes').textContent = votes.gill;
    document.getElementById('farhan-votes').textContent = votes.farhan;
});

// Quiz System
const quizAnswers = {
    q1: 0, // Index of correct answer - adjust based on your data
    q2: 2  // Index of correct answer - adjust based on your data
};

let quizAnswered = {
    q1: false,
    q2: false
};

function checkAnswer(questionId, btn) {
    if (quizAnswered[questionId]) return;
    
    const buttons = btn.parentElement.querySelectorAll('.quiz-btn');
    const correctIndex = quizAnswers[questionId];
    const selectedIndex = Array.from(buttons).indexOf(btn);
    
    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add('wrong');
        }
        button.disabled = true;
    });
    
    quizAnswered[questionId] = true;
    
    // Show result message
    const resultMsg = document.createElement('p');
    resultMsg.style.marginTop = '15px';
    if (selectedIndex === correctIndex) {
        resultMsg.textContent = '✅ Correct! Well done!';
        resultMsg.style.color = '#00ff00';
    } else {
        resultMsg.textContent = '❌ Not quite right. Try again!';
        resultMsg.style.color = '#ff6600';
    }
    resultMsg.style.textShadow = '0 0 10px ' + (selectedIndex === correctIndex ? '#00ff00' : '#ff6600');
    resultMsg.style.fontWeight = 'bold';
    
    if (!btn.parentElement.querySelector('p')) {
        btn.parentElement.appendChild(resultMsg);
    }
}

// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add click animation to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});
