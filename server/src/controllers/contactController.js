import pool from '../config/db.js';

let memoryContacts = [
  { id: 1, user_id: 2, name: 'Ananya Sharma', phone: '+91 9823456789', relationship: 'Sister', is_primary: true },
  { id: 2, user_id: 2, name: 'Vikram Sharma', phone: '+91 9834567890', relationship: 'Father', is_primary: false },
  { id: 3, user_id: 2, name: 'Dr. Meera Sen', phone: '+91 9845678901', relationship: 'Friend / Mentor', is_primary: false }
];

export const getContacts = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 2;

    if (pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM emergency_contacts WHERE user_id = ? ORDER BY is_primary DESC, created_at DESC', [userId]);
        if (rows.length > 0) return res.status(200).json({ success: true, data: rows });
      } catch (dbErr) {
        console.warn('DB GetContacts fallback:', dbErr.message);
      }
    }

    const contacts = memoryContacts.filter(c => c.user_id === userId);
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 2;
    const { name, phone, relationship, is_primary } = req.body;

    if (!name || !phone || !relationship) {
      return res.status(400).json({ success: false, message: 'Name, phone, and relationship are required.' });
    }

    if (is_primary) {
      memoryContacts.forEach(c => {
        if (c.user_id === userId) c.is_primary = false;
      });
    }

    const newContact = {
      id: memoryContacts.length + 1,
      user_id: userId,
      name,
      phone,
      relationship,
      is_primary: Boolean(is_primary) || memoryContacts.filter(c => c.user_id === userId).length === 0,
      created_at: new Date().toISOString()
    };

    memoryContacts.push(newContact);

    return res.status(201).json({
      success: true,
      message: 'Emergency contact added successfully.',
      data: newContact
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const userId = req.user ? req.user.id : 2;
    const { name, phone, relationship, is_primary } = req.body;

    const contact = memoryContacts.find(c => c.id === contactId);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    if (is_primary) {
      memoryContacts.forEach(c => {
        if (c.user_id === userId) c.is_primary = false;
      });
    }

    if (name) contact.name = name;
    if (phone) contact.phone = phone;
    if (relationship) contact.relationship = relationship;
    if (is_primary !== undefined) contact.is_primary = is_primary;

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const index = memoryContacts.findIndex(c => c.id === contactId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    memoryContacts.splice(index, 1);

    return res.status(200).json({
      success: true,
      message: 'Contact removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};
