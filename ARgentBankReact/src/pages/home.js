import React from "react";
import FeatureCard from "../components/featureCard"; 
import chatIcon from "../img/icon-chat.png";
import moneyIcon from "../img/icon-money.png";
import securityIcon from "../img/icon-security.png";

const Home = () => {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureCard icon={chatIcon} title="You are our #1 priority">
          Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes.
        </FeatureCard>
        <FeatureCard icon={moneyIcon} title="More savings means higher rates">
          The more you save with us, the higher your interest rate will be!
        </FeatureCard>
        <FeatureCard icon={securityIcon} title="Security you can trust">
          We use top of the line encryption to make sure your data and money
          is always safe.
        </FeatureCard>
      </section>
    </main>
  );
};

export default Home;
