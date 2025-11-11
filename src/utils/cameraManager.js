let currentStream = null;
let pendingRequest = null;

async function requestStream(constraints) {
  if (!navigator?.mediaDevices?.getUserMedia) {
    throw new Error("Camera is not supported in this browser.");
  }

  currentStream = await navigator.mediaDevices.getUserMedia(constraints);
  return currentStream;
}

export async function acquireCameraStream(constraints = { video: true }) {
  if (currentStream) return currentStream;
  if (!pendingRequest) {
    pendingRequest = requestStream(constraints).finally(() => {
      pendingRequest = null;
    });
  }
  return pendingRequest;
}

export function stopCameraStream() {
  if (pendingRequest) {
    pendingRequest = null;
  }
  if (!currentStream) return;
  currentStream.getTracks().forEach((track) => track.stop());
  currentStream = null;
}

export function getActiveCameraStream() {
  return currentStream;
}
