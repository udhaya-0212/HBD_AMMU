# A Little Love Story for Esther

A cinematic birthday experience built with Vite, Three.js and GSAP. The teddy bears are generated from reusable Three.js geometry, so the story works without downloading a model. You can replace the procedural bear with a GLB/GLTF asset later.

## Run locally

On Windows, double-click `START STORY.bat` and leave its window open while viewing the page. It opens the built story in your browser; closing the window stops the local server. Do not open `index.html` directly from File Explorer, because browsers block the page's JavaScript modules from a `file:///` URL.

For development, install Node.js (current LTS), run `npm install`, then run `npm run dev` and open the local URL Vite prints. Run `npm run build` to create the production site in `dist/`.

## Personalize the story

Edit `src/config.js` to change Esther's name, nickname, teddy names, letter, photos, and music path. The sample Thunglish letter is only starter copy; replace it with your own words when ready.

### Add up to 15 couple photos

Put JPEG images in `public/assets/images/couple/` named `couple1.jpeg` through `couple15.jpeg`, then list the photos you have in `coupleImages` in `src/config.js`, for example:

```js
coupleImages: Array.from({ length: 15 }, (_, i) => `/assets/images/couple/couple${i + 1}.jpeg`),
```

Use a smaller length if you have fewer photos. Until you add them, illustrated memory frames appear without broken image requests in the memory tree scene. The ending shows only configured couple photos in a larger, slow loop, with the requested message below.

### Baby reaction stickers

The supplied WhatsApp reaction stickers are bundled locally as animated WebP files in `public/assets/stickers/`. Each negative answer and each positive answer uses a different supplied sticker in the animated message popup. The earlier PNG reactions remain available as fallbacks, and no external media request is needed at runtime.

### Add a romantic song

Place the audio file at `public/assets/music/romantic-song.mp3` (or update `backgroundMusic` in `src/config.js`). The music control starts playback only after a click, to comply with browser audio autoplay rules. If the file is missing, the story still works and the browser simply has no track to play.

### Replace the teddy model

Put a compatible teddy model at `public/assets/models/teddy.glb`, then set `teddyModel` in `src/config.js`. The procedural 3D bear remains as a fallback if the model is missing. The replacement GLB should be centered at its feet, face toward positive Z, and have a similar overall height to the built-in bear. The procedural model supports basic story poses directly; custom GLB animation clips may need mapping if you want authored model animations.

Optional sound effect files can be stored in `public/assets/sounds/`; none are required by the experience.

## Story controls

The source exports `goToScene(name)` from `src/main.js` for the named scene manager. Available routes include `INTRO`, `LOVE_WORLD`, `QUIZ1`, `LETTER`, `MEET`, `CAKE`, `MEMORIES`, and `FINAL`. The normal experience guides the visitor through the full story in order.

## Deploy

### GitHub

Create an empty GitHub repository, then in this folder run:

```bash
git init
git add .
git commit -m "Create Esther birthday love story"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPOSITORY.git
git push -u origin main
```

### Netlify

Import the GitHub repository in Netlify. `netlify.toml` already sets the build command to `npm run build` and the publish directory to `dist`. Netlify will redeploy when you push changes. The Vite project also runs with its standard preview server using `npm run preview`.

## Notes

- Assets are optional. Missing photos, music, and GLB do not prevent the experience from starting.
- The visual environment and teddy are rendered in Three.js; text, buttons, and the letter remain semantic HTML for accessibility.
- Reduced-motion preferences are respected, and the renderer caps device pixel ratio to keep the scene lighter on mobile.
