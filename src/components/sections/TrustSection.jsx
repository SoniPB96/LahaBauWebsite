import React from 'react';

const testimonials = [
  {
    text: "Klare Abstimmung, saubere Umsetzung.",
    author: "Familie K.",
    location: "Paderborn",
    initial: "FK"
  },
  {
    text: "Realistisch eingeschätzt und verständlich erklärt.",
    author: "M. Hoffmann",
    location: "Salzkotten",
    initial: "MH"
  }
];

function TrustSection() {
  return (
    <section className="trust">
      <div className="trust-container">
        <div className="section-header">
          <span className="eyebrow">VERTRAUEN</span>
          <h2>Vertrauen durch klare Kommunikation</h2>
          <p>Saubere Arbeit, realistische Preise und klare Abstimmung.</p>
        </div>

        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.initial}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-location">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
