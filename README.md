<div align="center">
    <h2>GitHub Profile Visualize</h2>
</div>

A modern and interactive web application that transforms your GitHub profile data into beautiful, insightful
visualizations. Discover patterns in your coding activity, explore your repository statistics, and showcase your
development journey through stunning charts and graphics.

## ✨ Features

- **Profile Overview**: Comprehensive dashboard displaying key GitHub statistics
- **Repository Analytics**: Detailed insights into your repositories, languages, and contributions
- **Activity Visualization**: Interactive charts showing your coding patterns over time
- **Language Distribution**: Beautiful pie charts and bar graphs of your programming languages
- **Contribution Heatmap**: Visual representation of your GitHub activity

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16.0 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lonewolfyx/github-profile-visualized.git
   cd github-profile-visualize
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your GitHub Personal Access Token:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token_here
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
   ```

   To get a GitHub Personal Access Token:
    - Go to GitHub Settings → Developer settings → Personal access tokens
    - Generate a new token with appropriate permissions (public_repo, read:user)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000` to see the application running.

## 🙏 Acknowledgments

This project was inspired by and built upon ideas from several amazing repositories and developers:

- **[beautify-github-profile](https://github.com/rzashakeri/beautify-github-profile)** - a more beautiful and appealing github profile
- **[lowlighter/metrics](https://github.com/antonkomarev/github-profile-views-counter)** - Github visualization data metrics
- **[github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy)** - GitHub Stat Trophies

Special thanks to the open-source community for providing excellent tools and libraries that made this project possible.

## 📝 License

This project is licensed under the MIT License - see
the [LICENSE](https://github.com/lonewolfyx/github-profile-visualized/blob/master/LICENSE) file for details.

## 🌟 Show Your Support

If you found this project helpful, please consider giving it a ⭐️ on GitHub!
