# LVAstudio_v1-dev
test 123
**Test Message:** This works! 🚀

This repository is used for live previewing the dev branch of LVAstudio_v1.

- Any changes pushed here will be visible on the dev preview site via GitHub Pages.
- Use this to test features before merging to production. 

The message "nothing to commit, working tree clean" means the README.md file is already staged and committed in your local main branch. If you just pushed, but still don't see it on GitHub, it may be due to:

- The push not being completed to the correct remote/branch.
- A page cache—try refreshing your browser or clearing cache.

### Next Steps:
1. Make sure you are on the main branch:
   ```sh
   git checkout main
   ```
2. Push again to ensure the latest state is on GitHub:
   ```sh
   git push origin main
   ```

After this, refresh your GitHub repository page.  
You should see the README with the test message.

If you still don't see it, let me know and I can help you troubleshoot further! 

---

## 1. **Repository & Branch Structure**

| Repository Name         | Branch | Purpose                        | Live Site URL                                                                 |
|------------------------|--------|--------------------------------|-------------------------------------------------------------------------------|
| LVAstudio_v1           | main   | Production/live site           | [https://staylegitlonewolf.github.io/LVAstudio_v1/](https://staylegitlonewolf.github.io/LVAstudio_v1/)         |
| LVAstudio_v1-dev       | main   | Dev preview/testing site       | [https://staylegitlonewolf.github.io/LVAstudio_v1-dev/](https://staylegitlonewolf.github.io/LVAstudio_v1-dev/) |

- **LVAstudio_v1**: Pushes to `main` update your live/production site.
- **LVAstudio_v1-dev**: Pushes to `main` here update your dev preview site.

---

## 2. **README Status**
- Both repos have a README with the test message:  
  **Test Message:** This works! 🚀

---

## 3. **How to Work Going Forward**

- **For production/live updates:**  
  Edit your code, then push to `main` in `LVAstudio_v1` (use quickpush.bat).

- **For dev/preview testing:**  
  Edit your code, then push to `main` in `LVAstudio_v1-dev` (use quickpush-dev.bat or push to the dev repo).

---

## 4. **Test Plan**

Let’s do a test to confirm everything works:

### Step 1: Make a Change
- Edit `js/portal.js` in your local project.
- Add a comment at the top:  
  ```js
  // TEST: This is a live site test
  ```
- Save the file.

### Step 2: Push to Production (LVAstudio_v1)
- Make sure you are on the `main` branch.
- Run:
  ```sh
  .\quickpush.bat
  ```
- This will push to your production repo and update your live site.

### Step 3: Push to Dev Preview (LVAstudio_v1-dev)
- Make sure you are on the `main` branch (or switch to it).
- Run:
  ```sh
  git push devpreview main
  ```
  (Or use a script if you have one for the dev repo.)

### Step 4: Verify
- Visit both live sites:
  - [Production](https://staylegitlonewolf.github.io/LVAstudio_v1/)
  - [Dev Preview](https://staylegitlonewolf.github.io/LVAstudio_v1-dev/)
- Check that your test comment is reflected in both (it may take a minute for GitHub Pages to update).

---

## 5. **Summary Table**

| Action                | Command/Script         | Repo/Branch         | Site Updated?         |
|-----------------------|-----------------------|---------------------|-----------------------|
| Push to production    | quickpush.bat         | LVAstudio_v1/main   | Live site             |
| Push to dev preview   | quickpush-dev.bat or  | LVAstudio_v1-dev/main | Dev preview site      |
|                       | git push devpreview main |                     |                       |

---

## 6. **Ready to Test?**
Would you like me to make the test change and push to both repos for you, or would you like to try it yourself and I’ll verify?

Let me know how you’d like to proceed! 

---

## How to Fix: Push README Update to Main Production Repo

1. **Make sure you are on the `main` branch:**
   ```sh
   git checkout main
   ```

2. **Add and commit the README.md file (if not already committed):**
   ```sh
   git add README.md
   git commit -m "Update README with workflow and test instructions"
   ```

3. **Push to the main production repository:**
   ```sh
   git push origin main
   ```

---

### What Happens Next?
- After running these commands, refresh your main repo page:  
  [https://github.com/staylegitlonewolf/LVAstudio_v1](https://github.com/staylegitlonewolf/LVAstudio_v1)
- You should now see the updated README in your main production repository as well.

---

Would you like me to run these commands for you now? 