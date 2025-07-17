import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectSocialShare = ({ 
  projectTitle = '',
  projectUrl = '',
  projectDescription = '',
  className = '' 
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const shareUrl = projectUrl || window.location.href;
  const shareTitle = `Check out ${projectTitle} - Lucas Portfolio`;
  const shareText = projectDescription || `Amazing project by Lucas: ${projectTitle}`;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'hover:text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'hover:text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:text-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Reddit',
      icon: 'MessageCircle',
      color: 'hover:text-orange-500',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
    }
  ];

  const handleSocialShare = (platform) => {
    window.open(platform.url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    setIsSharing(true);
    
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className={`project-social-share ${className}`}>
      <div className="bg-surface/30 border border-border rounded-neo p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Share2" size={18} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Share This Project
          </h3>
        </div>

        <div className="space-y-4">
          {/* Native Share (Mobile) */}
          {navigator.share && (
            <Button
              variant="primary"
              onClick={handleNativeShare}
              disabled={isSharing}
              className="w-full justify-center space-x-2 py-3 md:hidden"
              iconName="Share"
              iconPosition="left"
            >
              <span>{isSharing ? 'Sharing...' : 'Share Project'}</span>
            </Button>
          )}

          {/* Social Platform Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                variant="ghost"
                onClick={() => handleSocialShare(platform)}
                className={`flex flex-col items-center space-y-2 p-4 hover:bg-surface/50 transition-colors duration-micro ${platform.color}`}
              >
                <Icon name={platform.icon} size={24} />
                <span className="font-caption text-xs">{platform.name}</span>
              </Button>
            ))}
          </div>

          {/* Copy Link */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-background border border-border rounded-neo px-4 py-2">
              <p className="text-text-secondary font-caption text-sm truncate">
                {shareUrl}
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="px-4 py-2"
              iconName={copySuccess ? "Check" : "Copy"}
            >
              <span className="hidden sm:inline">
                {copySuccess ? 'Copied!' : 'Copy'}
              </span>
            </Button>
          </div>

          {/* Share Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={14} className="text-text-secondary" />
                <span className="font-caption text-xs text-text-secondary">
                  Project Views
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} className="text-error" />
                <span className="font-caption text-xs text-text-secondary">
                  Liked by others
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-glow"></div>
              <span className="font-caption text-xs text-text-secondary">
                Live Project
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-micro"
            >
              <Icon name="Link" size={14} />
              <span className="font-caption text-xs">Copy Link</span>
            </button>
            
            <button
              onClick={() => handleSocialShare(socialPlatforms[0])}
              className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-micro"
            >
              <Icon name="Twitter" size={14} />
              <span className="font-caption text-xs">Tweet</span>
            </button>
            
            <button className="flex items-center space-x-1 text-text-secondary hover:text-error transition-colors duration-micro">
              <Icon name="Heart" size={14} />
              <span className="font-caption text-xs">Like</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSocialShare;