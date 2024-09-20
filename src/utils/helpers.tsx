import { toast } from 'react-toastify';

const toastOptions = {
    style: {
        background: '#868686',
        color: '#fff',
        borderRadius: '22px',
        fontSize: '16px',
    },
};

const makeToast = {
    success: (text: string) => toast.success(text, toastOptions),
    error: (text: string) => toast.error(text, toastOptions),
    warning: (text: string) => toast.warning(text, toastOptions),
};

export default makeToast;