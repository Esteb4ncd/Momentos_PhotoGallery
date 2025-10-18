// Authentication utility functions for user management

const USERS_STORAGE_KEY = 'momentosUsers';
const CURRENT_USER_KEY = 'momentosCurrentUser';

// Get all users from localStorage
export const getAllUsers = () => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save a new user account
export const saveUser = (userData) => {
  const users = getAllUsers();
  const newUser = {
    id: Date.now().toString(),
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password, // In production, this should be hashed
    joinedDate: new Date().toISOString(),
    bio: '',
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return newUser;
};

// Check if email already exists
export const emailExists = (email) => {
  const users = getAllUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Find user by email and password
export const findUser = (email, password) => {
  const users = getAllUsers();
  return users.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
};

// Set current logged-in user
export const setCurrentUser = (user) => {
  // Don't store password in current user
  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Update user bio
export const updateUserBio = (userId, newBio) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].bio = newBio;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.bio = newBio;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    }
    
    return users[userIndex];
  }
  
  return null;
};

