FROM node:15-alpine

EXPOSE 3000

RUN apk add make curl-dev gcc libc-dev git --no-cache 

RUN git clone https://github.com/dictu-lang/Dictu.git \
	&& cd Dictu \
	&& make dictu \
	&& cp dictu /usr/bin/ \
	&& dictu tests/runTests.du \
	&& rm -rf *

WORKDIR Dictu-playground

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]