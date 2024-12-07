import { Logo } from "./NavBar";

const VideoDemo = () => {
  return (
    <section id="feature">
      <div className="flex flex-col items-center mb-10">
        <h2 className="flex items-center text-4xl font-medium gap-3 mb-3">
          Checkout <Logo />
        </h2>
        <p className="text-gray-600 font-medium text-xl">
          Explore our amazing feature
        </p>
      </div>
      <main>
        <video
          className="object-cover w-full rounded-[15px] md:rounded-[40px]"
          src="https://res.cloudinary.com/doxshmcth/video/upload/v1720478158/abdulazeemportfolio/MTE_2.0_VIDEO_ttqtia.mp4"
          autoPlay
          loop
          muted
        ></video>
      </main>
    </section>
  );
};

export default VideoDemo;
