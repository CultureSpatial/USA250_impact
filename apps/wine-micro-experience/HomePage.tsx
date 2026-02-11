import React from 'react';
import './design-tokens.css'; // Assuming the tokens are imported as CSS variables

const HomePage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--warm-sand)', fontFamily: 'var(--font-body)' }}>
      <header style={{ padding: 'var(--space-6)', backgroundColor: 'var(--studio-blue)', color: '#FFF' }}>
        <h1 style={{ fontSize: 'var(--h1)', lineHeight: 'var(--line-height)', fontWeight: 700 }}>
          Wine Micro-Experience
        </h1>
      </header>
      
      <main style={{ padding: 'var(--space-6)' }}>
        <section style={{ marginBottom: 'var(--space-6)' }}>
          <button
            style={{
              backgroundColor: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              padding: 'var(--btn-padding-x)',
              height: 'var(--btn-height-md)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Primary Action
          </button>

          <button
            style={{
              backgroundColor: 'var(--btn-secondary-bg)',
              color: 'var(--btn-secondary-text)',
              padding: 'var(--btn-padding-x)',
              height: 'var(--btn-height-md)',
              border: `var(--border-width) solid var(--btn-secondary-border)`
            }}
          >
            Secondary Action
          </button>
        </section>

        <section>
          <div
            style={{
              backgroundColor: 'var(--card-bg)',
              boxShadow: 'var(--card-shadow)',
              borderRadius: 'var(--card-radius)',
              padding: 'var(--card-padding)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h2 style={{ fontSize: 'var(--h2)', fontWeight: 600 }}>Card 1</h2>
            <p style={{ fontSize: 'var(--body)', color: 'var(--slate)' }}>
              Example content for the first card.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--card-bg)',
              boxShadow: 'var(--card-shadow)',
              borderRadius: 'var(--card-radius)',
              padding: 'var(--card-padding)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h2 style={{ fontSize: 'var(--h2)', fontWeight: 600 }}>Card 2</h2>
            <p style={{ fontSize: 'var(--body)', color: 'var(--slate)' }}>
              Example content for the second card.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;