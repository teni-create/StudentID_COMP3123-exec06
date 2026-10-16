# Week06 Exercise - Notes Application

Build a Restful CRUD API for a simple Note-Taking application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```
2. Fix error and write Note API code

3. Run Server

```bash
node server.js
```

4. Optionally implement Docker OR vercel Hosting

5. Test all API on Postman and take screenshots at  URL <http://localhost:8081>

## Sample Note Payload

```json
{
    "content" : {
        "noteTitle": "Sample Note Title",
        "noteDescription": "Sample Note Description",
        "priority": "HIGH",
        "dateAdded": "06/Oct/2025",
        "dateUpdated": "06/Oct/2025"
    }
}
```
## Local configuration

Use Node.js 24 (or a Node version supporting process.loadEnvFile).
Copy `.env.example` to `.env` for a fresh checkout and set `MONGODB_URI`
to your own Atlas connection string. The existing local `.env` is preserved.
Allow your current IP in Atlas. Start with `npm start`.
Never commit `.env` or a database password.

## Postman tests

Base URL: `http://localhost:8081`. For POST and PUT select Body → raw → JSON
and use the nested `content` example above. All five schema fields are required
when creating a note. For PUT, send the fields you want to update inside `content`.
Save the `_id` returned by POST and use it in the following requests.

| Method | Path | Expected result |
| --- | --- | --- |
| GET | `/` | 200, welcome HTML |
| POST | `/api/notes` | 201, created note with `_id` |
| GET | `/api/notes` | 200, array of notes |
| GET | `/api/notes/NOTE_ID` | 200, selected note |
| PUT | `/api/notes/NOTE_ID` | 200, updated note |
| DELETE | `/api/notes/NOTE_ID` | 200, deletion message |
| GET | `/api/notes/NOTE_ID` after deletion | 404, note not found |
| POST | `/api/notes` with `{}` | 400, missing content |
| GET | `/api/notes/not-an-id` | 400, invalid ID |

Capture method, URL, request JSON (when used), response status and response body.
