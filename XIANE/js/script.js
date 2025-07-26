document.addEventListener('DOMContentLoaded', function() {
    const flap = document.querySelector('.flap');
    const envelope = document.querySelector('.envelope');
    const surpriseContainer = document.querySelector('.surprise-container');
    const surpriseBtn = document.getElementById('surprise-btn');
    const paperMessage = document.querySelector('.paper-message');
    const messageText = document.getElementById('message-text');
    const floatingGif = document.querySelector('.floating-gif');
    const floatingGif2 = document.querySelector('.floating-gif2');
    let isOpen = false;
    let paperDropped = false;
    let originalMessage = messageText.textContent;
    let permanentlyOpened = false;

    function animateMessage(text, element, speed = 40) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    envelope.addEventListener('click', function() {
        if (permanentlyOpened) return;
        if (isOpen) {
            // Do nothing, can't close once opened
        } else {
            flap.style.transform = 'translateX(-50%) rotateX(180deg)';
            isOpen = true;
            surpriseContainer.style.display = 'block';
        }
    });

    surpriseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!paperDropped) {
            surpriseContainer.style.display = 'none';
            paperMessage.style.display = 'flex';
            paperMessage.classList.add('paper-drop');
            paperDropped = true;
            animateMessage(originalMessage, messageText);
            permanentlyOpened = true;
            if (floatingGif) floatingGif.style.display = 'block';
            if (floatingGif2) floatingGif2.style.display = 'block';
            // Trigger confetti effect
            if (typeof confetti === 'function') {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 }
                });
            }
        }
    });

    // Add hover effect
    envelope.addEventListener('mouseenter', function() {
        if (!isOpen) {
            flap.style.transform = 'translateX(-50%) rotateX(10deg)';
        }
    });

    envelope.addEventListener('mouseleave', function() {
        if (!isOpen) {
            flap.style.transform = 'translateX(-50%) rotateX(0deg)';
        }
    });
});
