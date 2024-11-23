import { useState } from "react";
// import contact from "../../assets/con.jpg";

const HomeCustomerSupport = () => {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Your query has been submitted. We will get back to you soon!");
    setEmail("");
    setQuery("");
  };

  const sectionStyles = "mb-40 w-[900px] text-center";
  const formContainerStyles = "flex items-stretch justify-between mt-12 gap-8"; // ensures both image and form stretch equally
  const iconContainerStyles = "w-1/3 flex items-stretch"; // stretches the image container
  const formStyles =
    "w-2/3 p-6 rounded-lg shadow-md bg-[#c1ff72] flex flex-col justify-center";
  const inputStyles = "w-full px-6 py-2 mb-4 rounded";
  const buttonStyles = "bg-black text-white w-full py-2 px-6 rounded-full";
  const messageStyles = "mt-4";
  const headerStyles = "text-3xl uppercase whitespace-nowrap";
  const imageStyles = "w-full h-auto object-cover rounded-xl"; // image height auto-adjusts based on form height

  return (
    <section className={sectionStyles}>
      {/* Title and Summary */}
      <div className="flex items-center justify-between">
        <h1 className={headerStyles}>Customer Support</h1>
        <div className="w-full h-6 ml-4 bg-black"></div>
      </div>

      <div className={formContainerStyles}>
        {/* Left Side: Image */}
        <div className={iconContainerStyles}>
          {/* <img src={contact} alt="Customer Support" className={imageStyles} /> */}
        </div>

        {/* Right Side: Form */}
        <form className={formStyles} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputStyles}
          />
          <textarea
            placeholder="Your Query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            rows="5"
            className={inputStyles}
          />
          <button type="submit" className={buttonStyles}>
            Send
          </button>
          {message && <p className={messageStyles}>{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default HomeCustomerSupport;
