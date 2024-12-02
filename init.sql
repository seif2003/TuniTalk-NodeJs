-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_one UUID REFERENCES users(id),
    participant_two UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id),
    sender_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, contact_id)
);


-- Create first user
INSERT INTO users (id,username, email, password) VALUES ('dc0b8612-b354-494d-bc8c-c5103625dd8e','user1', 'user1@exemple.com', '$2b$10$U2zc8heT6Tu0OcPGSwC6h.vNVcFPaO0247yM3ETlROaIZ6dhvlWQm');

-- Create second user
INSERT INTO users (id,username, email, password) VALUES ('563f5a40-d29b-43d7-a5fd-d8aeda885c73','user2', 'user2@exemple.com', '$2b$10$U2zc8heT6Tu0OcPGSwC6h.vNVcFPaO0247yM3ETlROaIZ6dhvlWQm');

-- Create a conversation between two users
INSERT INTO conversations (id,participant_one, participant_two) VALUES ('e3eb8f0e-9430-4491-92d9-65b1fdb532b8','dc0b8612-b354-494d-bc8c-c5103625dd8e', '563f5a40-d29b-43d7-a5fd-d8aeda885c73');

-- Create a message 1
INSERT INTO messages (conversation_id, sender_id, content) VALUES ('e3eb8f0e-9430-4491-92d9-65b1fdb532b8', '563f5a40-d29b-43d7-a5fd-d8aeda885c73', 'Hello, how are you?');

-- Create a message 2
INSERT INTO messages (conversation_id, sender_id, content) VALUES ('e3eb8f0e-9430-4491-92d9-65b1fdb532b8', 'dc0b8612-b354-494d-bc8c-c5103625dd8e', 'I am fine, thank you!');

-- Create a message 3
INSERT INTO messages (conversation_id, sender_id, content) VALUES ('e3eb8f0e-9430-4491-92d9-65b1fdb532b8', '563f5a40-d29b-43d7-a5fd-d8aeda885c73', 'What are you doing?');
