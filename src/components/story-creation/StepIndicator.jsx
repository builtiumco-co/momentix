import React from 'react';
import { Check } from 'lucide-react';
import './StepIndicator.css';

const steps = [
  { id: 1, label: 'Template' },
  { id: 2, label: 'Photos' },
  { id: 3, label: 'Memories' },
  { id: 4, label: 'Preview' },
  { id: 5, label: 'Share' }
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isComplete = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isInactive = step.id > currentStep;
        
        return (
          <React.Fragment key={step.id}>
            <div className={`step-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''} ${isInactive ? 'inactive' : ''}`}>
              <div className="step-dot">
                {isComplete ? <Check size={12} strokeWidth={3} /> : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${step.id < currentStep ? 'complete' : 'inactive'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
