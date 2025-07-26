# Simple Registration Website

A lightweight registration website that allows visitors to register with their name, surname, and email. Registrations are sent to an administrator's email, and the admin can control the number of available registration spots.

## Features

- User registration form with name, surname, and email fields
- Display of available registration spots
- Admin panel to set the maximum number of available spots
- Email notifications for new registrations
- Simple data persistence using JSON file
- Responsive design using Bootstrap 5

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- A Gmail account or other email service for sending notifications

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/simple-registration-site.git
   cd simple-registration-site
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your email configuration:
   ```
   PORT=3000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin-email@example.com
   ```

   > Note: If using Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. For development with auto-reload:
   ```
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Usage

#### User Registration
- Visit the homepage to access the registration form
- Fill in your name, surname, and email
- Submit the form to register (if spots are available)

#### Admin Panel
- Access the admin panel via `/admin.html`
- View current registrations
- Update the total number of available spots

## File Structure

- `index.html` - Main registration page
- `admin.html` - Admin panel
- `css/styles.css` - Stylesheet
- `js/main.js` - Frontend script for registration form
- `js/admin.js` - Frontend script for admin panel
- `server.js` - Express server handling API endpoints and serving static files
- `data.json` - (Auto-generated) Data storage for registrations and available spots
- `.env` - Environment variables for configuration

## Customization

- Edit `styles.css` to modify the appearance
- Modify email templates in the `server.js` file

## License

MIT
