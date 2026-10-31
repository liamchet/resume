# Public portfolio source
Build: npm install --prefix _Technical/Website, then node _Technical/Website/build.cjs from repository root.
Edit profile.template.html for site copy, islands.jsx for React integration and root Liam_Chetrit_Resume.html for resume copy (synchronize the dist copy and legacy aliases).
React Bits JS-CSS files are unmodified copies of the requested registries, retrieved from DavidHDev/react-bits commit 4dc7b5b7772e1217c8fb8d2a7aa074302180e5b4 because direct registry retrieval was unavailable. OGL is listed by PatternWaves; SpecularButton has no extra dependencies. React and ReactDOM support the islands; esbuild embeds CSS/JS into the HTML.
The Pages workflow installs dependencies, builds, validates interactions, renders all resume PDFs, commits matching root/dist outputs and checks public hashes.
Only three selected case studies. Keep the ten supplied gallery images. Respect reduced motion and the motion pause button.
Source registries: https://reactbits.dev/r/PatternWaves-JS-CSS.json and https://reactbits.dev/r/SpecularButton-JS-CSS.json
Career data and project instructions are private in Drive and must not be uploaded here.
