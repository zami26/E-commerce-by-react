import React from "react";
import "../style/HealthSection.css";

const HealthSection = () => {
  return (
    <section className="health-section">
      <div className="health-container">

        {/* Image */}
        <div className="health-image">
          <img
            src="side-img.jpg" // change this to your image path
            alt="Health and Sports"
          />
        </div>

        {/* Text */}
        <div className="health-text">
          <h2>Stay Fit, Stay Active</h2>
          <p>
            Regular sports and physical activities are essential for keeping your 
            body strong, energetic, and healthy. They improve heart function and 
            boost mental clarity.
          </p>
          <p>
            Wearing the right sportswear also matters—it ensures comfort, better 
            movement, and confidence during workouts.
          </p>
          <p>
            Whether you're running, training, or playing any sport, the right 
            outfit and active lifestyle help you perform better and feel better.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HealthSection;
