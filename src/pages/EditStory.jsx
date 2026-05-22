import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchStory } from '../lib/api';
import StepIndicator from '../components/story-creation/StepIndicator';
import Step2Photos from '../components/story-creation/Step2Photos';
import Step3Memories from '../components/story-creation/Step3Memories';
import Step4Preview from '../components/story-creation/Step4Preview';
import Step5Share from '../components/story-creation/Step5Share';
import { ArrowLeft } from 'lucide-react';
import './EditStory.css';

export default function EditStory() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const step = parseInt(searchParams.get('step') || '2', 10);

  useEffect(() => {
    async function loadStory() {
      try {
        const data = await fetchStory(id);
        if (data.user_id !== user.id) {
          navigate('/dashboard');
          return;
        }
        setStory(data);
      } catch (error) {
        console.error(error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    if (user && id) loadStory();
  }, [id, user, navigate]);

  const goToStep = (newStep) => {
    setSearchParams({ step: newStep.toString() });
  };

  if (loading) return <div className="loading-page">Loading story...</div>;
  if (!story) return null;

  return (
    <div className="edit-story-page fade-in">
      <header className="edit-topbar">
        <button className="back-btn" onClick={() => navigate(step === 2 ? '/create' : `?step=${step - 1}`)}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="step-indicator-wrapper">
          <StepIndicator currentStep={step} />
        </div>
        <button className="tertiary-btn small" onClick={() => navigate('/dashboard')}>
          Save draft
        </button>
      </header>

        <main className="edit-main">
          {step === 2 && <Step3Memories story={story} onNext={() => goToStep(3)} setStory={setStory} />}
          {step === 3 && <Step2Photos story={story} onNext={() => goToStep(4)} setStory={setStory} />}
          {step === 4 && <Step4Preview story={story} onNext={() => goToStep(5)} setStory={setStory} />}
          {step === 5 && <Step5Share story={story} />}
        </main>
      </div>
  );
}
