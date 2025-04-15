// User roles
const UserRole = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

// User object
const User = {
  id: '',
  username: '',
  email: '',
  role: UserRole.PATIENT, // Default role
  name: '',
  createdAt: '',
  specialization: undefined, // Only for doctors
  availability: undefined, // Only for doctors
};

// Authentication state
const AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Quiz question structure
const QuizQuestion = {
  id: 0,
  question: '',
  options: [],
};

// Quiz result structure
const QuizResult = {
  id: '',
  userId: '',
  answers: [], // Array of { questionId, answer }
  score: 0,
  riskLevel: 'low', // Can be 'low', 'moderate', or 'high'
  createdAt: '',
};

// Chat message structure
const ChatMessage = {
  id: '',
  senderId: '',
  receiverId: '',
  message: '',
  timestamp: '',
  read: false,
};

// Conversation structure
const Conversation = {
  id: '',
  participants: [], // Array of participant IDs
  lastMessage: ChatMessage,
  unreadCount: 0,
};

module.exports = {
  UserRole,
  User,
  AuthState,
  QuizQuestion,
  QuizResult,
  ChatMessage,
  Conversation,
};
