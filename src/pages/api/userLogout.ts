import { NextApiRequest, NextApiResponse } from 'next';

export default async function userLogout(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax');

        res.status(200).json({
            message: 'Logged out successfully',
            error: false,
            success: true,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
}
