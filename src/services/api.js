const API_BASE_URL = 'https://smart-ai-assistant.onrender.com';

export const apiService = {
  // Summary endpoint
  getSummary: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get summary: ' + error.message);
    }
  },

  // MCQ endpoint
  getMCQs: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get MCQs: ' + error.message);
    }
  },

  // Image to Notes endpoint
  imageToNotes: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-to-notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to process image: ' + error.message);
    }
  },

  // Image to MCQ endpoint
  imageToMCQ: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-to-mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to process image: ' + error.message);
    }
  },

  // Image to CQ endpoint
  imageToCQ: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-to-cq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to process image: ' + error.message);
    }
  },

  // Routine endpoint
  getRoutine: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get routine: ' + error.message);
    }
  },

  // Chapter to MCQ endpoint
  chapterToMCQ: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chapter-to-mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get chapter MCQs: ' + error.message);
    }
  },

  // Chapter to CQ endpoint
  chapterToCQ: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chapter-to-cq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get chapter CQs: ' + error.message);
    }
  },

  // Image to Answer endpoint
  imageToAnswer: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-to-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to process image: ' + error.message);
    }
  },

  // Text to Word Meaning endpoint
  textToWordMeaning: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/text-to-word-meaning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get word meanings: ' + error.message);
    }
  },

  // Text to Answer endpoint
  textToAnswer: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/text-to-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get answer: ' + error.message);
    }
  },

  // Math Solver endpoint
  mathSolver: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/math-solver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to solve math problem: ' + error.message);
    }
  },

  // Image to Math Solver endpoint
  imageToMathSolver: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/image-to-math-solver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to process image: ' + error.message);
    }
  },

  // Chat endpoint
  chat: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to chat: ' + error.message);
    }
  },

  // Essay endpoint
  getEssay: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/essay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to generate essay: ' + error.message);
    }
  },

  // Grammar Check endpoint
  grammarCheck: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/grammar-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to check grammar: ' + error.message);
    }
  },

  // Translation endpoint
  translate: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to translate: ' + error.message);
    }
  },

  // Flashcards endpoint
  getFlashcards: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/flashcards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to generate flashcards: ' + error.message);
    }
  },

  // Homework Help endpoint
  homeworkHelp: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homework-help`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get homework help: ' + error.message);
    }
  },

  // Study Tips endpoint
  getStudyTips: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/study-tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get study tips: ' + error.message);
    }
  },
};