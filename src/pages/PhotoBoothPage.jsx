// PhotoBoothPage.jsx
// Displays live camera view on the left and four panels for the photos on the right.

import { useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import CameraView from "../components/CameraView.jsx";
import PageLinks from "../components/PageLinks";
import PhonePreview from "../components/PhonePreview.jsx";
import PhotoBoothSettingsForm from "../components/PhotoBoothSettingsForm.jsx";
import PhotoStrips from "../components/PhotoStrip.jsx";
import RetakePhoto from "../components/RetakePhoto.jsx";
import TakePhoto from "../components/TakePhoto.jsx";
import TimerProvider, { TimerOverlay } from "../components/Timer.jsx";
import Blur from "../components/Blur.jsx";
import {
  addPhotoToSlots,
  createPhotoSlots,
  hasEmptySlot,
} from "../utils/photoCounter.js";
import { getTimerSeconds, setTimerSeconds } from "../utils/timerConfig.js";
import { getFilterConfig, PHOTO_FILTERS } from "../utils/photoFilters.js";
import pb4 from "../assets/pb4.png";

export default function PhotoBoothPage() {
  const videoRef = useRef(null);
  const [photos, setPhotos] = useState(() => createPhotoSlots());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(PHOTO_FILTERS[0].id);
  const [timerSeconds, setTimerSecondsState] = useState(getTimerSeconds());
  const [isPhonePreviewVisible, setIsPhonePreviewVisible] = useState(false);

  const handleCapture = (dataUrl) => {
    if (!dataUrl) return;
    setPhotos((prev) => addPhotoToSlots(prev, dataUrl));
    setIsPhonePreviewVisible(true);
  };

  const showLivePreview = () => setIsPhonePreviewVisible(false);
  const showPhotoPreview = () => setIsPhonePreviewVisible(true);

  const canCapture = hasEmptySlot(photos);
  const filterConfig = getFilterConfig(selectedFilter);
  const filterCss = filterConfig.css;
  const overlayClassName = filterConfig.overlayClassName ?? "";
  const filterEffects = filterConfig.effects ?? null;

  const handleTimerChange = (seconds) => {
    setTimerSeconds(seconds);
    setTimerSecondsState(seconds);
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  return (
    <>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center bg-repeat px-4 py-8"
        style={{ backgroundImage: `url(${pb4})` }}
      >
        <Blur className="w-full max-w-6xl text-white" paddingClass="px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
            <TimerProvider>
              <div className="relative flex w-full flex-none overflow-hidden bg-gray-400/80 shadow-lg sm:max-w-[30rem] md:max-w-[40rem] lg:h-120 lg:w-150 lg:max-w-none">
                <div className="relative w-full aspect-[4/3] lg:h-full lg:w-full lg:aspect-auto">
                  <CameraView
                    videoRef={videoRef}
                    filterCss={filterCss}
                    overlayClassName={overlayClassName}
                  />
                  <PhonePreview photos={photos} isVisible={isPhonePreviewVisible} />
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(true)}
                    className="booth-control-button left-4 bg-purple-300/60 hover:bg-purple-200 outline-purple-300"
                  >
                    <SlidersHorizontal className="text-purple-600" />
                  </button>
                  <TakePhoto
                    videoRef={videoRef}
                    onCapture={handleCapture}
                    countdownSeconds={timerSeconds}
                    filterCss={filterCss}
                    filterEffects={filterEffects}
                    disabled={!canCapture}
                    className="left-1/2 -translate-x-1/2"
                    onBeforeCapture={showLivePreview}
                  />
                  <RetakePhoto
                    videoRef={videoRef}
                    photos={photos}
                    setPhotos={setPhotos}
                    countdownSeconds={timerSeconds}
                    filterCss={filterCss}
                    filterEffects={filterEffects}
                    onRetakeStart={showLivePreview}
                    onRetakeComplete={showPhotoPreview}
                  />
                  <TimerOverlay />
                </div>
              </div>
            </TimerProvider>

            <div className="hidden lg:block">
              <PhotoStrips photos={photos} className="h-120 w-40" />
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full flex-col items-center gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-6">
            {/* <PageLinks
              to="/"
              variant="blue"
              className="w-full flex-none px-4 py-2 text-center font-semibold sm:max-w-[30rem] md:max-w-[40rem] lg:w-150 lg:max-w-none"
            >
              Go to Home Page
            </PageLinks> */}

            <PageLinks
              to="/edit"
              variant="red"
              className="w-full flex-none px-4 py-2 text-center font-semibold sm:max-w-[30rem] md:max-w-[40rem] lg:w-[49rem] lg:max-w-none"
              state={{ photos }}
            >
              Go to Photo Editor
            </PageLinks>
          </div>
        </Blur>
      </div>

      <PhotoBoothSettingsForm
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        timerSeconds={timerSeconds}
        onTimerChange={handleTimerChange}
      />
    </>
  );
}
