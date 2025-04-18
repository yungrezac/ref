```markdown
# Telegram Referral WebApp

## 📌 Overview
A responsive Telegram WebApp for creating and managing referral links with tracking functionality.

## ✨ Features
- **Link Generation**
  - Custom referral parameters
  - QR code generation
  - Link sharing options
- **Campaign Management**
  - Create/delete campaigns
  - Set goals and rewards
  - Track progress
- **Analytics**
  - Click statistics
  - Device/browser detection
  - Conversion tracking
- **User Experience**
  - Dark/light mode
  - Toast notifications
  - Telegram-optimized UI

## 🛠️ Installation
1. Save the HTML code as `index.html`
2. Host on any web server
3. Configure with Telegram bot:

```javascript
bot.setWebAppUrl('https://yourdomain.com/index.html');
```

## 🚀 Usage Examples

### Generate Referral Link
```javascript
// Sample generated link structure
https://yourapp.com?r=target_url&p=ref_code&username=ref_username
```

### Track Referral
```javascript
function trackReferral(refCode) {
  // Register click with:
  // - Timestamp
  // - Device info
  // - User agent
  // - Telegram user data (if available)
}
```

## 📊 Data Structure

### Campaign Object
```json
{
  "id": "unique_id",
  "name": "Summer Promo",
  "link": "https://example.com",
  "refParam": "summer2023",
  "goal": 1000,
  "clicks": 243,
  "createdAt": "2023-06-15T10:00:00Z"
}
```



## 📝 Notes
- Requires Telegram client with WebApp support
- All data stored in localStorage
- For production use, implement backend storage

## 📜 License
MIT License © 2023 YUNGREZAC
```

