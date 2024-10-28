# Purify.today 🧹

> Because tomorrow's code deserves today's excellence

Purify is a modern web application that helps developers maintain clean, efficient, and maintainable code through AI-powered code analysis and refactoring suggestions.

## ✨ Features

### 1. Smart Code Analysis

- Multiple analysis modes:
  - General Analysis
  - Refactoring (Based on Martin Fowler's principles)
  - Clean Code (Based on Robert Martin's principles)
- Real-time processing of multiple files
- Support for various programming languages
- AI-powered suggestions using OpenAI Models

### 2. Adding Custom Rules

- Create and manage your own code analysis rules
- Pattern matching using regular expressions
- Customizable suggestions for improvements
- Searchable rule library
- Rule persistence across sessions

### 3. Advanced Visualization

- Split-view code comparison
- Syntax highlighting for multiple languages
- Markdown rendering for suggestions
- Dark/Light mode support
- Responsive design for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- OpenAI API key for AI-powered suggestions

### Installation

1. Clone the repository:

```bash
git clone https://github.com/babaygt/purify.git
cd purify
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

Add your OpenAI API key to the `.env` file:

```bash
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- **AI Integration**: [OpenAI GPT-4](https://openai.com/) - AI-powered code analysis
- **Code Processing**: Custom stream processing
- **Syntax Highlighting**: react-syntax-highlighter
- **Markdown Rendering**: react-markdown

## 🏗 Project Structure

```
purify/
├── app/                # Next.js app directory
│   ├── analyze/       # Code analysis page
│   ├── suggestions/   # Suggestions display
│   └── custom-rules/  # Custom rules management
├── components/        # Reusable React components
│   ├── ui/           # Base UI components
│   ├── analyze/      # Analysis-specific components
│   └── custom-rule/  # Rule management components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## 💡 Usage

1. **Upload Code**:

   - Navigate to the Analysis page
   - Drop your files or select them using the file picker
   - Choose your analysis type

2. **Custom Rules**:

   - Go to Custom Rules page
   - Create new rules with patterns and suggestions
   - Apply them during analysis

3. **View Results**:
   - See split-view comparison
   - Read AI-powered suggestions
   - Copy improved code snippets

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Martin Fowler's "Refactoring" for code improvement principles
- Robert C. Martin's "Clean Code" for best practices
- The open-source community for inspiration and tools

## 🚀 Roadmap

- [ ] Direct Code Access
  - Direct folder structure analysis
  - GitHub repository integration
    - Direct repository analysis
    - Webhook support for automatic analysis on new commits
    - Pull request integration
- [ ] Advanced Code Processing
  - Vector database integration for large codebases
  - Semantic code search capabilities
  - Incremental analysis for repository changes
- [ ] Custom Rules Ecosystem
  - Rule sharing marketplace
  - Community-driven rule templates
  - Rule effectiveness analytics
- [ ] CI/CD Integration
  - Pipeline integration
  - Automated quality gates
  - Custom reporting workflows
