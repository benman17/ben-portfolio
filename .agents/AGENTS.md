# Project Rules for Ben Manguiat Portfolio Website

## Automated GitHub Commits & Synchronization
Whenever any code, content, styling, data, or configuration changes are made to this project:
1. Verify the change by running `npm run build`.
2. Automatically commit the changes to Git with a descriptive commit message:
   ```bash
   git add .
   git commit -m "Description of changes made"
   git push origin main
   ```
3. Always maintain synchronization with the remote GitHub repository at `https://github.com/benman17/ben-portfolio.git`.
