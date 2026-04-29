import { toast } from 'react-hot-toast';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export const showToast = {
  success: (message, urdu) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-primary`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-dark-gray">{message}</p>
              {urdu && <p className="mt-1 urdu text-lg text-primary">{urdu}</p>}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 3000 });
  },
  error: (message, urdu) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-red-600`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-dark-gray">{message}</p>
              {urdu && <p className="mt-1 urdu text-lg text-red-600">{urdu}</p>}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 3000 });
  }
};
