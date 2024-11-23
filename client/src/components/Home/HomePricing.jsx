const HomePricing = () => {
  const pricingSectionStyles = "pb-40 rounded-xl w-[900px] text-center";
  const cardContainerStyles = "flex justify-center gap-8  mt-12"; // Ensure all cards are in a single line
  const cardStyles = "bg-[#c1ff72] rounded-lg p-6 shadow-lg w-72";
  const cardHeaderStyles = "text-xl mb-4";
  const priceStyles = "text-2xl mb-2";
  const featureStyles = "mb-2";
  const buttonStyles = "mt-4 bg-black text-white py-2 px-10 rounded-full";
  const headerStyles = "text-3xl uppercase whitespace-nowrap"; // Prevent line break

  return (
    <section className={pricingSectionStyles}>
      {/* Title and Summary */}
      <div className="flex items-center justify-between">
        <h1 className={headerStyles}>Choose Your Plan</h1>
        <div className="w-full h-6 ml-4 bg-black"></div>
      </div>
      <div className={cardContainerStyles}>
        {/* Free Tier Card */}
        <div className={cardStyles}>
          <h3 className={cardHeaderStyles}>Free Tier</h3>
          <p className={priceStyles}>$0 / month</p>
          <p className={featureStyles}>
            Code Reviews: <strong>5 times</strong>
          </p>
          <p className={featureStyles}>
            Ultimate Code Review: <strong>No</strong>
          </p>
          <button className={buttonStyles}>Get Started</button>
        </div>

        {/* Monthly Tier Card */}
        <div className={cardStyles}>
          <h3 className={cardHeaderStyles}>Monthly Plan</h3>
          <p className={priceStyles}>$5 / month</p>
          <p className={featureStyles}>
            Code Reviews: <strong>Unlimited</strong>
          </p>
          <p className={featureStyles}>
            Ultimate Code Review: <strong>Yes</strong>
          </p>
          <button className={buttonStyles}>Subscribe</button>
        </div>

        {/* Yearly Tier Card */}
        <div className={cardStyles}>
          <h3 className={cardHeaderStyles}>Yearly Plan</h3>
          <p className={priceStyles}>$50 / year</p>
          <p className={featureStyles}>
            Code Reviews: <strong>Unlimited</strong>
          </p>
          <p className={featureStyles}>
            Ultimate Code Review: <strong>Yes</strong>
          </p>
          <button className={buttonStyles}>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default HomePricing;
