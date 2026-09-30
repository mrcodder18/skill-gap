from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable connection from frontend[cite: 1]

# --- 1. THE DATASET (10 ROLES) ---
jobs_data = {
    "Frontend Developer": {"description": "Building responsive user interfaces using modern javascript frameworks. collaborating with designers to implement ui/ux designs. optimizing applications for maximum speed and scalability. proficiency in html5, css3, javascript (es6+), and libraries like react.js, vue.js or angular. experience with state management like redux and version control using git. understanding of cross-browser compatibility and web performance optimization.", "must_have": ["javascript", "react", "html", "css", "redux", "git"], "resources": ["React Official Docs", "CSS Grid Garden", "Redux Toolkit Tutorial"]},
    "Backend Developer": {"description": "Server-side logic and database management. designing and implementing restful apis. knowledge of server-side languages such as python, node.js, java, or go. experience with database technology like postgresql, mysql, or mongodb. familiarity with cloud platforms (aws/azure) and containerization tools like docker and kubernetes. implementing security and data protection measures.", "must_have": ["python", "sql", "api", "docker", "django", "node"], "resources": ["Django for Beginners", "PostgreSQL Tutorial", "Docker Deep Dive"]},
    "Data Scientist": {"description": "Analyzing large datasets to extract actionable insights. building predictive models using machine learning algorithms. strong proficiency in python or r. experience with data manipulation libraries like pandas and numpy. visualization skills using matplotlib, seaborn, or tableau. knowledge of statistical analysis, hypothesis testing, and deep learning frameworks like tensorflow or pytorch.", "must_have": ["python", "pandas", "machine learning", "statistics", "sql", "tableau"], "resources": ["Kaggle Micro-Courses", "Stats for ML", "Tableau Zero to Hero"]},
    "DevOps Engineer": {"description": "Bridging the gap between development and operations. implementing ci/cd pipelines using jenkins, gitlab ci, or circleci. managing cloud infrastructure on aws, azure, or gcp using terraform or cloudformation. container orchestration with kubernetes. scripting skills in bash or python. monitoring and logging using prometheus, grafana, or elk stack.", "must_have": ["aws", "docker", "kubernetes", "linux", "jenkins", "terraform"], "resources": ["DevOps Roadmap", "Terraform Up & Running", "Kubernetes The Hard Way"]},
    "UI/UX Designer": {"description": "Designing intuitive and aesthetically pleasing user interfaces. conducting user research and creating user personas. creating wireframes, prototypes, and high-fidelity mockups using tools like figma, adobe xd, or sketch. understanding of design systems and typography. collaboration with developers to ensure design feasibility.", "must_have": ["figma", "prototyping", "wireframing", "user research", "adobe xd"], "resources": ["Google UX Certificate", "Figma 101", "Laws of UX"]},
    "Mobile Developer": {"description": "Developing functional mobile applications for ios and android platforms. expertise in swift for ios or kotlin for android. experience with cross-platform frameworks like flutter or react native. understanding of mobile lifecycle, restful apis, and offline storage. publishing apps to the app store and google play store.", "must_have": ["swift", "kotlin", "flutter", "react native", "ios", "android"], "resources": ["Flutter Documentation", "Android Developer Guide", "iOS App Dev"]},
    "Full Stack Developer": {"description": "Handling both client-side and server-side development. proficiency in frontend technologies (react, angular) and backend languages (node.js, python). experience with databases (sql and nosql). understanding of api design and microservices architecture. version control with git and deployment on cloud platforms.", "must_have": ["javascript", "node", "react", "sql", "api", "git"], "resources": ["The Odin Project", "Full Stack Open", "FreeCodeCamp"]},
    "Cybersecurity Analyst": {"description": "Protecting systems and networks from cyber threats. monitoring security access and analyzing security breaches. knowledge of firewalls, proxies, and siem tools. conducting penetration testing and vulnerability assessments. familiarity with network protocols (tcp/ip) and operating systems (linux/windows). understanding of compliance standards like gdpr and hipaa.", "must_have": ["network security", "linux", "firewalls", "penetration testing", "siem"], "resources": ["TryHackMe", "CompTIA Security+", "OWASP Top 10"]},
    "Cloud Architect": {"description": "Designing and managing cloud computing strategies. deep understanding of cloud architecture patterns on aws, azure, or google cloud. knowledge of networking, security, and scalability in the cloud. experience with migration strategies and cost optimization. infrastructure as code (iac) using terraform or ansible.", "must_have": ["aws", "azure", "cloud architecture", "networking", "security"], "resources": ["AWS Solutions Architect", "Azure Fundamentals", "Google Cloud Skills"]},
    "Product Manager": {"description": "Defining product vision and strategy. gathering and prioritizing product requirements. collaborating with engineering, design, and marketing teams. experience with agile methodologies (scrum/kanban). strong communication and stakeholder management skills. using tools like jira, trello, or asana for project management.", "must_have": ["agile", "scrum", "product strategy", "communication", "jira"], "resources": ["Product School", "Agile Manifesto", "Jira Fundamentals"]}
}

# --- 2. TRAIN ML MODEL ---
role_names = list(jobs_data.keys())
role_descriptions = [data['description'] for data in jobs_data.values()]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(role_descriptions)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        user_skills_text = data.get('skills', '').lower()
        
        if not user_skills_text:
            return jsonify({"error": "No skills"}), 400

        user_vector = vectorizer.transform([user_skills_text])
        similarities = cosine_similarity(user_vector, tfidf_matrix)
        
        # IMPROVEMENT 1: Multi-Label Career Path Classifier
        all_similarities = similarities[0] * 100
        top_indices = np.argsort(all_similarities)[::-1][:3]  # Extract Top 3 Roles

        predictions = []
        user_skill_list = [s.strip() for s in user_skills_text.split(',')]

        for idx in top_indices:
            role_name = role_names[idx]
            score = round(float(all_similarities[idx]), 1)
            required_skills = jobs_data[role_name]["must_have"]
            
            # Gap Logic unique to each role
            gaps = [req for req in required_skills if not any(req in user_s for user_s in user_skill_list)]
            
            predictions.append({
                "role": role_name,
                "score": score,
                "gaps": gaps
            })

        # Return primary and alternative recommendations
        return jsonify({
            "primary": predictions[0],
            "alternatives": predictions[1:]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- 3. PROGRESS TRACKER ML MODEL ---
@app.route('/track_progress', methods=['POST'])
def track_progress():
    try:
        data = request.json
        scores = data.get('scores', [])

        if len(scores) < 2:
            return jsonify({
                "status": "insufficient_data",
                "predicted_score": None,
                "insight": "The ML model requires at least 2 test attempts to establish a learning curve trajectory. Keep practicing!",
                "trend_tag": "Data Gathering Phase"
            })

        x = np.array(range(1, len(scores) + 1))
        y = np.array(scores)

        # IMPROVEMENT 2: Advanced Polynomial Regression
        if len(scores) >= 5:
            # y = ax^2 + bx + c
            coefficients = np.polyfit(x, y, 2)
            next_x = len(scores) + 1
            predicted_score = int(round(coefficients[0]*(next_x**2) + coefficients[1]*next_x + coefficients[2]))
            predicted_score = max(0, min(100, predicted_score))
            
            acceleration = coefficients[0]
            slope, _ = np.polyfit(x, y, 1)  # Linear fallback for baseline analysis
            
            if acceleration < 0 and slope <= 0:
                trend_tag = "⚠️ Fatigue Warning"
                insight = f"The ML algorithm detects a sharp plateau in your learning curve. We recommend taking a 24-hour break before re-attempting. Predicted score: {predicted_score}%."
            elif acceleration > 0:
                trend_tag = "🚀 Exponential Growth"
                insight = f"You are experiencing an exponential breakthrough! Keep up the momentum. Predicted score: {predicted_score}%."
            else:
                trend_tag = "📈 Steady Growth"
                insight = f"Steady, linear improvement detected. Predicted score: {predicted_score}%."
            
            slope_val = round(float(slope), 2)
            
        else:
            # Standard Linear Regression for early datasets
            slope, intercept = np.polyfit(x, y, 1)
            next_x = len(scores) + 1
            predicted_score = int(round((slope * next_x) + intercept))
            predicted_score = max(0, min(100, predicted_score))

            if slope > 2:
                insight = f"Excellent trajectory! The algorithm detects a sharp upward learning curve. Predicted score: {predicted_score}%."
                trend_tag = "🚀 Rapid Improvement"
            elif slope > 0:
                insight = f"You are showing steady, incremental improvement. Predicted score: {predicted_score}%."
                trend_tag = "📈 Steady Growth"
            else:
                insight = f"Your performance has plateaued or dipped slightly. Predicted score: {predicted_score}%."
                trend_tag = "⚠️ Attention Required"
                
            slope_val = round(float(slope), 2)

        return jsonify({
            "status": "success",
            "predicted_score": predicted_score,
            "insight": insight,
            "trend_tag": trend_tag,
            "slope": slope_val
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("AI Server Running...")
    app.run(debug=True, port=5000)