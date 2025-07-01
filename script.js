document.addEventListener('DOMContentLoaded', () => {

    // --- Core UI/UX Functions ---

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    window.addEventListener('mousemove', e => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });
    document.querySelectorAll('a, button, input, .brocode-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('pulse'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('pulse'));
    });

    // Scroll Progress Tracker
    const progressHeart = document.querySelector('.progress-heart');
    window.addEventListener('scroll', () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;
        if (progressHeart) {
            progressHeart.style.height = `${scrolledPercentage}%`;
        }
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(section => sectionObserver.observe(section));


    // --- Section 1: Home ---
    const animatedTitle = document.querySelector('.animated-title');
    new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            animatedTitle.style.animationDelay = '0.5s';
            observer.disconnect();
        }
    }).observe(animatedTitle);

    // --- Section 2: Ma ---
    const envelopeBtn = document.getElementById('envelope-btn');
    const envelopeMessage = document.getElementById('envelope-message');
    envelopeBtn.addEventListener('click', () => {
        envelopeMessage.classList.toggle('visible');
    });

    // --- Section 3: Papa ---
    const wisdomBtn = document.getElementById('spin-wisdom-btn');
    const wisdomQuote = document.getElementById('wisdom-quote');
    const wisdoms = [
        "You don’t need to talk to show up for people.",
        "Success without integrity is failure.",
        "Be the umbrella, not the thunder.",
        "Patience is a quiet form of action.",
        "Hard work speaks for itself."
    ];
    wisdomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * wisdoms.length);
        wisdomQuote.textContent = wisdoms[randomIndex];
    });

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
        });
    });

    // --- Section 4: Bro ---
    const broBtn = document.getElementById('spin-bro-btn');
    const broMood = document.getElementById('bro-mood');
    const moods = [
        "Mischief Maker 🐒",
        "Secret Genius 🧠",
        "Crybaby Commander 😢",
        "Meme God 😆",
        "Heart Holder 💖"
    ];
    broBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * moods.length);
        broMood.innerHTML = moods[randomIndex];
    });

    // BroCode Messages
    document.querySelectorAll('.brocode-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('revealed');
        });
    });

    // --- Section 5: Memory Lane ---
    // *** NEW JAVASCRIPT FOR TIMELINE ANIMATION ***
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay for a nicer effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => timelineObserver.observe(item));


    // --- Section 6: Final Note ---
    const finalLetterText = "To Mumma, Daddy, and my little Bro,\n\nThank you for being my first friends, my longest companions, and the truest form of love I’ve ever known. This website is only a fraction of what I feel for you. My real love lives in the way I carry you in every thought, every prayer, every dream.\n\nYou gave me a home built not from bricks, but from warmth, laughter, and love. I hope this digital hug reaches you whenever you need to feel loved.\n\nForever yours,\n[Simmi] 💗";
    const textElement = document.getElementById('final-letter-text');
    let i = 0;

    function typeWriter() {
        if (i < finalLetterText.length) {
            textElement.innerHTML += finalLetterText.charAt(i).replace('\n', '<br>');
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.disconnect();
        }
    }, { threshold: 0.5 }).observe(textElement);

    // Hug button with confetti and sound
    const hugBtn = document.getElementById('hug-btn');
    const chimeSound = document.getElementById('chime-sound');

    hugBtn.addEventListener('click', e => {
        chimeSound.currentTime = 0;
        chimeSound.play();
        for (let i = 0; i < 50; i++) {
            createHeartParticle(e.clientX, e.clientY);
        }
    });

    function createHeartParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'heart';
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = `hsl(${Math.random() * 60 + 330}, 100%, 80%)`;
        document.body.appendChild(particle);

        const angle = Math.random() * 360;
        const distance = Math.random() * 150 + 50;

        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(-50%, -50%) scale(0) rotate(${Math.random()*360}deg) translateX(${Math.cos(angle) * distance}px) translateY(${Math.sin(angle) * distance}px)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: 'ease-out'
        });

        setTimeout(() => particle.remove(), 2000);
    }
});