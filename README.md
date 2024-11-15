# Real-Time Location Sharing App

This application allows users to share their real-time location with others on a map, powered by Node.js, Socket.io, and Leaflet. When a user grants permission for geolocation, their coordinates are continuously tracked and shared with other connected users. Users can see each other’s locations and the accuracy range on an interactive map.

## Features
- Real-time location tracking
- Visualization of user accuracy range on the map
- Dynamic map view updates as users move
- Automatic removal of user markers upon disconnection

## Technologies Used
- **Node.js**: Server runtime environment
- **Express**: Web framework for handling HTTP requests
- **Socket.io**: Enables real-time, bidirectional communication between client and server
- **Leaflet**: Open-source JavaScript library for mobile-friendly interactive maps
- **OpenStreetMap**: Provides map tile layers

## Getting Started

### Prerequisites
Ensure that you have **Node.js** installed.

### Installation
1. Clone the repository:
```bash
   git clone https://github.com/yourusername/realtime-location-sharing.git
   cd realtime-location-sharing
```
# Installation and Running Instructions

## Install Dependencies
To install the necessary dependencies, run the following command in your terminal:
```bash
   npm install

```

## Running the Application
- To start the server, use the command:
```bash
npm start
```
## After starting the server, open a web browser and navigate to:
``` bash
   http://localhost:3000
```
## Folder Structure

- **public/**: Contains client-side JavaScript and assets.
- **views/**: Contains `index.ejs`, the main HTML template rendered by Express.
- **server.js**: Main server file for real-time communication and geolocation data handling.

 ## How It Works
 ### Backend
- The server listens for incoming socket connections.
- When a user shares their location, the server broadcasts it to all connected clients.
- If a user disconnects, a notification is sent to remove the disconnected user's marker.
### Frontend
- The client uses the Geolocation API to continuously watch the user’s position.
- Location updates are emitted via Socket.io and shown on an interactive Leaflet map.
- Each location update includes an accuracy circle, representing the possible range of location.
## Code Overview
- Server (server.js)
- Sets up an HTTP server and Socket.io for real-time communication.
- Handles socket events:
- send-location: Broadcasts the user’s location.
- disconnect: Notifies other users to remove the disconnected user's marker.
