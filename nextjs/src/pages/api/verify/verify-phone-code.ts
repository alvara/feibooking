import { twilioClient } from '@/data/twilio';
import { convertPhoneNumberToNumber } from '@/helpers/stringHelpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, verificationCode } = req.body;
    const verifySID = process.env.TWILIO_VERIFY_SID; // SID for verification service (not Account SID)

    const validPhoneNumber = '+81' + convertPhoneNumberToNumber(phoneNumber);

    console.log('verifying phone number: ', validPhoneNumber);
    console.log('verification code: ', verificationCode);

    if (!validPhoneNumber || !verificationCode || !verifySID) {
      return res.status(400).json({ error: 'Phone number and verification code are required' });
    }

    try {
      const verificationCheck = await twilioClient.verify.v2
        .services(verifySID)
        .verificationChecks.create({
          to: validPhoneNumber,
          code: verificationCode,
        });

      console.log(verificationCheck);

      // Check if the verification was successful
      if (verificationCheck.status === 'approved') {
        res.status(200).json({ message: 'Verification successful' });
      } else {
        // If verification status is not 'approved', consider it failed
        res.status(400).json({ error: 'Invalid verification code' });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ error: error.message });
      } else {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
