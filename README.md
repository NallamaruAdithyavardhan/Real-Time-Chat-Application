# Real-Time Chat Application

A modern, feature-rich real-time chat application built with vanilla HTML, CSS, and JavaScript. This application provides a fully functional chat interface with multiple rooms, user authentication, and text formatting capabilities.

## Features

### Core Functionality
- **User Authentication**: Simple login system with username validation
- **Multiple Chat Rooms**: Join or create chat rooms for different conversations
- **Real-Time Messaging**: Send and receive messages instantly
- **User Presence**: See how many users are online in each room
- **System Messages**: Automatic notifications when users join or leave rooms

### Text Formatting
- **Bold Text**: Use `**text**` to make text bold
- **Italic Text**: Use `*text*` to italicize text
- **Links**: Format links with the link button in the UI
- **Visual Formatting Toolbar**: Easy-to-use formatting buttons

### User Interface
- **Modern Design**: Clean, professional interface with gradient background
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Fade-in effects for messages
- **Color-Coded Messages**: Different styling for your messages vs. others

## Project Structure

```
Real-Time-Chat-Application/
├── index.html          # Main HTML file with UI structure
├── chat.js             # JavaScript logic and event handlers
├── chat.css            # Styling and responsive design
└── README.md           # Project documentation
```

## File Descriptions

### index.html
- Contains the HTML structure for the login screen and chat interface
- Includes form elements for user input
- Structured with semantic HTML5 elements

### chat.js
Main application logic including:
- `ChatApp` class: Manages all chat functionality
- User authentication and session management
- Room creation and joining logic
- Message sending and rendering
- Text formatting parser
- Event listener setup

### chat.css
Comprehensive styling featuring:
- Flexbox-based responsive layout
- Modern color scheme (purple/blue gradient)
- Smooth transitions and animations
- Mobile-friendly media queries
- Custom scrollbar styling

## How to Use

### Getting Started
1. Open `index.html` in a web browser
2. Enter a username (minimum 3 characters)
3. Click "Join Chat" button

### Chat Operations
1. **Select a Room**: Click on any room in the left sidebar to join
2. **Create New Room**: Type a room name in the input field and click "Create"
3. **Send Messages**: Type your message and click "Send" or press Enter
4. **Format Text**: 
   - Select text and click Bold (B) for **bold**
   - Select text and click Italic (I) for *italic*
   - Use the Link button to add URLs
5. **Leave Room**: Select another room to automatically leave the current one
6. **Logout**: Click the "Logout" button to exit the application

## Default Chat Rooms

The application comes with three pre-configured rooms:
- **General**: For general discussions
- **Random**: For casual conversations
- **Tech Talk**: For technical discussions

You can create additional rooms as needed.

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with Flexbox and Grid layouts
- **JavaScript (ES6+)**: Object-oriented programming with classes
- **No External Dependencies**: Pure vanilla JavaScript implementation

### Key Classes and Methods

**ChatApp Class**
- `constructor()`: Initialize the application
- `login()`: Handle user authentication
- `logout()`: Clean up and exit
- `joinRoom(roomId)`: Switch to a different room
- `sendMessage()`: Post a message to current room
- `renderMessages()`: Display messages in the UI
- `parseFormatting()`: Convert markdown-style formatting to HTML
- `applyFormatting()`: Apply formatting to selected text

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- WebSocket integration for actual real-time communication
- Backend database to persist chat history
- User profiles and avatars
- Message search and filtering
- Emoji support
- Voice/video calling features
- Dark mode theme
- Message reactions and replies
- File sharing capabilities

## Installation & Deployment

### Local Development
1. Clone the repository
2. Open `index.html` directly in your browser
3. No build process or dependencies required

### Deployment
This application can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## Code Features

### Object-Oriented Design
- Single `ChatApp` class manages all functionality
- Clean separation of concerns
- Event-driven architecture

### Error Handling
- Username validation (minimum 3 characters)
- Duplicate username prevention
- Room name validation
- User feedback via error messages

### State Management
- Tracks current user
- Maintains current room context
- Stores active users list
- Preserves message history

## Notes for Developers

### Extending the Application
To add WebSocket support:
1. Replace the simulated storage with WebSocket event listeners
2. Connect to a backend server
3. Implement real-time message broadcasting
4. Add database persistence

### Styling Customization
Modify `chat.css` to:
- Change color scheme (primary color: #667eea)
- Adjust layout dimensions
- Customize font families
- Modify animation speeds

## Author
Adithyavardhan Nallamaru

## License
MIT License - Feel free to use this project for personal and educational purposes.

## Support
For questions or issues, please open a GitHub issue in this repository.

---

**Version**: 1.0.0  
**Last Updated**: December 2025
