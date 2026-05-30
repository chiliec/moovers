# moovers.axveer.io is a plain static site (no build step). Copy only the
# site files — the repo also holds bali/ (separate subdomain app), old/,
# docs/, and project artifacts that must NOT be served here.
FROM nginx:alpine
COPY index.html styles.css script.js /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
