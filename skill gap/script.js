let myRadarChart;
let progressChartInstance; 

// --- 1. LOGIN & NAVIGATION LOGIC ---
function handleLogin() {
    const user = document.getElementById('username').value;
    if(user) {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('app-sidebar').classList.remove('hidden');
        document.getElementById('app-main').classList.remove('hidden');
        document.getElementById('profile-name').innerText = user;
    } else {
        alert("Please enter a username");
    }
}

function switchSection(sectionId, navElement) {
    document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
    document.getElementById(sectionId + '-section').classList.remove('hidden');
    
    if (navElement) {
        document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
        navElement.classList.add('active');
    }
}

// --- 2. PROFILE ACHIEVEMENTS LOGIC ---
function addProfileAchievement(achievementText, icon) {
    const achievementsRow = document.getElementById('achievements-row');
    if (!achievementsRow) return; 
    
    // Check if the achievement already exists to avoid duplication
    const existingTags = Array.from(achievementsRow.querySelectorAll('.achievement-tag'));
    const matches = existingTags.some(tag => tag.innerText.includes(achievementText));
    if (matches) return;

    const newTag = document.createElement('div');
    newTag.className = 'tag achievement-tag fade-in';
    newTag.innerHTML = `${icon} ${achievementText}`;
    achievementsRow.appendChild(newTag);
}

// --- 3. AI CAREER TOOLKIT LOGIC ---
const roleDataDictionary = {
    "Frontend Developer": { summary: "Detail-oriented Frontend Engineer specializing in crafting high-performance, responsive user interfaces using modern JavaScript frameworks.", gigTitle: "I will build a stunning, responsive React website for your business", gigTags: "reactjs, frontend, ui design, web development", gigDesc: "Need a modern, high-performance website? I specialize in crafting beautiful, responsive user interfaces." },
    "Backend Developer": { summary: "Robust Backend Developer skilled in designing scalable server-side architectures, managing databases, and building secure RESTful APIs.", gigTitle: "I will develop a secure backend and API for your application", gigTags: "backend, api, database, python, nodejs", gigDesc: "I build the invisible engines that power your apps. From secure database architecture to lightning-fast APIs." },
    "Full Stack Developer": { summary: "Versatile Full-Stack Engineer experienced in building robust client-side interfaces and optimizing secure, scalable server-side systems.", gigTitle: "I will develop a complete full-stack web application with database integration", gigTags: "full stack, web app, backend, javascript, database", gigDesc: "From custom frontend designs to secure backend architectures, I build scalable web applications tailored to your business logic." },
    "UI/UX Designer": { summary: "Creative UI/UX Designer dedicated to designing intuitive and aesthetically pleasing user interfaces.", gigTitle: "I will design a modern, glowing glassmorphism UI for your app", gigTags: "ui ux, app design, web design, figma", gigDesc: "I create visually striking, user-centric designs that engage audiences." },
    "Data Scientist": { summary: "Analytical Data Scientist adept at leveraging machine learning algorithms, statistical modeling, and data visualization.", gigTitle: "I will build custom machine learning models and analyze your data", gigTags: "data science, machine learning, python, data analysis", gigDesc: "Unlock the hidden value in your data. I provide end-to-end data science services." }
};

function updateCareerToolkit(predictedRole, userSkillsInput) {
    const username = document.getElementById('username').value || "User";
    const roleData = roleDataDictionary[predictedRole] || {
        summary: `Ambitious technology professional focused on continuous skill development in ${predictedRole}.`,
        gigTitle: `I will provide professional ${predictedRole} services`,
        gigTags: "tech, development, professional, consulting",
        gigDesc: `I offer dedicated and high-quality services tailored to your specific technical requirements.`
    };

    const cvNameEl = document.getElementById('cv-name');
    if(cvNameEl) cvNameEl.innerText = username.toUpperCase();
    
    const cvHeadlineEl = document.getElementById('cv-headline');
    if(cvHeadlineEl) cvHeadlineEl.innerText = predictedRole;
    
    const cvSummaryEl = document.getElementById('cv-summary');
    if(cvSummaryEl) cvSummaryEl.innerText = roleData.summary;
    
    const skillsArray = userSkillsInput.split(',').map(s => s.trim());
    const skillsContainer = document.getElementById('cv-skills');
    if(skillsContainer) {
        skillsContainer.innerHTML = '';
        skillsArray.forEach(skill => {
            if(skill) skillsContainer.innerHTML += `<span class="gap-tag" style="background: rgba(0, 210, 255, 0.2); color: #00d2ff;">${skill}</span>`;
        });
    }

    const gigTitleEl = document.getElementById('gig-title');
    if(gigTitleEl) gigTitleEl.innerText = roleData.gigTitle;
    
    const gigTagsEl = document.getElementById('gig-tags');
    if(gigTagsEl) gigTagsEl.innerText = roleData.gigTags;
    
    const gigDescEl = document.getElementById('gig-desc');
    if(gigDescEl) gigDescEl.innerText = `"${roleData.gigDesc}"`;

    generatePortfolioCode(username, predictedRole, skillsArray);
}

function generatePortfolioCode(name, role, skills) {
    const skillsHtml = skills.filter(s => s).map(s => `<span class="skill-pill">${s}</span>`).join('\n                ');
    const generatedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | ${role}</title>
    <style>
        :root { --bg-grad: linear-gradient(135deg, #0f2027, #203a43, #2c5364); --glass: rgba(255, 255, 255, 0.05); --border: rgba(255, 255, 255, 0.1); --neon: #00d2ff; }
        body { margin: 0; min-height: 100vh; background: var(--bg-grad); color: white; font-family: 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; }
        .glass-container { background: var(--glass); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid var(--border); border-radius: 20px; padding: 40px; max-width: 600px; text-align: center; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); }
        h1 { margin: 0 0 10px; font-size: 2.5rem; text-shadow: 0 0 10px var(--neon); }
        h3 { margin: 0 0 20px; color: #aaa; font-weight: 400; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px; }
        .skill-pill { background: rgba(0, 210, 255, 0.1); border: 1px solid var(--neon); padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; box-shadow: 0 0 8px rgba(0, 210, 255, 0.2); }
        .contact-btn { margin-top: 30px; background: transparent; color: var(--neon); border: 2px solid var(--neon); padding: 10px 30px; border-radius: 25px; font-size: 1rem; cursor: pointer; transition: 0.3s; }
        .contact-btn:hover { background: var(--neon); color: #000; box-shadow: 0 0 15px var(--neon); }
    </style>
</head>
<body>
    <div class="glass-container">
        <h1>${name}</h1><h3>${role}</h3>
        <p>I build robust, high-performance applications with modern aesthetics.</p>
        <div class="skills-grid">\n                ${skillsHtml}\n        </div>
        <button class="contact-btn">Hire Me</button>
    </div>
</body>
</html>`;
    const codeOutput = document.getElementById('portfolio-code-output');
    if(codeOutput) codeOutput.value = generatedCode.trim();
}

function copyPortfolioCode() {
    const codeOutput = document.getElementById('portfolio-code-output');
    codeOutput.select();
    document.execCommand("copy");
    alert("Glassmorphism Portfolio Code copied to clipboard!");
}

// --- 4. ANALYZE SKILLS (WITH MULTI-LABEL EXTRACTION) ---
async function analyzeSkills() {
    const input = document.getElementById('skillInput').value;
    const loader = document.getElementById('loader');
    
    if(!input) return alert("Please enter skills!");
    
    loader.classList.remove('hidden');
    document.getElementById('analysis-results').classList.add('hidden');

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skills: input })
        });
        const data = await response.json();
        const primaryMatch = data.primary;
        
        loader.classList.add('hidden');
        document.getElementById('analysis-results').classList.remove('hidden');
        
        document.getElementById('predictedRole').innerText = primaryMatch.role;
        document.getElementById('scoreValue').innerText = `Match Score: ${primaryMatch.score}%`;
        
        updateCareerToolkit(primaryMatch.role, input);
        
        const gapsContainer = document.getElementById('gapsList');
        gapsContainer.innerHTML = '';
        if(primaryMatch.gaps.length === 0) {
            gapsContainer.innerHTML = '<span style="color:#2ecc71">No gaps! You are ready.</span>';
        } else {
            primaryMatch.gaps.forEach(gap => {
                gapsContainer.innerHTML += `<span class="gap-tag">${gap}</span>`;
            });
        }
        renderChart(primaryMatch.score);
        updateLearningHub(primaryMatch.gaps);
        
    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        alert("Backend not running! Start app.py for live analysis.");
    }
}

// --- 5. DASHBOARD RADAR CHART ---
function renderChart(userScore) {
    const ctx = document.getElementById('skillRadarChart').getContext('2d');
    if (myRadarChart) myRadarChart.destroy();

    myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Coding', 'Tools', 'Concepts', 'Cloud', 'Soft Skills'],
            datasets: [{
                label: 'Industry Requirement',
                data: [90, 85, 80, 70, 75],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }, {
                label: 'Your Profile',
                data: [userScore, userScore-10, userScore+5, userScore-20, userScore],
                backgroundColor: 'rgba(0, 210, 255, 0.2)',
                borderColor: '#00d2ff',
                borderWidth: 2
            }]
        },
        options: {
            scales: { r: { angleLines: { color: 'rgba(255,255,255,0.1)' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: 'white' }, suggestedMin: 0, suggestedMax: 100 } },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

// --- 6. INTELLIGENT LEARNING HUB (FUZZY LOGIC) ---
const courseDatabase = {
    "react": { title: "Advanced React Patterns", tag: "Frontend" },
    "aws": { title: "AWS Cloud Practitioner", tag: "Cloud" },
    "sql": { title: "SQL Database Masterclass", tag: "Backend" },
    "python": { title: "Python for Data Science", tag: "Data" },
    "docker": { title: "Docker & Kubernetes", tag: "DevOps" },
    "figma": { title: "Figma UI/UX Design", tag: "Design" }
};

function editDistance(s1, s2) {
    s1 = s1.toLowerCase(); s2 = s2.toLowerCase();
    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function similarityScore(s1, s2) {
    let longer = s1.length < s2.length ? s2 : s1;
    let shorter = s1.length < s2.length ? s1 : s2;
    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

function findClosestCourse(gapSkill) {
    let bestMatch = null;
    let highestSim = 0;
    Object.keys(courseDatabase).forEach(courseKey => {
        let sim = similarityScore(gapSkill.toLowerCase(), courseKey.toLowerCase());
        if(sim > highestSim) {
            highestSim = sim;
            bestMatch = courseDatabase[courseKey];
        }
    });
    return highestSim > 0.4 ? bestMatch : null;
}

function updateLearningHub(gaps) {
    const grid = document.getElementById('dynamic-course-grid');
    grid.innerHTML = ""; 
    let count = 0;
    gaps.forEach(gap => {
        const course = findClosestCourse(gap);
        if(course && count < 3) { 
            grid.innerHTML += `
                <div class="course-card fade-in">
                    <div class="course-img"><i class="fas fa-graduation-cap fa-3x"></i></div>
                    <div class="course-info">
                        <span class="tag">${course.tag}</span>
                        <h4 class="course-title">${course.title}</h4>
                        <p class="course-desc">Recommended to fix your gap in <strong>${gap}</strong>.</p>
                        <button class="course-btn">Start Learning</button>
                    </div>
                </div>
            `;
            count++;
        }
    });
    if(grid.innerHTML === "") grid.innerHTML = `<p style="color:#aaa;">No specific courses found for your gaps.</p>`;
}

// --- 7. NQT APTITUDE EXAM ENVIRONMENT (110 QUESTIONS MATRIX) ---
const questionBank = {
    numerical: [
        { q: "A work can be finished by 12 men in 15 days. In how many days can 20 men complete it?", a: ["8 days", "9 days", "10 days", "12 days"], correct: 1 },
        { q: "What is the next entry in the sequence: 4, 9, 25, 49, 121, ...?", a: ["144", "169", "196", "225"], correct: 1 },
        { q: "A tank can be filled by pipe A in 6 hours and by pipe B in 8 hours. Pipe C can empty the full tank in 12 hours. If all three pipes are opened simultaneously, in how much time will the empty tank be completely filled?", a: ["4.8 hours", "5 hours", "5.5 hours", "6 hours"], correct: 0 },
        { q: "The ratio of salaries of A and B is 4:5. If each receives a bump of $200, the ratio scales to 13:16. Find A's salary.", a: ["$1200", "$2400", "$1000", "$800"], correct: 3 },
        { q: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", a: ["120 metres", "180 metres", "324 metres", "150 metres"], correct: 3 },
        { q: "If the cost price of 12 pens is equal to the selling price of 8 pens, the gain percent is?", a: ["25%", "33.33%", "50%", "66.66%"], correct: 2 },
        { q: "What is the greatest number that will divide 1305, 4665, and 6905, leaving the same remainder in each case?", a: ["1120", "112", "11", "121"], correct: 0 },
        { q: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:", a: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"], correct: 2 },
        { q: "The sum of ages of 5 children born at intervals of 3 years each is 50 years. What is the age of the youngest child?", a: ["4 years", "8 years", "10 years", "None of these"], correct: 0 },
        { q: "If 20% of a = b, then b% of 20 is the same as:", a: ["4% of a", "5% of a", "20% of a", "None of these"], correct: 0 },
        { q: "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.", a: ["2 hours", "3 hours", "4 hours", "5 hours"], correct: 2 },
        { q: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?", a: ["3", "4", "5", "6"], correct: 2 },
        { q: "Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:", a: ["50 m", "72 m", "80 m", "82 m"], correct: 0 },
        { q: "What percentage of numbers from 1 to 70 have 1 or 9 in the unit's digit?", a: ["1", "14", "20", "21"], correct: 2 },
        { q: "A father said to his son, 'I was as old as you are at the present at the time of your birth'. If the father's age is 38 years now, the son's age five years back was:", a: ["14 years", "19 years", "33 years", "38 years"], correct: 0 },
        { q: "The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Re. 1. The sum is:", a: ["Rs. 625", "Rs. 630", "Rs. 640", "Rs. 650"], correct: 0 },
        { q: "Find the odd man out: 3, 5, 11, 14, 17, 21", a: ["21", "17", "14", "3"], correct: 2 },
        { q: "Tickets numbered 1 to 20 are mixed up and then a ticket is drawn at random. What is the probability that the ticket drawn has a number which is a multiple of 3 or 5?", a: ["1/2", "2/5", "8/15", "9/20"], correct: 3 },
        { q: "The angle of elevation of a ladder leaning against a wall is 60 degrees and the foot of the ladder is 4.6 m away from the wall. The length of the ladder is:", a: ["2.3 m", "4.6 m", "7.8 m", "9.2 m"], correct: 3 },
        { q: "A and B invest in a business in the ratio 3:2. If 5% of the total profit goes to charity and A's share is Rs. 855, the total profit is:", a: ["Rs. 1425", "Rs. 1500", "Rs. 1537.50", "Rs. 1576"], correct: 1 },
        { q: "In an election between two candidates, one got 55% of the total valid votes, 20% of the votes were invalid. If the total number of votes was 7500, the number of valid votes that the other candidate got was:", a: ["2700", "2900", "3000", "3100"], correct: 0 },
        { q: "A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:", a: ["588 apples", "600 apples", "672 apples", "700 apples"], correct: 3 },
        { q: "Three partners shared the profit in a business in the ratio 5:7:8. They had partnered for 14 months, 8 months and 7 months respectively. What was the ratio of their investments?", a: ["5:7:8", "20:49:64", "38:28:21", "None of these"], correct: 1 },
        { q: "A takes twice as much time as B or thrice as much time as C to finish a piece of work. Working together, they can finish the work in 2 days. B can do the work alone in:", a: ["4 days", "6 days", "8 days", "12 days"], correct: 1 },
        { q: "A sum of money is to be distributed among A, B, C, D in the proportion of 5:2:4:3. If C gets Rs. 1000 more than D, what is B's share?", a: ["Rs. 500", "Rs. 1500", "Rs. 2000", "None of these"], correct: 2 },
        { q: "The average of 20 numbers is zero. Of them, at most, how many may be greater than zero?", a: ["0", "1", "10", "19"], correct: 3 },
        { q: "A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:", a: ["45 km/hr", "50 km/hr", "54 km/hr", "55 km/hr"], correct: 1 },
        { q: "If log 2 = 0.3010 and log 3 = 0.4771, the value of log5 512 is:", a: ["2.870", "2.967", "3.876", "3.912"], correct: 2 },
        { q: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", a: ["7", "10", "12", "13"], correct: 1 },
        { q: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:", a: ["15", "16", "18", "25"], correct: 1 },
        { q: "The cube root of .000216 is:", a: [".6", ".06", ".006", "None of these"], correct: 1 },
        { q: "How many times in a day, are the hands of a clock in straight line but opposite in direction?", a: ["20", "22", "24", "48"], correct: 1 },
        { q: "Find the lowest common multiple of 24, 36 and 40.", a: ["120", "240", "360", "480"], correct: 2 },
        { q: "Find the simple interest on Rs. 5200 for 2 years at 6% per annum.", a: ["Rs. 450", "Rs. 524", "Rs. 600", "Rs. 624"], correct: 3 },
        { q: "The sum of the digits of a two-digit number is 15 and the difference between the digits is 3. What is the two-digit number?", a: ["69", "78", "96", "Cannot be determined"], correct: 3 },
        { q: "If 15% of 40 is greater than 25% of a number by 2, what is the number?", a: ["16", "20", "24", "32"], correct: 0 },
        { q: "A man buys a cycle for Rs. 1400 and sells it at a loss of 15%. What is the selling price?", a: ["Rs. 1090", "Rs. 1160", "Rs. 1190", "Rs. 1202"], correct: 2 },
        { q: "The average of first 50 natural numbers is:", a: ["25.30", "25.5", "25.00", "12.25"], correct: 1 },
        { q: "A 300 metre long train crosses a platform in 39 seconds while it crosses a signal pole in 18 seconds. What is the length of the platform?", a: ["320 m", "350 m", "300 m", "350 m"], correct: 1 },
        { q: "What is the probability of getting a sum 9 from two throws of a dice?", a: ["1/6", "1/8", "1/9", "1/12"], correct: 2 },
        { q: "In how many ways can the letters of the word 'LEADER' be arranged?", a: ["72", "144", "360", "720"], correct: 2 },
        { q: "A can do a piece of work in 4 hours; B and C together can do it in 3 hours, while A and C together can do it in 2 hours. How long will B alone take to do it?", a: ["8 hours", "10 hours", "12 hours", "24 hours"], correct: 2 },
        { q: "The sum of two numbers is 25 and their difference is 13. Find their product.", a: ["104", "114", "315", "325"], correct: 1 },
        { q: "Find the LCM of 2/3, 4/9, 5/6.", a: ["8/27", "20/3", "10/3", "20/27"], correct: 1 },
        { q: "The price of commodity X increases by 40 paise every year, while the price of commodity Y increases by 15 paise every year. If in 2001, the price of X was Rs. 4.20 and that of Y was Rs. 6.30, in which year will commodity X cost 40 paise more than Y?", a: ["2010", "2011", "2012", "2013"], correct: 1 },
        { q: "If A = x% of y and B = y% of x, then which of the following is true?", a: ["A is smaller than B.", "A is greater than B", "Relationship can't be determined.", "None of these"], correct: 4 },
        { q: "A shopkeeper sells some articles at Rs. 35 and earns a 40% profit. What will be the selling price if he wants to earn a 60% profit?", a: ["Rs. 40", "Rs. 45", "Rs. 50", "Rs. 55"], correct: 0 },
        { q: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?", a: ["3/4", "4/7", "1/8", "3/7"], correct: 1 },
        { q: "If the radius of a circle is increased by 50%, its area is increased by:", a: ["125%", "100%", "75%", "50%"], correct: 0 },
        { q: "The length of a rectangle is halved, while its breadth is tripled. What is the percentage change in area?", a: ["25% increase", "50% increase", "50% decrease", "75% decrease"], correct: 1 },
        { q: "A invested Rs. 10,000 for 9 months and B invested Rs. 18,000 for some times in a business. If the profits of A and B are equal, then the period of time for which B's capital was invested is:", a: ["6 months", "5 months", "4 months", "3 months"], correct: 1 },
        { q: "10 years ago, the average age of a family of 4 members was 24 years. Two children having been born (with age difference of 2 years), the present average age of the family is the same. The present age of the youngest child is:", a: ["1 year", "2 years", "3 years", "5 years"], correct: 2 },
        { q: "Two pipes can fill a tank in 20 and 24 minutes respectively and a waste pipe can empty 3 gallons per minute. All the three pipes working together can fill the tank in 15 minutes. The capacity of the tank is:", a: ["60 gallons", "100 gallons", "120 gallons", "180 gallons"], correct: 2 },
        { q: "In a 100 m race, A can give B 10 m and C 28 m. In the same race B can give C:", a: ["18 m", "20 m", "27 m", "9 m"], correct: 1 },
        { q: "Find the HCF of 54, 288, 360.", a: ["18", "36", "54", "108"], correct: 0 },
        { q: "A number consists of two digits. If the digits interchange places and the new number is added to the original number, then the resulting number will be divisible by:", a: ["3", "5", "9", "11"], correct: 3 },
        { q: "What least number must be subtracted from 13601 to get a number exactly divisible by 87?", a: ["49", "23", "29", "31"], correct: 2 },
        { q: "Which of the following numbers gives 240 when added to its own square?", a: ["15", "16", "18", "20"], correct: 0 },
        { q: "Evaluation of 8^3 * 8^2 * 8^-5 is:", a: ["1", "0", "8", "None of these"], correct: 0 },
        { q: "Three numbers are in the ratio 1:2:3 and their HCF is 12. The numbers are:", a: ["4, 8, 12", "5, 10, 15", "10, 20, 30", "12, 24, 36"], correct: 3 },
        { q: "The sum of first 45 natural numbers is:", a: ["1035", "1280", "2070", "2140"], correct: 0 },
        { q: "The average of 7 consecutive numbers is 20. The largest of these numbers is:", a: ["20", "22", "23", "24"], correct: 2 },
        { q: "The difference between a number and its three-fifth is 50. What is the number?", a: ["75", "100", "125", "None of these"], correct: 2 },
        { q: "If a quarter kg of potato costs 60 paise, how many paise will 200 gm cost?", a: ["48 paise", "54 paise", "56 paise", "72 paise"], correct: 0 },
        { q: "The value of (256)^(0.16) x (256)^(0.09) is:", a: ["4", "16", "64", "256.25"], correct: 0 },
        { q: "A clock strikes once at 1 o'clock, twice at 2 o'clock, thrice at 3 o'clock and so on. How many times will it strike in 24 hours?", a: ["78", "136", "156", "196"], correct: 2 },
        { q: "At what time between 4 and 5 o'clock will the hands of a watch point in opposite directions?", a: ["45 min. past 4", "40 min. past 4", "50 4/11 min. past 4", "54 6/11 min. past 4"], correct: 3 },
        { q: "Today is Monday. After 61 days, it will be:", a: ["Wednesday", "Saturday", "Tuesday", "Thursday"], correct: 1 },
        { q: "What was the day of the week on 28th May, 2006?", a: ["Thursday", "Friday", "Saturday", "Sunday"], correct: 3 },
        { q: "The compound interest on Rs. 30,000 at 7% per annum is Rs. 4347. The period (in years) is:", a: ["2", "2.5", "3", "4"], correct: 0 },
        { q: "A sum of money doubles itself in 10 years at simple interest. What is the rate of interest?", a: ["10%", "12%", "15%", "20%"], correct: 0 },
        { q: "A grocer has a sale of Rs. 6435, Rs. 6927, Rs. 6855, Rs. 7230 and Rs. 6562 for 5 consecutive months. How much sale must he have in the sixth month so that he gets an average sale of Rs. 6500?", a: ["Rs. 4991", "Rs. 5991", "Rs. 6001", "Rs. 6991"], correct: 0 },
        { q: "The average weight of 8 person's increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What might be the weight of the new person?", a: ["76 kg", "76.5 kg", "85 kg", "Data inadequate"], correct: 2 },
        { q: "A train covers a distance in 50 min, if it runs at a speed of 48 kmph on an average. The speed at which the train must run to reduce the time of journey to 40 min will be:", a: ["50 kmph", "55 kmph", "60 kmph", "70 kmph"], correct: 2 },
        { q: "Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?", a: ["9", "10", "12", "20"], correct: 1 },
        { q: "A man can row at 5 kmph in still water. If the velocity of current is 1 kmph and it takes him 1 hour to row to a place and come back, how far is the place?", a: ["2.4 km", "2.5 km", "3 km", "3.6 km"], correct: 0 },
        { q: "In one hour, a boat goes 11 km/hr along the stream and 5 km/hr against the stream. The speed of the boat in still water (in km/hr) is:", a: ["3 km/hr", "5 km/hr", "8 km/hr", "9 km/hr"], correct: 2 },
        { q: "Two numbers A and B are such that the sum of 5% of A and 4% of B is two-third of the sum of 6% of A and 8% of B. Find the ratio of A:B.", a: ["2:3", "1:1", "3:4", "4:3"], correct: 3 },
        { q: "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits?", a: ["32 kg", "40 kg", "52 kg", "80 kg"], correct: 1 },
        { q: "The population of a town increased from 1,75,000 to 2,62,500 in a decade. The average percent increase of population per year is:", a: ["4.37%", "5%", "6%", "8.75%"], correct: 1 },
        { q: "A student multiplied a number by 3/5 instead of 5/3. What is the percentage error in the calculation?", a: ["34%", "44%", "54%", "64%"], correct: 3 },
        { q: "If the cost price of 25 pens is equal to the selling price of 20 pens, then the profit percent is:", a: ["20%", "25%", "15%", "5%"], correct: 1 },
        { q: "Some articles were bought at 6 articles for Rs. 5 and sold at 5 articles for Rs. 6. Gain percent is:", a: ["30%", "33.33%", "35%", "44%"], correct: 3 },
        { q: "By selling 45 lemons for Rs 40, a man loses 20%. How many should he sell for Rs 24 to gain 20% in the transaction?", a: ["16", "18", "20", "22"], correct: 1 },
        { q: "A and B start a business with investments of Rs. 5000 and Rs. 4500 respectively. After 4 months, A takes out half of his capital. After 6 months, B takes out one-third of his capital while C joins them with a capital of Rs. 7000. Find the ratio of their profits at the end of the year.", a: ["25:24:28", "25:24:21", "10:9:14", "None of these"], correct: 0 },
        { q: "A pipe can fill a tank in 15 hours. Due to a leak in the bottom, it is filled in 20 hours. If the tank is full, how much time will the leak take to empty it?", a: ["40 hrs", "50 hrs", "60 hrs", "None of these"], correct: 2 },
        { q: "Two pipes A and B can fill a tank in 15 minutes and 20 minutes respectively. Both the pipes are opened together but after 4 minutes, pipe A is turned off. What is the total time required to fill the tank?", a: ["10 min. 40 sec.", "11 min. 45 sec.", "12 min. 30 sec.", "14 min. 40 sec."], correct: 3 },
        { q: "A right triangle with sides 3 cm, 4 cm and 5 cm is rotated the side of 3 cm to form a cone. The volume of the cone so formed is:", a: ["12π cm³", "15π cm³", "16π cm³", "20π cm³"], correct: 2 },
        { q: "A hall is 15 m long and 12 m broad. If the sum of the areas of the floor and the ceiling is equal to the sum of the areas of four walls, the volume of the hall is:", a: ["720", "900", "1200", "1800"], correct: 2 },
        { q: "In a simultaneous throw of two coins, the probability of getting at least one head is:", a: ["1/2", "3/4", "2/3", "1/4"], correct: 1 },
        { q: "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both the cards being kings?", a: ["1/15", "25/57", "35/256", "1/221"], correct: 3 },
        { q: "How many 3-digit numbers can be formed from the digits 2, 3, 5, 6, 7 and 9, which are divisible by 5 and none of the digits is repeated?", a: ["5", "10", "15", "20"], correct: 3 },
        { q: "In how many different ways can the letters of the word 'DETAIL' be arranged in such a way that the vowels occupy only the odd positions?", a: ["32", "48", "36", "60"], correct: 2 },
        { q: "The HCF of two numbers is 11 and their LCM is 7700. If one of the numbers is 275, then the other is:", a: ["279", "283", "308", "318"], correct: 2 },
        { q: "10 years ago, A was half of B in age. If the ratio of their present ages is 3:4, what will be the total of their present ages?", a: ["20", "30", "35", "45"], correct: 2 },
        { q: "A can finish a work in 18 days and B can do the same work in 15 days. B worked for 10 days and left the job. In how many days, A alone can finish the remaining work?", a: ["5", "5.5", "6", "8"], correct: 2 },
        { q: "Find the surface area of a 10cm x 4cm x 3cm brick.", a: ["84", "124", "164", "180"], correct: 2 },
        { q: "A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9% p.a. in 5 years. What is the sum?", a: ["Rs. 4462.50", "Rs. 8032.50", "Rs. 8900", "Rs. 8925"], correct: 3 },
        { q: "The cost price of a radio is Rs. 600. The 5% of the cost price is charged towards transportation. After adding that, if the net profit to be made is 15%, what must be the selling price?", a: ["Rs. 664.50", "Rs. 684.50", "Rs. 704.50", "Rs. 724.50"], correct: 3 },
        { q: "At what rate of compound interest per annum will a sum of Rs. 1200 become Rs. 1348.32 in 2 years?", a: ["6%", "6.5%", "7%", "7.5%"], correct: 0 },
        { q: "The true discount on a bill due 9 months hence at 16% per annum is Rs. 189. The amount of the bill is:", a: ["Rs. 1386", "Rs. 1764", "Rs. 1575", "Rs. 2268"], correct: 1 },
        { q: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?", a: ["12 days", "15 days", "16 days", "18 days"], correct: 1 },
        { q: "Two trains starting at the same time from 2 stations 200 km apart and going in opposite direction cross each other at a distance of 110 km from one of the stations. What is the ratio of their speeds?", a: ["11:9", "7:3", "18:4", "None of these"], correct: 0 },
        { q: "The angle between the minute hand and the hour hand of a clock when the time is 8.30, is:", a: ["80 Degrees", "75 Degrees", "60 Degrees", "105 Degrees"], correct: 1 },
        { q: "Find the odd one out: 41, 43, 47, 53, 61, 71, 73, 81", a: ["61", "71", "73", "81"], correct: 3 },
        { q: "A trader mixes 26 kg of rice at Rs. 20 per kg with 30 kg of rice of other variety at Rs. 36 per kg and sells the mixture at Rs. 30 per kg. His profit percent is:", a: ["No profit, no loss", "5%", "8%", "10%"], correct: 1 },
        { q: "A wheel that has 6 cogs is meshed with a larger wheel of 14 cogs. When the smaller wheel has made 21 revolutions, then the number of revolutions made by the larger wheel is:", a: ["4", "9", "12", "49"], correct: 1 },
        { q: "Find the number of triangles in an octagon.", a: ["326", "120", "56", "336"], correct: 2 },
        { q: "The difference between a two-digit number and the number obtained by interchanging the digits is 36. What is the difference between the sum and the difference of the digits of the number if the ratio between the digits of the number is 1 : 2 ?", a: ["4", "8", "16", "None of these"], correct: 1 },
        { q: "Let N be the greatest number that will divide 1305, 4665 and 6905, leaving the same remainder in each case. Then sum of the digits in N is:", a: ["4", "5", "6", "8"], correct: 0 }
    ],
    verbal: [
        { q: "Choose the exact opposite word representation for 'ABUNDANT':", a: ["Scarce", "Ample", "Copious", "Heavy"], correct: 0 },
        { q: "Identify the part of the sentence containing an error: 'Neither of the two candidates were selected.'", a: ["Neither of", "the two candidates", "were selected", "No Error"], correct: 2 },
        { q: "Choose the most appropriate word to fill in the blank: 'The committee was in favor of the proposal, but the director decided to _____ their decision.'", a: ["Veto", "Sanction", "Endorse", "Ratify"], correct: 0 },
        { q: "Select the correct synonym for 'CANDID':", a: ["Deceptive", "Frank", "Secretive", "Vague"], correct: 1 },
        { q: "Rearrange the sequence to form a meaningful sentence: \n1. reading \n2. is \n3. mind \n4. good \n5. for", a: ["1 2 4 5 3", "1 2 5 4 3", "3 2 4 5 1", "4 2 1 5 3"], correct: 0 },
        { q: "Identify the correctly spelt word:", a: ["Accomodation", "Accommodation", "Acommodation", "Accomodasion"], correct: 1 },
        { q: "Find the antonym of 'DILIGENT':", a: ["Industrious", "Hardworking", "Lazy", "Tireless"], correct: 2 },
        { q: "What is the meaning of the idiom 'To bite the dust'?", a: ["To eat quickly", "To fail or be defeated", "To get angry", "To clean the floor"], correct: 1 },
        { q: "Choose the synonym for 'OBSTINATE':", a: ["Stubborn", "Flexible", "Docile", "Friendly"], correct: 0 },
        { q: "Find the correctly spelt word:", a: ["Ocurrence", "Occurrence", "Occurence", "Occurrance"], correct: 1 },
        { q: "Fill in the blank: She has a great affection _____ orphans.", a: ["for", "towards", "with", "to"], correct: 0 },
        { q: "Select the word that can be substituted for: 'A person who knows many languages.'", a: ["Linguist", "Polyglot", "Translator", "Phonetician"], correct: 1 },
        { q: "Find the antonym for 'ENORMOUS':", a: ["Soft", "Average", "Tiny", "Weak"], correct: 2 },
        { q: "Identify the meaning of the idiom: 'To spill the beans'", a: ["To drop food", "To reveal a secret", "To cook a meal", "To act clumsy"], correct: 1 },
        { q: "Choose the correct sentence:", a: ["He do not like coffee.", "He does not likes coffee.", "He do not likes coffee.", "He does not like coffee."], correct: 3 },
        { q: "Find the synonym of 'LUCID':", a: ["Confusing", "Clear", "Dark", "Heavy"], correct: 1 },
        { q: "Select the correct plural of 'Syllabus':", a: ["Syllabuses", "Syllabi", "Syllabise", "Syllabux"], correct: 1 },
        { q: "Fill in the blank: I have been working here _____ 2015.", a: ["from", "since", "for", "by"], correct: 1 },
        { q: "Substitute the phrase: 'A piece of land surrounded by water on all sides.'", a: ["Peninsula", "Island", "Continent", "Isthmus"], correct: 1 },
        { q: "Antonym of 'MITIGATE':", a: ["Alleviate", "Soothe", "Aggravate", "Calm"], correct: 2 },
        { q: "Find the correctly spelt word:", a: ["Embarrass", "Embarass", "Embaras", "Emmbarrass"], correct: 0 },
        { q: "Identify the error in: 'One of my friend is going to Japan.'", a: ["One of", "my friend", "is going", "to Japan"], correct: 1 },
        { q: "What does 'To add fuel to the fire' mean?", a: ["To make a problem worse", "To cook food quickly", "To help someone in need", "To start a bonfire"], correct: 0 },
        { q: "Synonym of 'PRECARIOUS':", a: ["Safe", "Dangerous", "Valuable", "Heavy"], correct: 1 },
        { q: "Fill in the blank: Neither John _____ his friends are coming.", a: ["or", "nor", "and", "but"], correct: 1 },
        { q: "Substitute the phrase: 'A study of birds.'", a: ["Ornithology", "Biology", "Zoology", "Entomology"], correct: 0 },
        { q: "Identify the correctly spelt word:", a: ["Fascinate", "Fassinate", "Facinate", "Faccinate"], correct: 0 },
        { q: "What is the synonym of 'CANDID'?", a: ["Secretive", "Frank", "Dishonest", "Quiet"], correct: 1 },
        { q: "What is the antonym of 'FLEXIBLE'?", a: ["Rigid", "Soft", "Bendy", "Pliable"], correct: 0 },
        { q: "Identify the error in: 'He is the most smartest boy in the class.'", a: ["He is", "the most", "smartest boy", "in the class"], correct: 1 },
        { q: "Fill in the blank: The train had left before I _____ the station.", a: ["reach", "reached", "had reached", "reaching"], correct: 1 },
        { q: "Substitute the phrase: 'A person who does not believe in God.'", a: ["Theist", "Atheist", "Agnostic", "Pacifist"], correct: 1 },
        { q: "Find the meaning of: 'Once in a blue moon'", a: ["Very frequently", "Very rarely", "At night", "During a full moon"], correct: 1 },
        { q: "Synonym of 'INEVITABLE':", a: ["Avoidable", "Uncertain", "Unavoidable", "Doubtful"], correct: 2 },
        { q: "Find the correctly spelt word:", a: ["Vacuum", "Vaccuum", "Vacum", "Vaccum"], correct: 0 },
        { q: "Choose the synonym for 'ELOQUENT':", a: ["Fluent", "Inarticulate", "Silent", "Confused"], correct: 0 },
        { q: "Choose the antonym for 'ARROGANT':", a: ["Haughty", "Proud", "Humble", "Conceited"], correct: 2 },
        { q: "Fill in the blank: The cat jumped _____ the table.", a: ["on", "upon", "above", "in"], correct: 1 },
        { q: "Identify the correctly spelt word:", a: ["Millenium", "Millennium", "Milennium", "Milenium"], correct: 1 },
        { q: "What is the meaning of the idiom 'A blessing in disguise'?", a: ["A hidden curse", "A good thing that seemed bad at first", "Something given by a priest", "A secret gift"], correct: 1 },
        { q: "Substitute the phrase: 'A collection of poems.'", a: ["Anthology", "Pathology", "Oncology", "Pedagogy"], correct: 0 },
        { q: "Choose the correct sentence:", a: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She do not like apples."], correct: 2 },
        { q: "Synonym for 'METICULOUS':", a: ["Careless", "Sloppy", "Thorough", "Fast"], correct: 2 },
        { q: "Antonym for 'TRANSPARENT':", a: ["Clear", "Opaque", "Translucent", "Glassy"], correct: 1 },
        { q: "Fill in the blank: He is _____ European by birth.", a: ["a", "an", "the", "none"], correct: 0 },
        { q: "Identify the error in: 'Each of the boys have their own book.'", a: ["Each of", "the boys", "have their", "own book"], correct: 2 },
        { q: "Meaning of idiom 'To read between the lines':", a: ["To read slowly", "To misunderstand", "To find hidden meaning", "To read aloud"], correct: 2 },
        { q: "Substitute the phrase: 'One who walks in sleep.'", a: ["Somnambulist", "Philanthropist", "Egoist", "Optimist"], correct: 0 },
        { q: "Correctly spelt word:", a: ["Pronunciation", "Pronounciation", "Pronunsiation", "Pronunciasion"], correct: 0 },
        { q: "Synonym for 'OMNIPRESENT':", a: ["Absent", "Ubiquitous", "Limited", "Scarce"], correct: 1 },
        { q: "Antonym for 'VAGUE':", a: ["Unclear", "Definite", "Blurry", "Obscure"], correct: 1 },
        { q: "Fill in the blank: I look forward to _____ you.", a: ["see", "saw", "seeing", "seen"], correct: 2 },
        { q: "Meaning of idiom 'Hit the nail on the head':", a: ["Do exactly the right thing", "Hit someone", "Make a mistake", "Build a house"], correct: 0 },
        { q: "Substitute the phrase: 'A government by the people.'", a: ["Autocracy", "Democracy", "Aristocracy", "Monarchy"], correct: 1 },
        { q: "Identify the error in: 'I prefer coffee than tea.'", a: ["I prefer", "coffee", "than", "tea"], correct: 2 },
        { q: "Correctly spelt word:", a: ["Aggressive", "Agressive", "Aggresive", "Agresive"], correct: 0 },
        { q: "Synonym for 'FRAGILE':", a: ["Tough", "Sturdy", "Delicate", "Strong"], correct: 2 },
        { q: "Antonym for 'BARREN':", a: ["Fertile", "Empty", "Dry", "Desert"], correct: 0 },
        { q: "Fill in the blank: He is afraid _____ dogs.", a: ["from", "by", "of", "with"], correct: 2 },
        { q: "Meaning of idiom 'Break the ice':", a: ["To start a conversation", "To break a glass", "To freeze water", "To stop talking"], correct: 0 },
        { q: "Substitute the phrase: 'A person who loves books.'", a: ["Bibliophile", "Misogynist", "Philatelist", "Numismatist"], correct: 0 },
        { q: "Correctly spelt word:", a: ["Colleague", "Coleague", "Collogue", "Collegue"], correct: 0 },
        { q: "Synonym for 'GARRULOUS':", a: ["Silent", "Talkative", "Angry", "Calm"], correct: 1 },
        { q: "Antonym for 'AMATEUR':", a: ["Beginner", "Professional", "Novice", "Trainee"], correct: 1 },
        { q: "Fill in the blank: She deals _____ computer hardware.", a: ["in", "with", "at", "on"], correct: 0 },
        { q: "Meaning of idiom 'Let the cat out of the bag':", a: ["To save a cat", "To reveal a secret", "To buy a pet", "To hide something"], correct: 1 },
        { q: "Substitute the phrase: 'A life history written by oneself.'", a: ["Biography", "Autobiography", "History", "Novel"], correct: 1 },
        { q: "Correctly spelt word:", a: ["Maintenance", "Maintainance", "Maintanence", "Maintenence"], correct: 0 },
        { q: "Synonym for 'EPHEMERAL':", a: ["Permanent", "Long-lasting", "Short-lived", "Eternal"], correct: 2 },
        { q: "Antonym for 'OPTIMIST':", a: ["Pessimist", "Realist", "Idealist", "Activist"], correct: 0 },
        { q: "Fill in the blank: The manager accused him _____ theft.", a: ["for", "with", "of", "about"], correct: 2 },
        { q: "Meaning of idiom 'Under the weather':", a: ["Raining", "Feeling ill", "In the sun", "Outdoors"], correct: 1 },
        { q: "Substitute the phrase: 'One who eats everything.'", a: ["Herbivorous", "Carnivorous", "Omnivorous", "Insectivorous"], correct: 2 },
        { q: "Correctly spelt word:", a: ["Guarantee", "Garantee", "Guarentee", "Garuntee"], correct: 0 },
        { q: "Synonym for 'AMIABLE':", a: ["Hostile", "Friendly", "Rude", "Arrogant"], correct: 1 },
        { q: "Antonym for 'CONCEAL':", a: ["Hide", "Reveal", "Cover", "Bury"], correct: 1 },
        { q: "Fill in the blank: He is good _____ mathematics.", a: ["in", "at", "with", "for"], correct: 1 },
        { q: "Meaning of idiom 'A piece of cake':", a: ["A sweet dessert", "Something very easy", "A difficult task", "A small portion"], correct: 1 },
        { q: "Substitute the phrase: 'Murder of a king.'", a: ["Homicide", "Fratricide", "Regicide", "Suicide"], correct: 2 },
        { q: "Correctly spelt word:", a: ["Privilege", "Priviledge", "Privelige", "Privelidge"], correct: 0 },
        { q: "Synonym for 'TENACIOUS':", a: ["Yielding", "Weak", "Persistent", "Uncertain"], correct: 2 },
        { q: "Antonym for 'DETERIORATE':", a: ["Worsen", "Improve", "Decay", "Decline"], correct: 1 },
        { q: "Fill in the blank: You must abide _____ the rules.", a: ["with", "by", "to", "in"], correct: 1 },
        { q: "Meaning of idiom 'Burn the midnight oil':", a: ["To waste oil", "To work late into the night", "To start a fire", "To sleep early"], correct: 1 },
        { q: "Substitute the phrase: 'A place where coins are made.'", a: ["Mint", "Bank", "Treasury", "Factory"], correct: 0 },
        { q: "Correctly spelt word:", a: ["Rhythm", "Rythm", "Rhythme", "Ryhthm"], correct: 0 },
        { q: "Synonym for 'VINDICATE':", a: ["Blame", "Condemn", "Justify", "Accuse"], correct: 2 },
        { q: "Antonym for 'LAVISH':", a: ["Extravagant", "Frugal", "Generous", "Wasteful"], correct: 1 },
        { q: "Fill in the blank: He is addicted _____ smoking.", a: ["with", "to", "for", "in"], correct: 1 },
        { q: "Meaning of idiom 'Cost an arm and a leg':", a: ["Be very cheap", "Require surgery", "Be very expensive", "Be painless"], correct: 2 },
        { q: "Substitute the phrase: 'One who does not make mistakes.'", a: ["Infallible", "Gullible", "Invincible", "Indelible"], correct: 0 },
        { q: "Correctly spelt word:", a: ["Committee", "Comittee", "Commitee", "Comitee"], correct: 0 },
        { q: "Synonym for 'ZEALOUS':", a: ["Apathetic", "Enthusiastic", "Lazy", "Indifferent"], correct: 1 },
        { q: "Antonym for 'ZENITH':", a: ["Peak", "Pinnacle", "Nadir", "Summit"], correct: 2 },
        { q: "Fill in the blank: I congratulate you _____ your success.", a: ["for", "on", "at", "with"], correct: 1 },
        { q: "Meaning of idiom 'To cost a pretty penny':", a: ["To be inexpensive", "To be extremely expensive", "To find a coin", "To look nice"], correct: 1 },
        { q: "Substitute the phrase: 'Fear of closed spaces.'", a: ["Agoraphobia", "Claustrophobia", "Acrophobia", "Hydrophobia"], correct: 1 },
        { q: "Correctly spelt word:", a: ["Harass", "Harrass", "Harras", "Harase"], correct: 0 },
        { q: "Synonym for 'ABATE':", a: ["Increase", "Intensify", "Subside", "Enhance"], correct: 2 },
        { q: "Antonym for 'REDUNDANT':", a: ["Superfluous", "Excessive", "Necessary", "Extra"], correct: 2 },
        { q: "Fill in the blank: They have been living here _____ ten years.", a: ["since", "from", "for", "in"], correct: 2 },
        { q: "Meaning of idiom 'Jump on the bandwagon':", a: ["Join a popular trend", "Jump over a wagon", "Play music", "Travel together"], correct: 0 },
        { q: "Substitute the phrase: 'A remedy for all diseases.'", a: ["Antibiotic", "Panacea", "Medicine", "Cure"], correct: 1 },
        { q: "Correctly spelt word:", a: ["Entrepreneur", "Entreprenuer", "Enterpreneur", "Enterprenuer"], correct: 0 },
        { q: "Synonym for 'CACOPHONY':", a: ["Harmony", "Melody", "Silence", "Discord"], correct: 3 },
        { q: "Antonym for 'OBTUSE':", a: ["Dull", "Stupid", "Acute", "Blunt"], correct: 2 },
        { q: "Fill in the blank: We should not interfere _____ their matters.", a: ["in", "with", "at", "on"], correct: 0 },
        { q: "Meaning of idiom 'Barking up the wrong tree':", a: ["Looking in the wrong place", "Climbing a tree", "A dog barking", "Making a loud noise"], correct: 0 },
        { q: "Substitute the phrase: 'One who compiles a dictionary.'", a: ["Calligrapher", "Cartographer", "Lexicographer", "Choreographer"], correct: 2 },
        { q: "Correctly spelt word:", a: ["Sergeant", "Sargeant", "Sergent", "Sargent"], correct: 0 }
    ],
    reasoning: [
        { q: "If CLOCK is coded as CNSIS, how is WATCH evaluated down the matrix channel?", a: ["XBUDI", "YCXDJ", "WAVCI", "YCEGL"], correct: 1 },
        { q: "In a certain code language, 'COMPUTER' is written as 'RFUVQNPC'. How will 'MEDICINE' be written in that code language?", a: ["MFEDJJOE", "EOJDEJFM", "MFEJDJOE", "EOJDJEFM"], correct: 3 },
        { q: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to that man?", a: ["Sister", "Grandmother", "Mother", "Aunt"], correct: 2 },
        { q: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?", a: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"], correct: 1 },
        { q: "Statements: Some actors are singers. All the singers are dancers. \nConclusion: 1. Some actors are dancers. 2. No singer is actor.", a: ["Only (1) follows", "Only (2) follows", "Either (1) or (2) follows", "Neither (1) nor (2) follows"], correct: 0 },
        { q: "Six friends A, B, C, D, E, and F are sitting in a row facing East. C is between A and E. B is just to the right of E but left of D. F is not at the right end. Who is at the right end?", a: ["D", "B", "E", "C"], correct: 0 },
        { q: "Choose the odd one out:", a: ["Apple", "Orange", "Tomato", "Carrot"], correct: 3 },
        { q: "If South-East becomes North, North-East becomes West and so on. What will West become?", a: ["North-East", "North-West", "South-East", "South-West"], correct: 2 },
        { q: "If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?", a: ["Brother", "Sister", "Nephew", "Cannot be determined"], correct: 3 },
        { q: "Find the missing number in the sequence: 3, 6, 12, 24, __", a: ["36", "48", "30", "42"], correct: 1 },
        { q: "A man walks 5 km toward south and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?", a: ["West", "South", "North-East", "South-West"], correct: 3 },
        { q: "In a certain code language, '123' means 'hot filtered coffee', '356' means 'very hot day' and '589' means 'day and night'. Which digit stands for 'very'?", a: ["5", "6", "8", "9"], correct: 1 },
        { q: "Choose the odd one out:", a: ["Iron", "Mercury", "Copper", "Zinc"], correct: 1 },
        { q: "SCD, TEF, UGH, ____, WKL", a: ["CMN", "UJI", "VIJ", "IJT"], correct: 2 },
        { q: "FAG, GAF, HAI, IAH, ____", a: ["JAK", "HAL", "HAK", "JAI"], correct: 0 },
        { q: "Statements: All men are dogs. All dogs are cats. \nConclusions: 1. All men are cats. 2. All cats are men.", a: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correct: 0 },
        { q: "Choose the odd pair:", a: ["Bottle - Wine", "Cup - Tea", "Pitcher - Water", "Ball - Bat"], correct: 3 },
        { q: "If 'ROSE' is coded as 6821, 'CHAIR' is coded as 73456 and 'PREACH' is coded as 961473, what will be the code for 'SEARCH'?", a: ["246173", "214673", "214763", "216473"], correct: 1 },
        { q: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?", a: ["His own", "His son's", "His father's", "His nephew's"], correct: 1 },
        { q: "Find the next number in the series: 8, 24, 12, 36, 18, 54, __", a: ["27", "108", "68", "72"], correct: 0 },
        { q: "A boy rides his bicycle Northwards, then turns left and rides 1 km and again turns left and rides 2 km. He found himself 1 km west of his starting point. How far did he ride northwards initially?", a: ["1 km", "2 km", "3 km", "5 km"], correct: 1 },
        { q: "If in a certain language, MADRAS is coded as NBESBT, how is BOMBAY coded in that code?", a: ["CPNCBX", "CPNCBZ", "CPOCBZ", "CQOCBZ"], correct: 1 },
        { q: "Choose the word which is different from the rest:", a: ["Chicken", "Snake", "Swan", "Crocodile"], correct: 0 }, 
        { q: "Choose the word which is different from the rest:", a: ["Carrot", "Potato", "Tomato", "Ginger"], correct: 2 }, 
        { q: "Statements: Some keys are locks. Some locks are numbers. All numbers are letters. \nConclusions: 1. Some locks are letters. 2. Some letters are keys.", a: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Both 1 and 2 follow"], correct: 0 },
        { q: "Look at this series: 36, 34, 30, 28, 24, ... What number should come next?", a: ["20", "22", "23", "26"], correct: 1 },
        { q: "Which word does NOT belong with the others?", a: ["Parsley", "Basil", "Dill", "Mayonnaise"], correct: 3 },
        { q: "Odometer is to mileage as compass is to:", a: ["Speed", "Hiking", "Needle", "Direction"], correct: 3 },
        { q: "Marathon is to race as hibernation is to:", a: ["Winter", "Bear", "Dream", "Sleep"], correct: 3 },
        { q: "If 'A' is substituted by 1, 'B' by 2 and so on up to 'Z' which is substituted by 26, what will be the sum of the numbers substituted for the word 'DECODE'?", a: ["42", "46", "38", "52"], correct: 0 },
        { q: "Which letter comes next in the series: B, D, G, K, __", a: ["N", "P", "O", "Q"], correct: 1 },
        { q: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?", a: ["Grandfather", "Grandmother", "Daughter", "Granddaughter"], correct: 3 },
        { q: "In a row of boys, If A who is 10th from the left and B who is 9th from the right interchange their positions, A becomes 15th from the left. How many boys are there in the row?", a: ["23", "27", "28", "31"], correct: 0 },
        { q: "Find the odd one out:", a: ["16", "25", "36", "72"], correct: 3 },
        { q: "If white is called blue, blue is called red, red is called yellow, yellow is called green, green is called black, what would be the color of human blood?", a: ["Red", "Blue", "Yellow", "Green"], correct: 2 },
        { q: "Find the next number in the series: 1, 4, 9, 16, 25, __", a: ["30", "36", "49", "64"], correct: 1 },
        { q: "Find the next letter in the series: A, C, F, J, __", a: ["M", "N", "O", "P"], correct: 2 },
        { q: "If 'DELHI' is coded as 'EDMIF', how is 'BOMBAY' coded?", a: ["CPNCBZ", "CPNCBX", "CPNCBY", "DPNCBZ"], correct: 0 },
        { q: "Pointing to a photograph, a person tells his friend, 'She is the granddaughter of the elder brother of my father.' How is the girl in the photograph related to the man?", a: ["Niece", "Sister", "Aunt", "Sister-in-law"], correct: 0 },
        { q: "A man starts from his house and walks 10 km towards South. Then he turns right and walks 6 km, again he turns right and walks 10 km. Finally, he turns right and walks 5 km. How far is he from his house?", a: ["1 km", "2 km", "5 km", "10 km"], correct: 0 },
        { q: "Statements: All cars are cats. All fans are cats. \nConclusions: 1. All cars are fans. 2. Some fans are cars.", a: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correct: 3 },
        { q: "Choose the odd one out:", a: ["Guitar", "Violin", "Flute", "Sitar"], correct: 2 },
        { q: "Cup is to coffee as bowl is to:", a: ["Dish", "Soup", "Spoon", "Food"], correct: 1 },
        { q: "If 1=3, 2=5, 3=7, 4=9, then 5=?", a: ["11", "13", "10", "15"], correct: 0 },
        { q: "Choose the odd one out:", a: ["Square", "Rectangle", "Triangle", "Cube"], correct: 3 },
        { q: "If 'P' denotes 'multiplied by', 'T' denotes 'subtracted from', 'M' denotes 'added to' and 'B' denotes 'divided by', then 28 B 7 P 8 T 6 M 4 = ?", a: ["30", "32", "34", "36"], correct: 0 },
        { q: "A woman introduces a man as the son of the brother of her mother. How is the man related to the woman?", a: ["Nephew", "Son", "Cousin", "Uncle"], correct: 2 },
        { q: "Look at this series: 80, 10, 70, 15, 60, ... What number should come next?", a: ["20", "25", "30", "50"], correct: 0 },
        { q: "SCD, TEF, UGH, ____, WKL", a: ["VIJ", "VJI", "IJV", "IVJ"], correct: 0 },
        { q: "If NOIDA is written as OPJEB, then what will be the code for DELHI?", a: ["EFMIJ", "EFMIK", "EFMJJ", "EFMIJ"], correct: 0 },
        { q: "Which word does not belong with the others?", a: ["Leopard", "Cougar", "Elephant", "Lion"], correct: 2 },
        { q: "Paw is to Cat as Hoof is to:", a: ["Lamb", "Horse", "Elephant", "Tiger"], correct: 1 },
        { q: "Find the odd one out:", a: ["Lake", "River", "Pond", "Pool"], correct: 1 },
        { q: "A boy goes 3 m South, then turns East and goes 4 m. How far is he from his original position?", a: ["5 m", "7 m", "1 m", "6 m"], correct: 0 },
        { q: "Statements: Some buses are doors. All doors are windows. \nConclusions: 1. Some buses are windows. 2. All windows are buses.", a: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correct: 0 },
        { q: "A is the father of B. C is the daughter of B. D is the brother of B. E is the son of A. What is the relationship between C and E?", a: ["Brother and sister", "Cousins", "Niece and uncle", "Uncle and aunt"], correct: 2 },
        { q: "Look at this series: 1.5, 2.3, 3.1, 3.9, ... What number should come next?", a: ["4.2", "4.4", "4.7", "5.1"], correct: 2 },
        { q: "In a certain code, TRIPPLE is written as SQHOOKD. How is DISPOSE written in that code?", a: ["CHRONRD", "DSOESPI", "CHRONRE", "CHROPRD"], correct: 0 },
        { q: "If 'water' is called 'food', 'food' is called 'tree', 'tree' is called 'sky', 'sky' is called 'wall', on which of the following grows a fruit?", a: ["Water", "Food", "Sky", "Tree"], correct: 2 },
        { q: "Play is to actor as concert is to:", a: ["Symphony", "Musician", "Piano", "Percussion"], correct: 1 },
        { q: "Which word does not belong with the others?", a: ["Tulip", "Rose", "Bud", "Daisy"], correct: 2 },
        { q: "Elated is to despondent as enlightened is to:", a: ["Aware", "Ignorant", "Miserable", "Tolerant"], correct: 1 },
        { q: "Find the next number in the series: 3, 10, 29, 66, 127, __", a: ["164", "187", "216", "218"], correct: 3 },
        { q: "Choose the odd one out:", a: ["144", "169", "225", "288"], correct: 3 },
        { q: "One morning Udai and Vishal were talking to each other face to face at a crossing. If Vishal's shadow was exactly to the left of Udai, which direction was Udai facing?", a: ["East", "West", "North", "South"], correct: 2 },
        { q: "Statements: All pens are pencils. No pencil is a monkey. \nConclusions: 1. No pen is a monkey. 2. Some pens are monkeys.", a: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Neither follows"], correct: 0 },
        { q: "A man is facing west. He turns 45 degrees in the clockwise direction and then another 180 degrees in the same direction and then 270 degrees in the anticlockwise direction. Which direction is he facing now?", a: ["South", "North-West", "West", "South-West"], correct: 3 },
        { q: "If Z=52 and ACT=48, then BAT will be equal to:", a: ["39", "41", "44", "46"], correct: 3 },
        { q: "Choose the odd word:", a: ["Circle", "Ellipse", "Sphere", "Cube"], correct: 3 },
        { q: "QPO, NML, KJI, _____, EDC", a: ["HGF", "CAB", "JKL", "GHI"], correct: 0 },
        { q: "In a class of 45 students, Amir's rank from top is 16th. Ashok is 6 ranks below Amir. What is Ashok's rank from the bottom?", a: ["23rd", "32nd", "24th", "30th"], correct: 2 },
        { q: "Choose the odd pair:", a: ["Cow : Calf", "Dog : Puppy", "Lion : Cub", "Horse : Mare"], correct: 3 },
        { q: "Find the next number: 2, 5, 11, 23, __", a: ["44", "45", "46", "47"], correct: 3 },
        { q: "If CAT is 12, then DOG is:", a: ["13", "14", "15", "16"], correct: 1 },
        { q: "A walks 10 metres in front and 10 metres to the right. Then every time turning to his left, he walks 5, 15 and 15 metres respectively. How far is he now from his starting point?", a: ["5 metres", "10 metres", "15 metres", "20 metres"], correct: 0 },
        { q: "In a row of boys, A is 15th from the left and B is 4th from the right. There are 3 boys between A and B. C is just left of A. What is C's position from the right?", a: ["9th", "10th", "12th", "13th"], correct: 0 },
        { q: "Statements: All buildings are chalks. No chalk is toffee. \nConclusions: 1. No building is toffee. 2. All chalks are buildings.", a: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correct: 0 },
        { q: "Which word does not belong?", a: ["Book", "Index", "Glossary", "Chapter"], correct: 0 },
        { q: "CMM, EOO, GQQ, _____, KUU", a: ["GRR", "GSS", "ISS", "ITT"], correct: 2 },
        { q: "If 'GATHER' is coded as 'UBHREH', how is 'DESIGN' coded?", a: ["TFJFOH", "EFTJHO", "TFEOJI", "TFJEOH"], correct: 0 },
        { q: "Choose the odd one out:", a: ["January", "May", "July", "November"], correct: 3 },
        { q: "Window is to pane as book is to:", a: ["Novel", "Glass", "Cover", "Page"], correct: 3 },
        { q: "Find the next number: 1, 8, 27, 64, 125, __", a: ["150", "216", "256", "343"], correct: 1 },
        { q: "If in a code language, COULD is written as BNTKC and MARGIN is written as LZQFHM, how will MOULDING be written in that code?", a: ["CHMFINTK", "LNKTCHMF", "LNTKCHMF", "NITKHCMF"], correct: 2 },
        { q: "Raju's father's sister's father is?", a: ["Raju's grandfather", "Raju's uncle", "Raju's father", "None of these"], correct: 0 },
        { q: "I am facing South. I turn right and walk 20 m. Then I turn right again and walk 10 m. Then I turn left and walk 10 m and then turning right walk 20 m. Then I turn right again and walk 60 m. In which direction am I from the starting point?", a: ["North", "North-West", "East", "North-East"], correct: 3 },
        { q: "Statements: All bags are cakes. All lamps are cakes. \nConclusions: 1. Some lamps are bags. 2. No lamp is bag.", a: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Both follows"], correct: 2 },
        { q: "Choose the odd one out:", a: ["Iron", "Copper", "Zinc", "Brass"], correct: 3 },
        { q: "ZA5, Y4B, XC6, W3D, _____", a: ["E7V", "V2E", "VE5", "VE7"], correct: 3 },
        { q: "A family consists of six members A, B, C, D, E and F. B is the son of C but C is not the mother of B. A and C are married couple. E is the brother of C. D is the daughter of A. F is the brother of A. Who is the brother-in-law of C?", a: ["A", "B", "E", "F"], correct: 3 },
        { q: "If RED is coded as 6720, then how would GREEN be coded?", a: ["1677209", "1677199", "16717209", "9207716"], correct: 0 },
        { q: "Choose the odd word:", a: ["Rigveda", "Yajurveda", "Atharvaveda", "Ayurveda"], correct: 3 },
        { q: "Look at this series: 2, 4, 6, 8, 10, ... What number should come next?", a: ["11", "12", "13", "14"], correct: 1 },
        { q: "If A+B means A is the mother of B; A-B means A is the brother of B; A%B means A is the father of B and A x B means A is the sister of B, which of the following shows that P is the maternal uncle of Q?", a: ["Q - N + M x P", "P + S x N - Q", "P - M + N x Q", "Q - S % P"], correct: 2 },
        { q: "Rohan walks a distance of 3 km towards North, then turns to his left and walks for 2 km. He again turns left and walks for 3 km. At this point he turns to his left and walks for 3 km. How many kilometres is he from the starting point?", a: ["1 km", "2 km", "3 km", "5 km"], correct: 0 },
        { q: "Statements: Some dogs are bats. Some bats are cats. \nConclusions: 1. Some dogs are cats. 2. Some cats are dogs.", a: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Neither follows"], correct: 3 },
        { q: "Choose the odd pair:", a: ["Painter : Gallery", "Actor : Stage", "Mason : Wall", "Farmer : Field"], correct: 2 },
        { q: "Find the next number: 10, 18, 28, 40, 54, 70, __", a: ["85", "86", "87", "88"], correct: 3 },
        { q: "If NO is 210 and OFF is 533, what is ON?", a: ["210", "120", "150", "110"], correct: 1 },
        { q: "A clock is so placed that at 12 noon its minute hand points towards North-East. In which direction does its hour hand point at 1.30 pm?", a: ["North", "South", "East", "West"], correct: 2 },
        { q: "In a certain code, MONKEY is written as XDJMNL. How is TIGER written in that code?", a: ["QDFHS", "SDFHS", "SHFDQ", "UJHFS"], correct: 0 },
        { q: "P is the brother of Q and R. S is R's mother. T is P's father. Which of the following statements cannot be definitely true?", a: ["T is Q's father", "S is P's mother", "P is S's son", "Q is T's son"], correct: 3 },
        { q: "Choose the odd one out:", a: ["Eye", "Ear", "Nose", "Brain"], correct: 3 },
        { q: "Find the next number: 5, 25, 61, 113, 181, __", a: ["265", "260", "275", "255"], correct: 0 },
        { q: "If FRIEND is coded as HUMJTK, how is CANDLE written in that code?", a: ["EDRIRL", "DCQHQK", "ESJFME", "FYOBOC"], correct: 0 },
        { q: "Statements: All doors are buses. All buses are leafs. No leaf is a color. \nConclusions: 1. No color is a door. 2. Some buses are doors.", a: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"], correct: 2 },
        { q: "A man runs 20m towards East and turns to right, runs 10m and turns to right, runs 9m and again turns to left, runs 5m and then turns to left, runs 12m and finally turns to left and runs 6m. Now to which direction is he facing?", a: ["East", "West", "North", "South"], correct: 2 },
        { q: "Choose the odd one out:", a: ["27", "35", "18", "9"], correct: 1 },
        { q: "Thermometer is to temperature as barometer is to:", a: ["Stress", "Pressure", "Weight", "Volume"], correct: 1 },
        { q: "Find the missing number: 2, 3, 5, 7, 11, __, 17", a: ["12", "13", "14", "15"], correct: 1 }
    ]
};

let activeExamQuestions = [];
let currentQuestionIdx = 0;
let userSelectedAnswers = {};
let countdownTimerInterval;
let examSecondsRemaining = 0;

function shuffleAndSelect(array, numItems) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numItems);
}

function startExam(category) {
    const QUESTIONS_PER_SET = 25; 
    const availableQuestions = questionBank[category].length;
    activeExamQuestions = shuffleAndSelect(questionBank[category], Math.min(QUESTIONS_PER_SET, availableQuestions));
    currentQuestionIdx = 0;
    userSelectedAnswers = {};
    examSecondsRemaining = 1800;
    
    document.getElementById('exam-title-text').innerText = `${category.toUpperCase()} Assessment`;
    updateCountdownUI();
    switchSection('exam-console');
    renderActiveQuestion();
    
    clearInterval(countdownTimerInterval);
    countdownTimerInterval = setInterval(() => {
        examSecondsRemaining--;
        updateCountdownUI();
        if(examSecondsRemaining <= 0) {
            clearInterval(countdownTimerInterval);
            finishExam();
        }
    }, 1000);
}

function updateCountdownUI() {
    const minutes = Math.floor(examSecondsRemaining / 60);
    const seconds = examSecondsRemaining % 60;
    document.getElementById('time-countdown').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function renderActiveQuestion() {
    const container = document.getElementById('question-container-box');
    const questionObj = activeExamQuestions[currentQuestionIdx];
    let choicesHtml = '';
    questionObj.a.forEach((choice, index) => {
        const isChecked = userSelectedAnswers[currentQuestionIdx] === index ? 'checked' : '';
        choicesHtml += `
            <label class="choice-option-row" style="display: block; margin-bottom: 12px; cursor: pointer;">
                <input type="radio" name="exam-option" value="${index}" ${isChecked} onchange="saveAnswer(${index})" style="width: auto; margin-right: 10px; margin-bottom:0;">
                <span>${choice}</span>
            </label>
        `;
    });

    container.innerHTML = `
        <h3 style="margin-bottom: 15px; color: var(--accent);">Question ${currentQuestionIdx + 1} of ${activeExamQuestions.length}</h3>
        <p style="font-size: 1.1rem; margin-bottom: 25px; line-height: 1.5;">${questionObj.q}</p>
        <div class="options-block-group">${choicesHtml}</div>
    `;

    document.getElementById('prev-q-btn').disabled = currentQuestionIdx === 0;
    document.getElementById('next-q-btn').style.display = currentQuestionIdx === activeExamQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-exam-btn').style.display = currentQuestionIdx === activeExamQuestions.length - 1 ? 'inline-block' : 'none';
}

function saveAnswer(index) { userSelectedAnswers[currentQuestionIdx] = index; }
function navigateQuestion(step) { currentQuestionIdx += step; renderActiveQuestion(); }

function finishExam() {
    clearInterval(countdownTimerInterval);
    let correctTally = 0;
    activeExamQuestions.forEach((q, i) => { if(userSelectedAnswers[i] === q.correct) correctTally++; });

    const percentResult = Math.round((correctTally / activeExamQuestions.length) * 100);
    document.getElementById('score-percentage-text').innerText = `${percentResult}%`;
    document.getElementById('score-fraction-text').innerText = `You answered ${correctTally} out of ${activeExamQuestions.length} questions correctly.`;
    
    const badge = document.getElementById('exam-pass-badge');
    if(percentResult >= 60) {
        badge.innerText = "PASS (Cleared TCS NQT Baseline Benchmark)";
        badge.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
        badge.style.color = "#2ecc71";
        addProfileAchievement("TCS NQT Cleared", "✅");
    } else {
        badge.innerText = "RE-ATTEMPT REQUIRED (Target Score: 60%+)";
        badge.style.backgroundColor = "rgba(255, 71, 87, 0.2)";
        badge.style.color = "#ff6b6b";
    }

    if(percentResult >= 90) addProfileAchievement("Top Percentile", "🏆");

    let scoreHistory = JSON.parse(localStorage.getItem('tcs_nqt_scores') || '[]');
    scoreHistory.push(percentResult);
    localStorage.setItem('tcs_nqt_scores', JSON.stringify(scoreHistory));

    analyzeProgress(scoreHistory);
    switchSection('exam-result');
}

// --- 8. ML GRAPH RENDERING ENGINE (RESTORED PROGRESS TREND) ---
function renderProgressChart(scores, predictedScore) {
    const ctx = document.getElementById('progressTrendChart').getContext('2d');
    if (progressChartInstance) progressChartInstance.destroy();

    let labels = scores.map((_, index) => `Attempt ${index + 1}`);
    let dataPoints = [...scores];

    if (predictedScore !== null) {
        labels.push("AI Prediction");
        dataPoints.push(predictedScore);
    }

    progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Performance Trend',
                data: dataPoints,
                borderColor: '#7b2ff7',
                backgroundColor: 'rgba(123, 47, 247, 0.1)',
                borderWidth: 3,
                tension: 0.3,
                pointBackgroundColor: dataPoints.map((_, i) => i === dataPoints.length - 1 && predictedScore !== null ? '#00d2ff' : '#7b2ff7'),
                pointBorderColor: '#fff',
                pointRadius: 6,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aec0' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

async function analyzeProgress(scores) {
    const insightText = document.getElementById('ml-insight-text');
    const trendTag = document.getElementById('ml-trend-tag');
    const profileLevelText = document.getElementById('profile-level-text');

    if (scores.length < 2) {
        insightText.innerText = "The ML model requires at least 2 test attempts to establish a learning curve trajectory. Keep practicing!";
        trendTag.innerText = "Data Gathering Phase";
        trendTag.style.backgroundColor = "var(--secondary-accent)";
        if(profileLevelText) profileLevelText.innerText = "Data Gathering Phase";
        renderProgressChart(scores, null); 
        return;
    }

    insightText.innerHTML = 'Analyzing performance trajectory... <div class="loader-small" style="display:inline-block; margin-left:10px;"></div>';
    trendTag.innerText = "AI Processing";
    trendTag.style.backgroundColor = "var(--secondary-accent)";

    try {
        const response = await fetch('http://127.0.0.1:5000/track_progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores: scores })
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        insightText.innerText = data.insight;
        trendTag.innerText = data.trend_tag;
        if(profileLevelText) profileLevelText.innerText = data.trend_tag;
        
        if (data.trend_tag.includes("Rapid") || data.trend_tag.includes("Exponential")) {
            trendTag.style.backgroundColor = "#2ecc71"; 
        } else if (data.trend_tag.includes("Steady")) {
            trendTag.style.backgroundColor = "#f39c12"; 
        } else {
            trendTag.style.backgroundColor = "#ff6b6b"; 
        }

        renderProgressChart(scores, data.predicted_score); 

    } catch (error) {
        console.error(error);
        insightText.innerText = "Error connecting to AI backend for progress tracking. Ensure 'app.py' is running.";
        trendTag.innerText = "Connection Failed";
        trendTag.style.backgroundColor = "#ff6b6b";
        renderProgressChart(scores, null); 
    }
}

// --- 9. ADVANCED CODING EXAM ENGINE WITH NLP ---
const codingQuestionBank = [
// --- 10 EASY QUESTIONS ---
    { title: "Sum of Array", diff: "Easy", desc: "Write a function solve(arr) that returns the sum of all elements in the array.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,2,3], expected: 6}, {input: [10,-5,5], expected: 10}] },
    { title: "Find Max Element", diff: "Easy", desc: "Write a function solve(arr) to find the largest number in an array.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,8,3], expected: 8}, {input: [-5,-2,-9], expected: -2}] },
    { title: "Reverse String", diff: "Easy", desc: "Write a function solve(str) that reverses a given string.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "tcs", expected: "sct"}, {input: "hello", expected: "olleh"}] },
    { title: "Check Palindrome", diff: "Easy", desc: "Write a function solve(str) that returns true if the string is a palindrome, else false.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "racecar", expected: true}, {input: "tcs", expected: false}] },
    { title: "Count Vowels", diff: "Easy", desc: "Write a function solve(str) that returns the number of vowels in a string.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "apple", expected: 2}, {input: "sky", expected: 0}] },
    { title: "Factorial", diff: "Easy", desc: "Write a function solve(n) that returns the factorial of n.", defaultCode: "function solve(n) {\n    \n}", testCases: [{input: 5, expected: 120}, {input: 0, expected: 1}] },
    { title: "Nth Fibonacci", diff: "Easy", desc: "Write a function solve(n) returning the nth Fibonacci number (0-indexed, where fib(0)=0).", defaultCode: "function solve(n) {\n    \n}", testCases: [{input: 6, expected: 8}, {input: 1, expected: 1}] },
    { title: "Count Even Numbers", diff: "Easy", desc: "Write a function solve(arr) that counts how many even numbers are in the array.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,2,3,4], expected: 2}, {input: [7,9], expected: 0}] },
    { title: "Check Prime", diff: "Easy", desc: "Write a function solve(n) that returns true if n is prime, false otherwise.", defaultCode: "function solve(n) {\n    \n}", testCases: [{input: 7, expected: true}, {input: 10, expected: false}] },
    { title: "Find Minimum Element", diff: "Easy", desc: "Write a function solve(arr) to find the smallest number in an array.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [5,2,9], expected: 2}, {input: [0,-5,3], expected: -5}] },

    // --- 10 MEDIUM QUESTIONS ---
    { title: "Sum of Primes", diff: "Medium", desc: "Write a function solve(arr) that returns the sum of all prime numbers in an array.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,2,3,4,5], expected: 10}, {input: [4,6,8], expected: 0}] },
    { title: "Anagram Check", diff: "Medium", desc: "Write a function solve(str1, str2) that returns true if two strings are anagrams. Input format: [str1, str2]", defaultCode: "function solve(args) {\n    let str1 = args[0]; let str2 = args[1];\n    \n}", testCases: [{input: ["listen", "silent"], expected: true}, {input: ["hello", "world"], expected: false}] },
    { title: "Find Missing Number", diff: "Medium", desc: "Given an array containing n distinct numbers in the range [0, n], return the only number missing.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [3,0,1], expected: 2}, {input: [0,1], expected: 2}] },
    { title: "Remove Duplicates", diff: "Medium", desc: "Write a function solve(arr) that returns an array with duplicates removed, keeping original order.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,2,2,3], expected: [1,2,3]}, {input: [5,5,5], expected: [5]}] },
    { title: "Second Largest Element", diff: "Medium", desc: "Write a function solve(arr) returning the second largest distinct element.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [10,5,8,20], expected: 10}, {input: [2,2,1], expected: 1}] },
    { title: "String Compression", diff: "Medium", desc: "Compress 'aabcccccaaa' to 'a2b1c5a3'. If compressed is not smaller, return original.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "aabcccccaaa", expected: "a2b1c5a3"}, {input: "abc", expected: "abc"}] },
    { title: "Binary Search", diff: "Medium", desc: "Given sorted array and a target, return index. Input: {arr: [], target: x}. Return -1 if not found.", defaultCode: "function solve(inputObj) {\n    let arr = inputObj.arr; let target = inputObj.target;\n    \n}", testCases: [{input: {arr: [1,2,3,4], target: 3}, expected: 2}, {input: {arr: [1,2], target: 5}, expected: -1}] },
    { title: "Valid Parentheses", diff: "Medium", desc: "Given a string of '(', ')', '{', '}', '[' and ']', determine if valid.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "()[]{}", expected: true}, {input: "(]", expected: false}] },
    { title: "Rotate Array", diff: "Medium", desc: "Rotate an array to the right by k steps. Input: {arr: [], k: x}", defaultCode: "function solve(inputObj) {\n    let arr = inputObj.arr; let k = inputObj.k;\n    \n}", testCases: [{input: {arr: [1,2,3,4,5], k: 2}, expected: [4,5,1,2,3]}, {input: {arr: [-1,-100,3,99], k: 2}, expected: [3,99,-1,-100]}] },
    { title: "First Non-Repeating Char", diff: "Medium", desc: "Find the first non-repeating character in a string and return its index. Return -1 if none.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "leetcode", expected: 0}, {input: "aabb", expected: -1}] },

    // --- 10 HARD QUESTIONS ---
    { title: "Longest Palindromic Substring", diff: "Hard", desc: "Given a string, return the longest palindromic substring.", defaultCode: "function solve(str) {\n    \n}", testCases: [{input: "babad", expected: "bab"}, {input: "cbbd", expected: "bb"}] },
    { title: "Merge Intervals", diff: "Hard", desc: "Merge all overlapping intervals. Input: [[1,3],[2,6],[8,10]]", defaultCode: "function solve(intervals) {\n    \n}", testCases: [{input: [[1,3],[2,6],[8,10]], expected: [[1,6],[8,10]]}, {input: [[1,4],[4,5]], expected: [[1,5]]}] },
    { title: "Trapping Rain Water", diff: "Hard", desc: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute trapped water.", defaultCode: "function solve(height) {\n    \n}", testCases: [{input: [0,1,0,2,1,0,1,3,2,1,2,1], expected: 6}, {input: [4,2,0,3,2,5], expected: 9}] },
    { title: "Minimum Edit Distance", diff: "Hard", desc: "Find minimum operations (insert, delete, replace) to convert word1 to word2. Input: [word1, word2]", defaultCode: "function solve(args) {\n    let word1 = args[0]; let word2 = args[1];\n    \n}", testCases: [{input: ["horse", "ros"], expected: 3}, {input: ["intention", "execution"], expected: 5}] },
    { title: "Maximum Subarray Sum", diff: "Hard", desc: "Find the contiguous subarray with the largest sum and return its sum. (Kadane's Algo)", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [-2,1,-3,4,-1,2,1,-5,4], expected: 6}, {input: [1], expected: 1}] },
    { title: "Word Break", diff: "Hard", desc: "Return true if string can be segmented into space-separated sequence of dictionary words. Input: {s: '', dict: []}", defaultCode: "function solve(obj) {\n    let s = obj.s; let dict = obj.dict;\n    \n}", testCases: [{input: {s: "leetcode", dict: ["leet","code"]}, expected: true}, {input: {s: "catsandog", dict: ["cats","dog","sand","and","cat"]}, expected: false}] },
    { title: "Median of Two Sorted Arrays", diff: "Hard", desc: "Find the median of the two sorted arrays. Input: [nums1, nums2]", defaultCode: "function solve(args) {\n    let nums1 = args[0]; let nums2 = args[1];\n    \n}", testCases: [{input: [[1,3], [2]], expected: 2.0}, {input: [[1,2], [3,4]], expected: 2.5}] },
    { title: "First Missing Positive", diff: "Hard", desc: "Given an unsorted integer array, find the smallest missing positive integer in O(n) time.", defaultCode: "function solve(arr) {\n    \n}", testCases: [{input: [1,2,0], expected: 3}, {input: [3,4,-1,1], expected: 2}] },
    { title: "Jump Game", diff: "Hard", desc: "You are positioned at array's first index. Each element represents max jump length. Return true if you can reach the last index.", defaultCode: "function solve(nums) {\n    \n}", testCases: [{input: [2,3,1,1,4], expected: true}, {input: [3,2,1,0,4], expected: false}] },
    { title: "Container With Most Water", diff: "Hard", desc: "Given n non-negative integers representing vertical lines, find two lines that form a container holding the most water.", defaultCode: "function solve(height) {\n    \n}", testCases: [{input: [1,8,6,2,5,4,8,3,7], expected: 49}, {input: [1,1], expected: 1}] }
];



let activeCodingProblems = [];
let currentCodeIndex = 0;
let userCodes = ["", ""];
let codingTimerInterval;
let codingSecondsRemaining = 1800; 

function startCodingExam() {
    activeCodingProblems = shuffleAndSelect(codingQuestionBank, 2);
    currentCodeIndex = 0;
    userCodes = [activeCodingProblems[0].defaultCode, activeCodingProblems[1].defaultCode];
    
    codingSecondsRemaining = 1800;
    updateCodingCountdownUI();
    
    switchSection('coding-console');
    renderCodingProblem();
    
    clearInterval(codingTimerInterval);
    codingTimerInterval = setInterval(() => {
        codingSecondsRemaining--;
        updateCodingCountdownUI();
        if(codingSecondsRemaining <= 0) {
            clearInterval(codingTimerInterval);
            finishCodingExam();
        }
    }, 1000);
}

function updateCodingCountdownUI() {
    const minutes = Math.floor(codingSecondsRemaining / 60);
    const seconds = codingSecondsRemaining % 60;
    document.getElementById('coding-time-countdown').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function switchCodingProblem(index) {
    userCodes[currentCodeIndex] = document.getElementById('code-editor').value;
    currentCodeIndex = index;
    document.getElementById('btn-prob-1').style.backgroundColor = index === 0 ? "var(--secondary-accent)" : "transparent";
    document.getElementById('btn-prob-2').style.backgroundColor = index === 1 ? "var(--secondary-accent)" : "transparent";
    renderCodingProblem();
}

function renderCodingProblem() {
    const problem = activeCodingProblems[currentCodeIndex];
    document.getElementById('code-prob-title').innerText = problem.title;
    
    const diffTag = document.getElementById('code-prob-diff');
    diffTag.innerText = problem.diff;
    diffTag.style.backgroundColor = problem.diff === "Easy" ? "#2ecc71" : problem.diff === "Medium" ? "#f39c12" : "#e74c3c";
    
    document.getElementById('code-prob-desc').innerText = problem.desc;
    document.getElementById('code-editor').value = userCodes[currentCodeIndex];
    document.getElementById('test-case-results').innerHTML = '<div class="test-case-row" style="color: #aaa;">Status: Ready for execution...</div>';
}

function evaluateCodeComplexity(codeString) {
    const cleanCode = codeString.replace(/\s+/g, '');
    let complexityScore = 100;
    let suggestions = [];
    
    if ((cleanCode.match(/for\(/g) || []).length > 1) {
        complexityScore -= 20;
        suggestions.push("Detected nested loops. Target O(N) or O(N log N) complexity to protect execution runtime.");
    }
    if (cleanCode.includes("eval(")) {
        complexityScore -= 40;
        suggestions.push("Security Hazard: Avoid utilizing 'eval()' mechanics inside pure logic routines.");
    }
    if (cleanCode.includes("while(true)")) {
        complexityScore -= 30;
        suggestions.push("Infinite Loop Risk: Avoid untethered while(true) loops in production environments.");
    }
    
    return { score: complexityScore, feedback: suggestions };
}

function runCodingTests() {
    const code = document.getElementById('code-editor').value;
    userCodes[currentCodeIndex] = code; 
    const problem = activeCodingProblems[currentCodeIndex];
    const resultsContainer = document.getElementById('test-case-results');
    resultsContainer.innerHTML = ''; 

    const codeAnalysis = evaluateCodeComplexity(code);
    if (codeAnalysis.feedback.length > 0) {
        let feedbackHtml = `<div class="test-case-row" style="background: rgba(243, 156, 18, 0.15); border-color: #f39c12; color: #f39c12; flex-direction: column; align-items: flex-start;">
            <strong><i class="fas fa-search"></i> AI Code Review (Health Score: ${codeAnalysis.score}/100)</strong>
            <ul style="margin-top: 5px; margin-left: 20px;">`;
        codeAnalysis.feedback.forEach(fb => feedbackHtml += `<li>${fb}</li>`);
        feedbackHtml += `</ul></div>`;
        resultsContainer.innerHTML += feedbackHtml;
    }

    problem.testCases.forEach((tc, index) => {
        let resultRow = document.createElement('div');
        resultRow.className = 'test-case-row loading';
        resultRow.innerHTML = `Running Test Case ${index + 1}... <div class="loader-small"></div>`;
        resultsContainer.appendChild(resultRow);

        setTimeout(() => {
            try {
                const userFunc = new Function('arg', code + '\nreturn solve(arg);');
                const output = userFunc(tc.input);
                const passed = JSON.stringify(output) === JSON.stringify(tc.expected);

                if (passed) {
                    resultRow.className = 'test-case-row success';
                    resultRow.innerHTML = `<i class="fas fa-check-circle"></i> Test Case ${index + 1} Passed`;
                    if (problem.diff === "Hard") addProfileAchievement("Code Ninja", "🥷");
                } else {
                    resultRow.className = 'test-case-row failed';
                    resultRow.innerHTML = `<i class="fas fa-times-circle"></i> Test Case ${index + 1} Failed - Expected: ${JSON.stringify(tc.expected)}, Got: ${JSON.stringify(output)}`;
                }
            } catch (err) {
                resultRow.className = 'test-case-row failed';
                resultRow.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Syntax/Execution Error: ${err.message}`;
            }
        }, (index + 1) * 400); 
    });
}

function finishCodingExam() {
    clearInterval(codingTimerInterval);
    if(codingSecondsRemaining > 0) addProfileAchievement("Speed Coder", "⚡");
    alert("Coding Assessment Submitted Successfully! Your logic has been saved for review.");
    switchSection('dashboard');
}