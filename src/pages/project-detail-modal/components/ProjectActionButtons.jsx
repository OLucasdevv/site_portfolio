import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectActionButtons = ({ 
  liveUrl = '', 
  githubUrl = '', 
  downloadUrl = '',
  projectTitle = '',
  onShare = null 
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleLiveDemo = () => {
    if (liveUrl) {
      window.open(liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubView = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${projectTitle.replace(/\s+/g, '_')}_project.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    setIsSharing(true);
    
    const shareData = {
      title: `Check out ${projectTitle}`,
      text: `Take a look at this amazing project: ${projectTitle}`,
      url: liveUrl || window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(liveUrl || window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const hasAnyAction = liveUrl || githubUrl || downloadUrl;

  if (!hasAnyAction) {
    return (
      <div className="project-action-buttons">
        <div className="bg-surface/50 border border-border rounded-neo p-6 text-center">
          <Icon name="ExternalLink" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary font-caption">No actions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-action-buttons">
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center space-x-2">
        <Icon name="Zap" size={20} className="text-primary" />
        <span>Quick Actions</span>
      </h3>

      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {liveUrl && (
            <Button
              variant="primary"
              onClick={handleLiveDemo}
              className="w-full justify-center space-x-2 py-3"
              iconName="ExternalLink"
              iconPosition="right"
            >
              <span>Live Demo</span>
            </Button>
          )}

          {githubUrl && (
            <Button
              variant="outline"
              onClick={handleGithubView}
              className="w-full justify-center space-x-2 py-3"
              iconName="Github"
              iconPosition="left"
            >
              <span>View Code</span>
            </Button>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          {downloadUrl && (
            <Button
              variant="ghost"
              onClick={handleDownload}
              className="w-full justify-center space-x-2 py-2 hover:bg-secondary/10 hover:text-secondary"
              iconName="Download"
              iconPosition="left"
            >
              <span>Download</span>
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={handleShare}
            disabled={isSharing}
            className="w-full justify-center space-x-2 py-2 hover:bg-accent/10 hover:text-accent"
            iconName={copySuccess ? "Check" : "Share2"}
            iconPosition="left"
          >
            <span>
              {isSharing ? 'Sharing...' : copySuccess ? 'Copied!' : 'Share'}
            </span>
          </Button>
        </div>

        {/* Action Stats */}
        <div className="mt-6 p-4 bg-surface/30 border border-border rounded-neo">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className={`w-3 h-3 rounded-full mx-auto ${
                liveUrl ? 'bg-success animate-glow' : 'bg-text-secondary/30'
              }`}></div>
              <p className="font-caption text-xs text-text-secondary">Live Demo</p>
            </div>
            
            <div className="space-y-1">
              <div className={`w-3 h-3 rounded-full mx-auto ${
                githubUrl ? 'bg-primary animate-glow' : 'bg-text-secondary/30'
              }`}></div>
              <p className="font-caption text-xs text-text-secondary">Source Code</p>
            </div>
            
            <div className="space-y-1">
              <div className={`w-3 h-3 rounded-full mx-auto ${
                downloadUrl ? 'bg-secondary animate-glow' : 'bg-text-secondary/30'
              }`}></div>
              <p className="font-caption text-xs text-text-secondary">Download</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center justify-center space-x-4 pt-2">
          {liveUrl && (
            <button
              onClick={handleLiveDemo}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-micro"
            >
              <Icon name="Globe" size={14} />
              <span className="font-caption text-xs">Visit Site</span>
            </button>
          )}
          
          {githubUrl && (
            <button
              onClick={handleGithubView}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-micro"
            >
              <Icon name="Code" size={14} />
              <span className="font-caption text-xs">View Source</span>
            </button>
          )}
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-text-secondary hover:text-accent transition-colors duration-micro"
          >
            <Icon name="Heart" size={14} />
            <span className="font-caption text-xs">Like Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectActionButtons;