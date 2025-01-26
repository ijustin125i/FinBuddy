import TourDetailScreen from "./screens/TourDetailScreen";
import TOURS from "./config/TOURS";

export default function App() {
  return <TourDetailScreen tour={TOURS[3]} />;
}