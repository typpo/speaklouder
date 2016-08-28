## Call Campaign Website

Configure me:

```
cp dotenv_example .env

# Edit .env with your oauth keys if necessary.
```

Run me:

```
supervisor call_campaign_entry.js
```

The server runs on http://localhost:36969

Watch and rebuild CSS:

```
npm run watch
```

Requirements:

  - mongo
