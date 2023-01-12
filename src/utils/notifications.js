import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addedFavoriteEvent = () =>
  toast.success(`You have added an event to your favorites`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const removedFavoriteEvent = () =>
  toast.error(`You have removed an event from your favorites`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const duplicatedFavoriteEvent = (eventTitle) =>
  toast.warn(`The event: ${eventTitle} is already on your favorites`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const addedNewEvent = () =>
  toast.info(`You have created a new meetup`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
