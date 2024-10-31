import { setLoading } from '@/Redux/features/LoadingSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const DeleteModal = ({onClose, callFunc, Data}: {onClose: () => void; callFunc: () => void; Data: string}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      dispatch(setLoading(true));

      console.log(`Deleting item with ID: ${Data}`);
      const deleteVault = await fetch(`/api/deleteVaultCars/${Data}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const response  = await deleteVault.json();
      dispatch(setLoading(false));
      if(response.success) {
        callFunc();
        toast.success(response.message)
        onClose();
      }
      if(response.error) {
        toast.error(response.message)
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("An error occurred while deleting.");
      console.error("Delete error:", error);
    }
  }
  return (
    <section className='flex justify-center items-center min-h-screen absolute inset-0 blur-effect-theme'>
       <div className='bg-white-200 dark:bg-black-200 rounded-lg p-1 w-full max-w-96'>
        <h1 className='font-bold md:text-xl text-lg text-center my-2'>Are you sure you want to delete?</h1>

        <div className='flex justify-between cursor-pointer my-2 md:px-3 px-6'> 
            <p onClick={onClose} className='bg-blue-700 text-white rounded-full px-4 py-1'>Cancel</p>
            <p className='bg-red-600 text-white rounded-full px-4 py-1' onClick={handleDelete}>Delete</p>
        </div>
       </div>
    </section>
  )
}

export default DeleteModal;