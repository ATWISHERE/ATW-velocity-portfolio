const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Title & Meta
html = html.replace(/2025 McLaren Formula 1 Driver — Lando Norris/g, 'ABDUL TARIQUE WARSI - Automation & Data Science Engineer');
html = html.replace(/Official hub for British racing star Lando Norris.*?access\./g, 'Portfolio of Abdul Tarique Warsi - AI & Robotics Educator | Automation & Data Science Engineer.');

// Visible Text "Lando Norris"
html = html.replace(/>Lando Norris</g, '>ABDUL TARIQUE WARSI<');
html = html.replace(/>Lando</g, '>ABDUL TARIQUE<');
html = html.replace(/>Norris</g, '>WARSI<');
html = html.replace(/>LANDO NORRIS</g, '>ABDUL TARIQUE WARSI<');
html = html.replace(/>LANDO</g, '>ABDUL TARIQUE<');
html = html.replace(/>NORRIS</g, '>WARSI<');

// Initials and numbers
html = html.replace(/>LN \/\/ 04</g, '>ATW // 01<');
html = html.replace(/>LN4</g, '>ATW<');

// Manifesto Replacements
html = html.replace(/We race, we fight, we bring it all\./gi, 'AI & Robotics Educator | Automation & Data Science Engineer (Python, Tkinter, pdfplumber, PyTesseract OCR, PyAutoGUI, Pandas, Power BI, 5-Axis DMG MORI CNC, B.Tech CS @ Bhabha University, HarvardX CS109x, Global Skills Park Award Winner & 90.3% ITI Topper).');
html = html.replace(/2025 McLaren Formula 1 Driver/gi, 'Automation & Data Science Engineer');

// Social & Contact Links
// To safely replace links without parsing, we can find the hrefs.
// Lando's social links:
html = html.replace(/href="https:\/\/twitter\.com\/LandoNorris"/gi, 'href="https://github.com/ATWISHERE"');
html = html.replace(/href="https:\/\/www\.instagram\.com\/landonorris"/gi, 'href="https://github.com/ATWISHERE"');
html = html.replace(/href="https:\/\/www\.twitch\.tv\/landonorris"/gi, 'href="mailto:abdultarique5@gmail.com"');
html = html.replace(/href="https:\/\/discord\.gg\/landonorris"/gi, 'href="tel:+918770463418"');

fs.writeFileSync('index.html', html);
console.log('Customization complete.');
