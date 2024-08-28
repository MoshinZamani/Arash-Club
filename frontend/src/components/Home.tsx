import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";

const Home = () => (
  <div className="bg-gray-200">
    <div className="flex overflow-x-auto py-4 space-x-4">
      <img src={image1} alt="Description of image 1" className="min-w-max" />
      <img src={image2} alt="Description of image 2" className="min-w-max" />
      <img src={image3} alt="Description of image 3" className="min-w-max" />
      <img src={image4} alt="Description of image 4" className="min-w-max" />
    </div>
  </div>
);

export default Home;
