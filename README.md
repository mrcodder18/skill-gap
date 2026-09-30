# Skill Gap – Smart Placement Preparation Portal

An AI-powered placement preparation platform designed to help students assess their skills, practice aptitude and coding questions, identify skill gaps, and prepare effectively for technical placements.

## 🚀 Live Demo

Add your deployed project link here:

🔗 **Live Demo:** YOUR_LIVE_LINK_HERE

## 📌 About the Project

Skill Gap is a web-based placement preparation platform that provides students with a structured environment to prepare for technical recruitment.

The platform allows students to:

- Take aptitude tests
- Practice coding questions
- Identify weak topics
- Track performance
- View skill-gap analysis
- Access study resources
- Practice Python programming
- Participate in mock assessments

Teachers can manage students, create customized tests, add questions, and provide study resources.

## 🎯 Objectives

- Help students prepare for technical placement examinations.
- Evaluate student performance through assessments.
- Identify strengths and weaknesses.
- Provide personalized learning resources.
- Improve aptitude and coding skills.
- Track preparation progress through dashboards.
- Provide teachers with tools to conduct assessments.

## ✨ Features

### 👨‍🎓 Student Module

- Student registration and login
- Personalized student dashboard
- Aptitude practice
- Coding practice
- Python coding environment
- Mock tests
- Performance tracking
- Skill-gap analysis
- Study resources
- Test results and scores
- Weak-topic identification

### 👨‍🏫 Teacher Module

- Teacher login
- Student management
- Create and manage tests
- Customize assessments
- Add aptitude questions
- Add coding questions
- Start tests for students
- Add study resources
- Monitor student performance
- View test results

### 📝 Assessment System

The platform supports customized assessments containing:

- Aptitude questions
- Technical questions
- Coding problems
- Medium-level coding questions
- Hard-level coding questions

A sample assessment can contain **82 questions**, including coding and aptitude sections.

## 🧠 Skill Gap Analysis

The system analyzes student performance to identify areas that require improvement.

Example skill categories:

- Quantitative Aptitude
- Logical Reasoning
- Verbal Ability
- Programming
- Data Structures
- Problem Solving
- Technical Knowledge

The dashboard can help students understand:

**Strong Skills → Average Skills → Weak Skills**

This allows students to focus their preparation on topics where improvement is required.

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Student       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Student Dashboard │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐    ┌───────────┐    ┌────────────┐
        │ Aptitude  │    │  Coding   │    │ Resources  │
        │   Tests   │    │ Practice  │    │            │
        └─────┬─────┘    └─────┬─────┘    └────────────┘
              │                │
              └────────┬───────┘
                       ▼
              ┌──────────────────┐
              │ Performance Data │
              └────────┬─────────┘
                       ▼
              ┌──────────────────┐
              │ Skill Gap        │
              │ Analysis         │
              └────────┬─────────┘
                       ▼
              ┌──────────────────┐
              │ Recommendations  │
              └──────────────────┘
