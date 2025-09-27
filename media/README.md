# Media Files for Portfolio

## Required Images
Add these image files to this folder:

1. **ctf-writeups.png** ✅ (already exists)
2. **mobile-penetration-testing-report.png** - Screenshot of your mobile pentest report
3. **waste-sorting-ai.png** - Screenshot of your AI model interface or results
4. **coral-health-ai.png** - Screenshot of your coral health AI application
5. **larana-escrow-website.png** - Screenshot of your escrow website
6. **simple-to-do-list-website.png** - Screenshot of your todo list website

## Optional Videos (for hover/click demos)
If you want to add video demos, add these files:

1. **ctf-writeups-demo.mp4** - Video showing CTF solutions in action
2. **mobile-pentest-demo.mp4** - Video demonstrating mobile testing tools
3. **waste-sorting-demo.mp4** - Video showing the AI model classifying waste

## How to Add Videos
To enable video demos on hover/click:

1. Add your video file to this folder
2. Update the HTML to change `data-media-type="image"` to `data-media-type="video"`
3. Add `data-video-src="media/your-video.mp4"` and `data-thumbnail="media/your-thumbnail.jpg"`

Example:
```html
<div class="project-card" data-media-type="video" 
     data-video-src="media/ctf-writeups-demo.mp4" 
     data-thumbnail="media/ctf-writeups.png">
```

## Image Requirements
- **Format**: PNG or JPG
- **Size**: Recommended 800x450px (16:9 aspect ratio)
- **Quality**: High quality screenshots or project visuals
- **Content**: Clear, professional screenshots of your projects

## Video Requirements
- **Format**: MP4
- **Duration**: 30-60 seconds recommended
- **Size**: Keep under 10MB for web performance
- **Content**: Quick demo showing your project in action
