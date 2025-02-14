import { Request, Response } from 'express';
import pool from '../config/db';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const [rows]: any = await pool.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        
        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    try {
        const [existingUser]: any = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
        res.json({ success: true, message: "User registered successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT id, title, description, created_at FROM quizzes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes' });
    }
};

export const createQuiz = async (req: Request, res: Response) => {
    const { title, description, teacher_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO quizzes (title, description, teacher_id, created_at) VALUES (?, ?, ?, NOW())',
            [title, description, teacher_id]
        );
        res.json({ success: true, message: 'Quiz created' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating quiz' });
    }
};

export const updateQuiz = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await pool.query(
            'UPDATE quizzes SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );
        res.json({ success: true, message: 'Quiz updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz' });
    }
};

export const deleteQuiz = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM quizzes WHERE id = ?', [id]);
        res.json({ success: true, message: 'Quiz deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz' });
    }
};
// Add this function to your backend
export const checkQuizTable = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('DESCRIBE quizzes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error checking table structure' });
    }
};