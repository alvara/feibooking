import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'reCAPTCHA token is required.' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await axios.post(verificationURL);
    const body = response.data;

    if (body.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid or expired reCAPTCHA token.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify reCAPTCHA.' });
  }
}
