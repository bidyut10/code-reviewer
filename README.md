# CodeWise

**AI-Powered Code Reviews for Your GitHub Repositories**

![CodeWise Hero](./assets/cw_hero.png)

## Overview

**CodeWise** is a platform designed to streamline GitHub users' repository management and code review processes. By logging in via GitHub authentication, users gain access to their profile and repositories, track commit histories, and leverage AI-driven code reviews to enhance the quality and efficiency of their projects.

## Features

### 1. Secure GitHub Authentication
Users can securely log in using their GitHub accounts, ensuring a seamless experience. This integration enables easy access to personal repositories and profile information directly from GitHub.

### 2. Repository Management
- **Effortless Connections:** Connect to your GitHub repositories easily.
- **Detailed Commit Histories:** Access and review detailed commit histories.
- **Control Over Projects:** Manage your repositories with complete control, tracking project changes over time.

![CodeWise Home](./assets/cw_home.png)

### 3. AI-Powered Code Reviews
The standout feature of CodeWise! Once connected to a repository, users can request a code review. The AI analyzes the code across commits, compares changes to best practices, and provides intelligent feedback. The reviews aim to improve code quality and help developers adhere to coding standards effortlessly.

![Code Review Page](./assets/cw_review.png)

## How It Works

### 1. Login and Profile Overview
After logging in with GitHub, users can view their profile, see connected repositories, and manage commits across projects. This feature gives a clear overview of their work and project changes.

### 2. Repository and Commit History
Once connected to a repository, the platform displays a comprehensive commit history. This allows users to easily track their project's evolution and understand the changes made over time.

### 3. AI-Powered Code Reviews
After selecting a repository and a specific commit, users can initiate a code review. The AI model intelligently analyzes code changes, adheres to coding standards, and provides feedback in an easy-to-read format. The suggestions focus on improving code quality and ensuring best practices.

## Tech Stack

CodeWise is built using modern technologies to deliver fast and responsive performance:

- **Node.js** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js** - A minimal and flexible Node.js web application framework.
- **MongoDB** - A NoSQL database that uses a document-oriented data model.
- **React** - A JavaScript library for building user interfaces.
- **Tailwind CSS** - A utility-first CSS framework for creating custom designs.
- **Passport.js** - A middleware for Node.js that simplifies user authentication.
- **Google Gemini AI** - An AI model used for providing intelligent code reviews.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/codewise.git
   cd codewise
