# Libin & Diya — digital wedding invitation

This is a dependency-free static website. Open `index.html` in any modern browser or deploy the whole folder to Netlify, Vercel, GitHub Pages, or a normal web host.

## Edit the invitation

Open [app.js](app.js). The `INVITATION` object at the top contains all names, family details, dates, times, venues, map links, image paths, and music settings. The remaining fixed wording is plain, clearly labelled HTML in `index.html` and can be edited directly.

- To replace a photo, put the new file in `assets` and update the matching item in `assets`.
- To add a licensed music file, add it to `assets`, then set `music.trackUrl` (for example `"assets/our-song.mp3"`). Leave it blank to keep the built-in gentle chime ambience.
- To change the wedding countdown, update `weddingMoment` using an ISO date and time with the correct time-zone offset.

## Sharing preview

The Open Graph and Twitter tags in [index.html](index.html) provide a WhatsApp-friendly sharing preview. Before publishing, replace the `og:image` and `twitter:image` values with the final public HTTPS image URL for the strongest preview support.

## Notes

The supplied wine-glass image is used directly in the reception section. It carries a visible stock watermark, so replace `assets/wine-glasses.png` with a licensed, clean version before publishing if desired.

