import React from 'react';
import Navbar from '../components/Navbar';
import './Legal.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="legal-container fade-in">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p>Last Updated: May 18, 2026</p>
        </div>
        <div className="legal-content">
          <p>At Momentix, we respect your privacy and are committed to protecting the personal data and precious memories you share with us. This Privacy Policy explains how we collect, use, and safeguard your information.</p>

          <h2>1. Information We Collect</h2>
          <p><strong>Account Information:</strong> Email address, full name, and authentication tokens provided when you sign up directly or via Google OAuth.</p>
          <p><strong>User-Provided Content:</strong> Photos, occasion choices, notes, and specific memories you type into the multi-step story builder.</p>
          <p><strong>Technical Data:</strong> IP address, browser type, device identifiers, and basic usage analytics gathered during your session to ensure platform stability and optimize performance.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your data strictly to deliver the core functionality of Momentix:</p>
          <ul>
            <li>To authenticate your identity and secure your dashboard.</li>
            <li>To process your photos and text prompts using secure AI endpoints to write your personalized stories.</li>
            <li>To generate unique, secure public share links when requested by you.</li>
            <li>To monitor application performance, track system errors, and prevent fraudulent use.</li>
          </ul>

          <h2>3. Data Sharing and Trusted Partners</h2>
          <p>We do not sell your personal data or memories to third parties or advertising networks. To run the Service, we share relevant portions of your data with the following trusted infrastructure partners:</p>
          <ul>
            <li><strong>Cloud Hosting & Database Providers:</strong> For hosting the application, managing user authentication, and providing secure cloud storage for your photos.</li>
            <li><strong>AI Processing Partners:</strong> Text prompts and underlying contextual data are securely transmitted to Google's API endpoints to generate narratives. Note: Data passed to the commercial AI API via Momentix is subject to enterprise privacy commitments and is not used to train public AI models.</li>
          </ul>

          <h2>4. Data Control and Retention</h2>
          <p><strong>Deletion:</strong> You have the right to delete your stories at any time via your user dashboard. Deleting a story permanently removes its reference from our databases and deletes the associated photos from our cloud storage.</p>
          <p><strong>Account Termination:</strong> You can request the complete erasure of your user profile and all associated data by contacting our team.</p>

          <h2>5. Security Measures</h2>
          <p>We implement standard industry security practices, including strict database-level access controls, SSL/TLS encryption for all data in transit, and secure token-based session management. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

          <h2>6. Children's Privacy</h2>
          <p>Momentix does not knowingly collect or solicit personal information from anyone under the age of 13. If we learn that we have inadvertently collected personal information from a child under 13 without verifiable parental consent, we will delete that information as quickly as possible.</p>

          <h2>7. Contact Us</h2>
          <p>For any questions regarding this Privacy Policy or your data rights, please contact us at: info@createmomentix.com</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
