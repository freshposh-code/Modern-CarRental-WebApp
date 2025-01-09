import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/server/MongooseConnect';
import userModel from '@/server/models/userModel';

type Data = {
  message: string;
  success: boolean;
  error: boolean;
};

const resetPasswordController = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method Not Allowed',
      success: false,
      error: true,
    });
  }

  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Invalid token or password',
        success: false,
        error: true,
      });
    }

    await connectDB();

    // Find user by token and ensure the token is not expired
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired token',
        success: false,
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: 'Password has been reset successfully',
      success: true,
      error: false,
    });
  } catch (err: any) {
    console.error('Error resetting password:', err);
    return res.status(500).json({
      message: err.message || 'Internal Server Error',
      success: false,
      error: true,
    });
  }
};

export default resetPasswordController;
