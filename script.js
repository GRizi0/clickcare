/* =============================================
   Click with Care - Shared JavaScript
   ============================================= */

/* --- Navbar toggle (mobile) --- */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  /* Mark active nav link based on current page */
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
});

/* =============================================
   Quiz Logic (only runs on smart-shopping.html)
   ============================================= */

/* Quiz data: question, options, correct index (0-based), explanation */
var quizData = [
  {
    question: "1. An online store offers a brand-new smartphone for ₱500. What should you do?",
    options: [
      "Buy it immediately before the deal runs out.",
      "Be suspicious — unrealistically low prices are a common scam warning sign.",
      "Share the link with friends so they can buy it too.",
      "Assume it is a genuine clearance sale."
    ],
    correct: 1,
    explanation: "Prices that are far below market value are a major red flag for fraudulent sellers."
  },
  {
    question: "2. A seller's advertisement says \"50% OFF — Original Price ₱10,000, Now ₱5,000!\" but the item was never actually sold at ₱10,000. This is an example of:",
    options: [
      "A legitimate promotional discount.",
      "A fake discount — an unethical advertising practice.",
      "A government-regulated sale.",
      "A standard seasonal markdown."
    ],
    correct: 1,
    explanation: "Advertising a false original price to make a discount look bigger is a misleading and unethical practice."
  },
  {
    question: "3. Which of the following best protects your personal information when shopping online?",
    options: [
      "Using the same password for all shopping accounts.",
      "Sharing your OTP with the seller to confirm your order.",
      "Using a secure payment method and never sharing your OTP or PIN.",
      "Saving your card details on every website for convenience."
    ],
    correct: 2,
    explanation: "Legitimate sellers and payment providers will never ask for your OTP or PIN. Keep these private at all times."
  },
  {
    question: "4. You receive a message from an unknown number saying you won a prize and must click a link to claim it. What should you do?",
    options: [
      "Click the link quickly before the offer expires.",
      "Reply with your full name and address to claim the prize.",
      "Ignore it — this is a common phishing or scam message.",
      "Forward it to your contacts so they can also win."
    ],
    correct: 2,
    explanation: "Unsolicited prize messages with suspicious links are a common phishing tactic. Do not click or reply."
  },
  {
    question: "5. A product listing shows a low base price but does not mention shipping fees until checkout. This practice is:",
    options: [
      "Acceptable because shipping fees are always optional.",
      "Misleading — hiding fees is an unethical advertising practice.",
      "Required by law to protect consumers.",
      "Normal and expected in all online stores."
    ],
    correct: 1,
    explanation: "Ethical sellers clearly state all fees upfront. Hiding shipping costs until checkout is a deceptive practice."
  }
];

function initQuiz() {
  var form = document.getElementById('quiz-form');
  if (!form) return; /* Not on the quiz page */

  var submitBtn  = document.getElementById('quiz-submit');
  var retryBtn   = document.getElementById('quiz-retry');
  var resultBox  = document.getElementById('quiz-result');

  /* Build quiz HTML */
  var html = '';
  quizData.forEach(function (q, i) {
    html += '<div class="quiz-question" id="qq-' + i + '">';
    html += '<p>' + q.question + '</p>';
    q.options.forEach(function (opt, j) {
      html += '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + opt + '</label>';
    });
    html += '</div>';
  });
  form.innerHTML = html;

  submitBtn.addEventListener('click', function () {
    var score = 0;
    var feedback = '';
    var allAnswered = true;

    quizData.forEach(function (q, i) {
      var selected = form.querySelector('input[name="q' + i + '"]:checked');
      if (!selected) { allAnswered = false; return; }

      var val = parseInt(selected.value);
      if (val === q.correct) {
        score++;
        feedback += '<p class="correct">Q' + (i + 1) + ': Correct ✔</p>';
      } else {
        feedback += '<p class="wrong">Q' + (i + 1) + ': Incorrect ✘ — Correct answer: ' + q.options[q.correct] + '</p>';
      }
      feedback += '<p class="explain">' + q.explanation + '</p>';
    });

    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    /* Disable inputs after submit */
    form.querySelectorAll('input[type="radio"]').forEach(function (r) { r.disabled = true; });
    submitBtn.style.display = 'none';
    retryBtn.style.display  = 'inline-block';

    var passed = score >= 3;
    resultBox.className = 'show ' + (passed ? 'pass' : 'fail');
    resultBox.innerHTML =
      '<strong>Your Score: ' + score + ' / ' + quizData.length + '</strong> — ' +
      (passed ? 'Great job! You have a good understanding of online consumer safety.' : 'Keep learning! Review the Safety and Consumer Rights pages and try again.') +
      '<div class="answer-feedback">' + feedback + '</div>';
  });

  retryBtn.addEventListener('click', function () {
    initQuiz(); /* Re-render quiz */
    resultBox.className = '';
    resultBox.innerHTML = '';
    retryBtn.style.display  = 'none';
    submitBtn.style.display = 'inline-block';
  });
}

document.addEventListener('DOMContentLoaded', initQuiz);
