import {VIDEOS_SCREEN} from '../constants/screens';
import Icon from '../assets/icons/Video.svg';
import IconActive from '../assets/icons/Video-filled.svg';
import VideosScreen from '../screens/Videos';

const videosRouter = {
  Icon,
  IconActive,
  name: VIDEOS_SCREEN,
  component: VideosScreen,
  options: {
    title: VIDEOS_SCREEN,
    headerShown: false,
  },
};

export default videosRouter;
