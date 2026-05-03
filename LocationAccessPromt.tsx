import { useLocation } from './LocationContext';

export function LocationAccessPrompt() {
  const { requestPermission, currentLocation } = useLocation();

  return (
    <div className="p-4 bg-yellow-50 rounded-md shadow text-center">
      {!currentLocation ? (
        <>
          <p className="mb-2 text-gray-700">
            📍 Allow access to your live location for safety monitoring.
          </p>
          <button
            onClick={requestPermission}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Allow Location Access
          </button>
        </>
      ) : (
        <p className="text-green-600 font-semibold">
          ✅ Location enabled: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
        </p>
      )}
    </div>
  );
}
