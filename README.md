# 🎬 YouTube Clone

A modern, responsive YouTube clone built with **React.js** and **Material UI**, powered by the **YouTube Data API v3** via RapidAPI. Features a sleek dark-themed UI with glassmorphism effects, real-time video search, channel exploration, and video playback.

---

## ✨ Features

- 🔍 **Real-time Search** — Search YouTube videos instantly with an auto-clearing search bar
- 📂 **Category Sidebar** — Browse videos by 15+ categories (Music, Coding, Gaming, etc.)
- 🎥 **Video Playback** — Embedded YouTube player with full controls via `react-player`
- 📺 **Channel Pages** — Dedicated channel detail pages with subscriber counts and video listings
- 🧩 **Related Videos** — "Up Next" panel alongside the video player
- 🌙 **Dark Theme** — Premium dark UI with glassmorphism navbar, hover effects, and smooth animations
- 📱 **Fully Responsive** — Adapts from mobile to desktop with MUI breakpoints

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                 |
|--------------|----------------------------------------------------------------------------|
| **Frontend** | [React 18](https://reactjs.org/) — Component-based SPA                    |
| **Routing**  | [React Router v6](https://reactrouter.com/) — Client-side navigation      |
| **UI Library** | [Material UI v5](https://mui.com/) — Pre-built components & styling     |
| **Video Player** | [React Player](https://github.com/cookpete/react-player) — YouTube embed |
| **HTTP Client** | [Axios](https://axios-http.com/) — API requests                        |
| **API** | [YouTube Data API v3](https://rapidapi.com/ytdlfree/api/youtube-v31/) via RapidAPI |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) — Modern sans-serif      |
| **Build Tool** | [Create React App](https://create-react-app.dev/)                       |

---

## 📁 Project Structure

```
src/
├── App.js                  # Root component — routes & layout
├── App.css                 # Global styles (search bar, sidebar, cards, animations)
├── index.js                # Entry point — renders <App />
├── index.css               # Base styles (fonts, resets, scrollbar)
│
├── Components/
│   ├── index.js            # Barrel exports for all components
│   ├── Navbar.js           # Sticky glassmorphism header with logo & search
│   ├── SearchBar.js        # Search input with navigation on submit
│   ├── Sidebar.js          # Category filter buttons (New, Music, Coding…)
│   ├── Feed.js             # Main feed — sidebar + video grid
│   ├── Videos.js           # Video/channel grid — channels rendered first
│   ├── VideoCard.js        # Individual video thumbnail card with hover effects
│   ├── ChannelCard.js      # Channel avatar card with subscriber info
│   ├── VideoDetail.js      # Video player page + info + related videos
│   ├── ChannelDetail.js    # Channel banner + channel card + channel videos
│   ├── SearchFeed.js       # Search results page
│   └── Err404.js           # 404 fallback
│
└── utils/
    ├── constants.js        # Categories list, demo URLs, MUI icon imports
    └── fetchFromAPI.js     # Axios wrapper for YouTube API calls
```

---

## 🔄 Application Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER OPENS APP                           │
│                     http://localhost:3000                         │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│  App.js  →  <Router> wraps everything                            │
│            →  <Navbar /> rendered on every page (sticky)         │
│            →  <Routes> matches URL to page component             │
└──────────────────────┬───────────────────────────────────────────┘
                       │
          ┌────────────┼────────────┬─────────────┬──────────┐
          ▼            ▼            ▼             ▼          ▼
      Route: /    /video/:id  /channel/:id  /search/:q    /*
      <Feed />   <VideoDetail/> <ChannelDetail/> <SearchFeed/> <Err404/>
```

### 🏠 Feed Flow (`/`)
```
Feed.js
  ├── Renders <Sidebar /> (left panel)
  │     └── User clicks a category → setSelectedCategory("Music")
  │
  ├── useEffect triggers on category change
  │     └── fetchFromAPI("search?part=snippet&q=Music")
  │           └── Axios GET → RapidAPI → YouTube Data API v3
  │                 └── Returns array of video/channel items
  │
  └── Renders <Videos /> (main grid)
        ├── Filters: channels FIRST, then videos
        ├── <ChannelCard /> for each channel result
        └── <VideoCard /> for each video result
```

### 🎥 Video Detail Flow (`/video/:id`)
```
VideoDetail.js
  ├── useParams() extracts video ID from URL
  │
  ├── useEffect fires two API calls:
  │     ├── videos?part=snippet,statistics&id=<ID>
  │     │     └── Returns: title, channelTitle, viewCount, likeCount
  │     │
  │     └── search?part=snippet&q=<channelTitle>&type=video
  │           └── Returns: related videos for "Up Next" panel
  │
  ├── Left column:
  │     ├── <ReactPlayer /> — embedded YouTube iframe
  │     ├── Video title
  │     ├── Channel info (avatar, name, verified badge)
  │     └── Stats chips (Likes, Views)
  │
  └── Right column:
        └── <Videos direction="column" /> — vertical "Up Next" list
```

### 📺 Channel Detail Flow (`/channel/:id`)
```
ChannelDetail.js
  ├── useParams() extracts channel ID
  │
  ├── useEffect fires two API calls:
  │     ├── channels?part=snippet&id=<ID>
  │     │     └── Returns: channel name, avatar, subscriber count
  │     │
  │     └── search?channelId=<ID>&part=snippet&order=date
  │           └── Returns: latest videos from the channel
  │
  ├── Gradient banner (top decoration)
  ├── <ChannelCard /> overlapping the banner
  └── <Videos /> grid of channel's videos
```

### 🔍 Search Flow (`/search/:searchQuery`)
```
SearchFeed.js
  ├── useParams() extracts search query
  ├── useEffect → fetchFromAPI("search?part=snippet&q=<query>")
  └── <Videos /> renders results (channels first, then videos)
```

---

## 🔌 API Integration

All API calls go through a single utility — `fetchFromAPI.js`:

```javascript
// src/utils/fetchFromAPI.js
const baseURL = "https://youtube-v31.p.rapidapi.com";

export const fetchFromAPI = async (url) => {
  const response = await axios.get(`${baseURL}/${url}`, {
    params: { maxResults: "50" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  });
  return response.data;
};
```

> **API Key** is stored in `.env` as `REACT_APP_RAPID_API_KEY` (prefixed for CRA)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 16
- **npm** ≥ 8
- A **RapidAPI** account with access to [YouTube v3 API](https://rapidapi.com/ytdlfree/api/youtube-v31/)

### Installation

```bash
# 1. Clone the repo
git clone <repo-url>
cd -YtAdyCln

# 2. Install dependencies
npm install

# 3. Create .env file with your API key
echo REACT_APP_RAPID_API_KEY=your_rapidapi_key_here > .env

# 4. Start the dev server
npm start
```

The app will open at **http://localhost:3000** 🎉

### Build for Production

```bash
npm run build
```

---

## 🎨 Design Highlights

- **Glassmorphism Navbar** — Semi-transparent with `backdrop-filter: blur(16px)`, stays sticky on scroll
- **Animated Search Bar** — Focus glow ring with red accent, frosted glass background
- **Video Card Hover** — Thumbnail zoom + play button overlay + card lift + red border glow
- **Channel Cards** — Compact avatar with letter-initial fallback, hover lift with shadow
- **Gradient Accents** — Red gradient text, heading underlines, channel page banners
- **Custom Scrollbar** — Slim 4px track, red hover thumb
- **Fade-up Animations** — Headings animate in with `@keyframes fadeUp`

---

## 📄 License

This project is for **educational purposes only**. YouTube and the YouTube logo are trademarks of Google LLC.
