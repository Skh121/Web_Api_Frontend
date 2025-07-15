# Select OS/Environment
FROM node:22-alpine As build

# Choose working directory inside docker 
WORKDIR /app

# Copy package.json to install npm packages inside docker 
# copy source destination
COPY package*json ./

# Running shell command
RUN npm install

# Copy rest of the application
COPY . .

RUN npm run build 
# download nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx","-g","daemon off;"]