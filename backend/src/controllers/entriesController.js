import { Entry } from '../models/Entry.js';

export const createEntry = (req, res) => {
  try {
    const userId = req.user.id;
    const entryData = req.body;

    const required = ['sleep', 'workHours', 'stress', 'deadlines', 'mood', 'score'];
    for (const field of required) {
      if (entryData[field] === undefined) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    if (entryData.exercise === undefined) {
      return res.status(400).json({ error: 'exercise is required' });
    }

    const entry = Entry.create(userId, entryData);
    res.status(201).json({ message: 'Entry created', entry });
  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({ error: 'Server error creating entry' });
  }
};

export const getEntries = (req, res) => {
  try {
    const userId = req.user.id;
    const entries = Entry.findByUserId(userId);
    res.json({ entries });
  } catch (error) {
    console.error('Get entries error:', error);
    res.status(500).json({ error: 'Server error fetching entries' });
  }
};

export const deleteEntry = (req, res) => {
  try {
    const userId = req.user.id;
    const entryId = req.params.id;

    const deleted = Entry.delete(entryId, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted', entry: deleted });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ error: 'Server error deleting entry' });
  }
};

export const getStats = (req, res) => {
  try {
    const userId = req.user.id;
    const stats = Entry.getStats(userId);
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
};