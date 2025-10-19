# HNG Backend - Stage 0: Dynamic Profile API

A RESTful API endpoint that returns profile information with dynamic cat facts from an external API.

## 🚀 Features

- GET `/me` endpoint returning profile data
- Dynamic cat facts integration
- Rate limiting (30 requests/minute per IP)
- Error handling with graceful fallbacks
- CORS enabled
- ISO 8601 timestamp formatting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Vixs101/hng-stage-0-backend
cd hng-stage-0-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
USER_EMAIL=your.email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
```

4. Update your personal information in `server.js` (lines 63-65)

## 🏃 Running Locally

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### GET /me
Returns user profile with a random cat fact.

**Response:**
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-19T14:30:45.123Z",
  "fact": "Cats can rotate their ears 180 degrees."
}
```

**Status Codes:**
- `200 OK` - Successful response
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### GET /
Health check endpoint.

## 🧪 Testing

Test the endpoint using curl:
```bash
curl http://localhost:3000/me
```

Or use Postman/Insomnia to make GET requests.

## 📦 Dependencies

- **express** (^4.18.2) - Web framework
- **axios** (^1.6.0) - HTTP client for external API calls
- **dotenv** (^16.3.1) - Environment variable management

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| USER_EMAIL | Your email address | - |
| USER_NAME | Your full name | - |
| USER_STACK | Your backend stack | Node.js/Express |

## 🚀 Deployment

This API can be deployed to:
- Railway
- Heroku
- AWS (EC2, Elastic Beanstalk)
- DigitalOcean
- Any VPS with Node.js support

**Note:** Vercel and Render are not allowed.

## 🔒 Security Features

- Rate limiting (30 requests/minute per IP)
- CORS headers configured
- Environment variables for sensitive data
- Timeout handling for external API calls
- Graceful error handling

## 🐛 Error Handling

The API includes:
- Fallback cat fact if external API fails
- Timeout protection (5 seconds)
- Network error handling
- 404 handling for unknown routes

## 📝 Notes

- Cat facts are fetched fresh on every request (not cached)
- Timestamps are always in UTC using ISO 8601 format
- Rate limiting uses in-memory storage (resets on server restart)

## 👤 Author

**Elijah Victor**
- Email: elijahvix695@gmail.com
- GitHub: [@Vixs101](https://github.com/vixs101)

## 📄 License

MIT

---

Built for HNG intership - Stage 0 Task