import { twilioClient } from '@/data/twilio';
import { convertPhoneNumberToNumber } from '@/helpers/stringHelpers';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { twilioClient } from '@/init/twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    const validPhoneNumber = '+81' + convertPhoneNumberToNumber(phoneNumber);
    console.log('requesting phone code for: ', validPhoneNumber);

    if (!validPhoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
      const accountSID = process.env.TWILIO_ACCOUNT_SID;
      const verifySID = process.env.TWILIO_VERIFY_SID; // SID for verification service (not Account SID)
      const authToken = process.env.TWILIO_AUTH_TOKEN;

      if (!accountSID || !authToken || !verifySID) throw new Error('Twilio credentials not found');

      console.log('twilio client ready for verification...');
      const verification = await twilioClient.verify.v2
        .services(verifySID)
        .verifications.create({
          to: validPhoneNumber,
          channel: 'sms',
        })
        .then((verification) => console.log(verification.status))
        .then(() => {
          const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
          });
          readline.question('Please enter the OTP:', (otpCode: string) => {
            twilioClient.verify.v2
              .services(verifySID)
              .verificationChecks.create({
                to: validPhoneNumber,
                code: otpCode,
              })
              .then((verification_check) => console.log(verification_check.status))
              .then(() => readline.close());
          });
        });

      console.log('twilio verification:', verification);

      // console.log('twilio verification:', verification);
      res.status(200).json({ message: 'Verification sent' });
    } catch (error) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        console.error(JSON.stringify(error));
        res.status(500).json({ error: error.message });
      } else {
        // Handle cases where error is not an Error instance
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
