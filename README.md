<h1 align="center">Cats App</h1>

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## 1. Run Docker

```bash
docker compose up -d
```

## 2. Install Dependencies

```bash
# NPM
npm install

# OR YARN
yarn

# OR PNPM
pnpn i

# OR BUN
bun i
```

## 3. Create Environment Variables

```bash
cp .env.template .env
```

**Fill the required data: .env**

```bash
PORT=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
# and more variables ...
```

## 4. Generate Secret

**Open terminal and follow the the next instructions:**

```bash
node
require("node:crypto").randomBytes(64).toString('hex');

# It will generate something like this:
'b89530c6d1bb81bafa12ee4a3481e98104f0622e90ee79fa and more characters ...'
```

**Copy the generated numbers and paste it into: .env to JWT_SECRET value as follows**

```bash
# Note: the three dots means there are more numbers and characters.
JWT_SECRET="1f135548a57a4e2c043d6eb6a6b5e144 and more characters ..."
```