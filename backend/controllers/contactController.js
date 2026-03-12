import Contact from '../models/Contact.js';

// @desc    Submit a contact form
// @route   POST /api/contacts
// @access  Public
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message, type } = req.body;
        const contact = await Contact.create({
            name, email, subject, message, type,
            ip: req.ip
        });
        res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin: Get all contact submissions
// @route   GET /api/contacts/admin
// @access  Private/Admin
export const getContacts = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = status ? { status } : {};
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [contacts, total] = await Promise.all([
            Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Contact.countDocuments(query)
        ]);
        res.json({ success: true, total, contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Admin: Update contact status
// @route   PUT /api/contacts/admin/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
        res.json({ success: true, contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
