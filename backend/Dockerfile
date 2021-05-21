FROM node:15-alpine

EXPOSE 3000

RUN apk update && \
	apk add --update-cache make curl-dev gcc libc-dev "cmake>3.16.3" git --no-cache

RUN git clone https://github.com/dictu-lang/Dictu.git \
	&& cd Dictu \
	&& cmake -DCMAKE_BUILD_TYPE=Release -B build \
    && cmake --build ./build \
	&& cp dictu /usr/bin/ \
	&& rm -rf * 

WORKDIR Dictu-playground

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]