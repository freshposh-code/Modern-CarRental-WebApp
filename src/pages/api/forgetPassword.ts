import { NextApiRequest, NextApiResponse } from 'next';
import userModel from '@/server/models/userModel';
import transporter from '@/server/nodemailer';
import crypto from 'crypto'

const forgotPasswordController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed', error: true, success: false });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email', error: true, success: false });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found', error: true, success: false });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/resetPassword?token=${token}`;

    const mailOptions = {
      from: process.env.NEXT_APP_EMAIL_AUTH,
      to: email,
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset. You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error: any | null, info: any) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: true, success: false });
      }

      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Reset password email sent', success: true, error: false });
    });
  } catch (err: any) {
    console.error('Error in forgotPasswordController:', err);
    return res.status(500).json({ message: err.message || 'Internal Server Error', error: true, success: false });
  }
};

export default forgotPasswordController;
