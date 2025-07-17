import React from 'react';

const ProjectSkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-neo overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-background/50" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title and Icon */}
        <div className="flex items-start justify-between">
          <div className="h-6 bg-background/50 rounded-neo w-3/4" />
          <div className="w-5 h-5 bg-background/50 rounded-neo" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-background/50 rounded-neo w-full" />
          <div className="h-4 bg-background/50 rounded-neo w-5/6" />
          <div className="h-4 bg-background/50 rounded-neo w-4/6" />
        </div>
        
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-background/50 rounded-neo w-16" />
          <div className="h-6 bg-background/50 rounded-neo w-20" />
          <div className="h-6 bg-background/50 rounded-neo w-14" />
          <div className="h-6 bg-background/50 rounded-neo w-12" />
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 bg-background/50 rounded-neo w-20" />
            <div className="h-4 bg-background/50 rounded-neo w-16" />
          </div>
          <div className="h-4 bg-background/50 rounded-neo w-16" />
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeletonCard;