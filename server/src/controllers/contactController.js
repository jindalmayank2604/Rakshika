import { query } from '../config/db.js';

export const getContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await query(
      'SELECT * FROM emergency_contacts WHERE user_id = $1 ORDER BY is_primary DESC, created_at DESC',
      [userId]
    );

    return res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, phone, relationship, is_primary } = req.body;

    if (!name || !phone || !relationship) {
      return res.status(400).json({ success: false, message: 'Name, phone, and relationship are required.' });
    }

    // If setting as primary, demote others
    if (is_primary) {
      await query('UPDATE emergency_contacts SET is_primary = FALSE WHERE user_id = $1', [userId]);
    }

    const result = await query(
      `INSERT INTO emergency_contacts (user_id, name, phone, relationship, is_primary)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, name.trim(), phone.trim(), relationship.trim(), Boolean(is_primary)]
    );

    return res.status(201).json({
      success: true,
      message: 'Emergency contact added successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { name, phone, relationship, is_primary } = req.body;

    if (is_primary) {
      await query('UPDATE emergency_contacts SET is_primary = FALSE WHERE user_id = $1', [userId]);
    }

    const result = await query(
      `UPDATE emergency_contacts 
       SET name = COALESCE($1, name),
           phone = COALESCE($2, phone),
           relationship = COALESCE($3, relationship),
           is_primary = COALESCE($4, is_primary)
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [name, phone, relationship, is_primary !== undefined ? Boolean(is_primary) : null, contactId, userId]
    );

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found or unauthorized.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact updated successfully.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const result = await query('DELETE FROM emergency_contacts WHERE id = $1 AND user_id = $2 RETURNING id', [contactId, userId]);

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Contact not found or unauthorized.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};

