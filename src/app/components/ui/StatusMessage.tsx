import { FC } from 'react';

interface StatusMessageProps {
  status: string;
  signature?: string;
  error?: string;
}

export const StatusMessage: FC<StatusMessageProps> = ({
  status,
  signature,
  error
}) => {
  return (
    <div className="mt-4 p-3 rounded bg-gray-800 text-white">
      <p className="font-bold mb-2">Transaction Status: {status}</p>
      {signature && (
        <p className="text-sm break-all">
          Signature: {signature}
        </p>
      )}
      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};