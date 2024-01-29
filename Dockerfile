FROM node:18-slim AS BUILD_API_IMAGE

# skips puppeteer installing chrome
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /usr/app

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update \
    && apt-get install -y wget gnupg --no-install-recommends \
    && wget --no-check-certificate  -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update -y \
    && apt-get install -y google-chrome-stable libxss1 --no-install-recommends \
    && fc-cache -fv \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY ./src ./src 
COPY ./assets ./assets
COPY tsconfig.json .

RUN mv /usr/app/assets/fonts/* /usr/share/fonts/ && fc-cache -f -v

CMD ["npm", "start"]
