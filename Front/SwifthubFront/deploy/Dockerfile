FROM node:18.20.2-alpine As build
ENV NODE_VERSION v18.20.2

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .


RUN ng build
EXPOSE 80

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]