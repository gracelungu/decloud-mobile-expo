import { PHOTOS_SCREEN } from "../constants/screens";
import PhotosScreen from "../screens/Photos";
import Icon from "../assets/icons/Image Gallery.svg";
import IconActive from "../assets/icons/Image Gallery-filled.svg";

const photosRouter = {
  Icon,
  IconActive,
  name: PHOTOS_SCREEN,
  component: PhotosScreen,
  options: {
    title: PHOTOS_SCREEN,
    headerShown: false,
  },
};

export default photosRouter;
