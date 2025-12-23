# 🍅 Pomodoro Focus Timer

Welcome to my personal take on a Pomodoro timer. This isn't just another timer; it's built to solve a very specific problem I had.

## ✨ Why this app exists

**I built this because I was tired of opening YouTube for "Lofi beats to study to" and ending up watching 3 hours of random video essays.**

Using YouTube for focus music is a trap. The algorithm is designed to distract you. This app gives me the curated audio I need (phonk, score, lofi) without the visual distractions, ads, or "Recommended" sidebar.

It also hits specific requirements most other apps miss:
- **Zero persistence**: Refresh the page, and everything resets. Each day is a fresh start.
- **Intention oriented**: You can set a goal (e.g., "Study for 2 hours") to keep yourself accountable.
- **Privacy first**: No databases, no tracking pixels. Everything runs locally in your browser.

## 🛠️ The Tech Stack (And why I chose it)

I made specific technical choices to ensure the app is fast, maintainable, and fun to work on.

### ⚡ Next.js (App Router)
Why? Because it gives us a solid production-ready framework out of the box. Even though this is largely a client-side app, Next.js handles the build optimization and asset routing seamlessly.

### 🎨 Tailwind CSS
Why? For speed and consistency. I wanted to iterate on the "Glassmorphism" UI quickly. writing standard CSS files would have slowed down the trial-and-error process of getting those translucent backgrounds *just right*.

### 🐻 Zustand
Why? This was a big decision vs. Redux or Context API.
- **Vs Redux**: Redux is overkill. I didn't need complex reducers.
- **Vs Context**: Context causes unnecessary re-renders. When a timer ticks 60 times a minute, you don't want the whole React tree re-rendering.
- **Winner**: Zustand. It allows pinpoint state updates (updating *only* the timer digits) while keeping the app buttery smooth.

## 🚀 Features

- **Distraction-Free Audio**: Built-in phonk, score and lofi songs. No need to open Spotify or YouTube.
- **Daily Focus Tracking**: Shows exactly how much time you've spent in "Focus" mode today.
- **Intention Bar**: Set a visual goal (e.g., 4 hours) and watch it fill up as you work.
- **Secure by Default**: Hardened HTTP headers and zero external request dependencies.

**Running Locally (For development):**
```bash
npm run dev
# Open http://localhost:3000
```
*Note: The app is purely client-side, but it uses Next.js optimization features that work best when built.*

---
*Built to reclaim focus from the algorithm.* 🧠
