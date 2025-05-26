import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  MoreVertical,
  ExternalLink,
  GitBranch,
  Clock,
  AlertTriangle,
  Code2,
  MessageSquare,
  GitPullRequest,
  Eye,
  User,
  GitCommit,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { useReviewLogs } from '@/shared/api/queries/useReviewLogs';
import { ReviewCodeStatus } from '@/gql/graphql';

export interface ReviewCodeLog {
  id: number;
  pull_request_id: string;
  pull_request_url: string;
  pull_request_title: string;
  status: ReviewCodeStatus;
  commit_author_name: string;
  commit_author_avatar: string;
  commit_message: string;
  commit_url: string;
  review_comment: string;
  created_at: string;
}
interface ReviewCodeItemProps {
  reviewLog: ReviewCodeLog;
  renderSourceIcon: () => React.ReactNode;
}

interface ReviewCodeDetailProps {
  reviewLog: ReviewCodeLog;
  onClose: () => void;
  renderSourceIcon: () => React.ReactNode;
}

interface ReviewCodeSectionProps {
  serviceId: number;
}

// Helper functions
const formatReviewTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

const formatDateTimeStandard = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

// Parse review comments từ string JSON
const parseReviewComments = (commentString: string) => {
  try {
    const parsed = JSON.parse(commentString);
    // Đảm bảo trả về array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to parse review comments:', error);
    return [];
  }
};

// Type cho review comment
interface ReviewComment {
  body: string;
  path: string;
  line?: number;
}

// Status configurations
const getStatusConfig = (status: ReviewCodeStatus) => {
  switch (status) {
    case ReviewCodeStatus.Reviewing:
      return {
        icon: (
          <div className="h-5 w-5 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
        ),
        label: 'REVIEWING',
        badgeClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        backgroundClasses: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/30',
        buttonClasses:
          'border-blue-200 text-blue-700 bg-blue-100 hover:bg-blue-200 hover:text-blue-800 dark:border-blue-800/50 dark:text-blue-400 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 dark:hover:text-blue-300',
      };
    case ReviewCodeStatus.NoComment:
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
        label: 'NO ISSUES',
        badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        backgroundClasses:
          'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30',
        buttonClasses:
          'border-green-200 text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-800 dark:border-green-800/50 dark:text-green-400 dark:bg-green-950/50 dark:hover:bg-green-900/50 dark:hover:text-green-300',
      };
    case ReviewCodeStatus.HasIssues:
      return {
        icon: (
          <div className="h-5 w-5 text-red-600 dark:text-red-500 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4" />
          </div>
        ),
        label: 'HAS ISSUES',
        badgeClasses: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        backgroundClasses: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/30',
        buttonClasses:
          'border-red-200 text-red-700 bg-red-100 hover:bg-red-200 hover:text-red-800 dark:border-red-800/50 dark:text-red-400 dark:bg-red-950/50 dark:hover:bg-red-900/50 dark:hover:text-red-300',
      };
    default:
      return {
        icon: <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-500" />,
        label: 'UNKNOWN',
        badgeClasses: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
        backgroundClasses: 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800/30',
        buttonClasses:
          'border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-800 dark:border-gray-800/50 dark:text-gray-400 dark:bg-gray-950/50 dark:hover:bg-gray-900/50 dark:hover:text-gray-300',
      };
  }
};

const ReviewCodeDetail = ({ reviewLog, onClose, renderSourceIcon }: ReviewCodeDetailProps) => {
  const config = getStatusConfig(reviewLog.status);

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={panelVariants}
      className="fixed right-0 top-0 bottom-0 w-2/3 z-50 pointer-events-auto"
      style={{ marginTop: '80px' }}
    >
      <motion.div
        className="flex flex-col w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg"
        style={{ zIndex: 60 }}
      >
        <div className="px-6 md:px-12 pt-8 md:pt-12 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex items-center space-x-4">
              {renderSourceIcon()}
              <h1 className="text-[28px] font-semibold">
                {reviewLog.pull_request_title}
                <span className="text-lg font-normal text-gray-500 ml-2">
                  / PR #{reviewLog.pull_request_id}
                </span>
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Badge
              className={`px-3 py-1.5 text-sm font-semibold inline-flex items-center shadow-sm ${config.badgeClasses}`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  reviewLog.status === ReviewCodeStatus.Reviewing
                    ? 'bg-blue-500 animate-pulse'
                    : reviewLog.status === ReviewCodeStatus.NoComment
                      ? 'bg-green-500'
                      : 'bg-red-500'
                }`}
              />
              {config.label}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-sm font-medium border-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950 transition-all duration-200"
              onClick={() => window.open(reviewLog.pull_request_url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Pull Request
            </Button>
            <div className="text-sm text-gray-500">
              Reviewed {formatDateTimeStandard(reviewLog.created_at)}
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-6">
          <div className="space-y-6">
            {/* Review Overview */}
            <div className={`border rounded-lg p-6 shadow-sm ${config.backgroundClasses}`}>
              <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-gray-100">
                <Code2 className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                Code Review Overview
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <GitPullRequest className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Pull Request ID
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        #{reviewLog.pull_request_id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Review Status
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {reviewLog.status === ReviewCodeStatus.Reviewing
                          ? 'Under Review'
                          : reviewLog.status === ReviewCodeStatus.NoComment
                            ? 'No Issues Found'
                            : 'Issues Detected'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Created
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {formatReviewTime(reviewLog.created_at)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTimeStandard(reviewLog.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Commit Author
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <img
                          src={reviewLog.commit_author_avatar}
                          alt={reviewLog.commit_author_name}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {reviewLog.commit_author_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <GitCommit className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Commit Message
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {reviewLog.commit_message}
                      </p>
                      <div className="mt-1">
                        <a
                          href={reviewLog.commit_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors text-sm"
                        >
                          View Commit
                          <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <ExternalLink className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Pull Request URL
                      </span>
                      <div className="mt-1">
                        <a
                          href={reviewLog.pull_request_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                        >
                          <span className="truncate max-w-[200px] block">View on GitHub</span>
                          <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Details */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900 dark:text-gray-100">
                <MessageSquare className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                Review Information
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Pull Request Title
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{reviewLog.pull_request_title}</p>
                </div>
                {/* Review Comments */}
                {reviewLog.review_comment &&
                  parseReviewComments(reviewLog.review_comment).length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                        Review Comments ({parseReviewComments(reviewLog.review_comment).length})
                      </h4>
                      <div className="space-y-3">
                        {parseReviewComments(reviewLog.review_comment).map(
                          (comment: ReviewComment, index: number) => (
                            <div
                              key={index}
                              className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-red-200 dark:border-red-800/50 shadow-sm"
                            >
                              {/* File info header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <Code2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                  <span className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                                    {comment.path}
                                  </span>
                                </div>
                                {comment.line && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded font-medium">
                                    Line {comment.line}
                                  </span>
                                )}
                              </div>

                              {/* Comment body */}
                              <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3 border-l-4 border-red-400 dark:border-red-500">
                                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                  {comment.body}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/* Summary */}
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50">
                        <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                          ⚠️ {parseReviewComments(reviewLog.review_comment).length} issue(s) found
                          that need attention
                        </p>
                      </div>
                    </div>
                  )}

                {/* No comments case */}
                {reviewLog.status === ReviewCodeStatus.NoComment && (
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                      Code Review Results
                    </h4>
                    <div className="bg-white dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-800/30">
                      <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                        ✅ No issues found! The code looks good and follows best practices.
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviewing status */}
                {reviewLog.status === ReviewCodeStatus.Reviewing && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800/50">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 animate-pulse" />
                      Review In Progress
                    </h4>
                    <div className="bg-white dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800/30">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        🔄 This pull request is currently being reviewed by our automated code
                        review system. Please wait for the review to complete.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Review Code Item Component
const ReviewCodeItem = ({ reviewLog, renderSourceIcon }: ReviewCodeItemProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const config = getStatusConfig(reviewLog.status);

  const handleItemClick = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleViewPR = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    window.open(reviewLog.pull_request_url, '_blank');
  };

  const serviceDetailVariants = {
    initial: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 50,
    },
    behind: {
      opacity: 0.8,
      x: -32,
      y: 8,
      scale: 0.98,
      zIndex: 45,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: 45,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  return (
    <>
      <div
        className={`flex items-center justify-between rounded-lg h-full px-4 py-4 w-full select-none border ${config.backgroundClasses} cursor-pointer hover:shadow-sm transition-shadow duration-200`}
        onClick={handleItemClick}
      >
        <div className="grid grid-cols-[120px_1fr] items-center">
          <div className="mr-4">
            <Badge
              className={`px-2.5 py-1 text-xs font-medium inline-block min-w-[90px] text-center ${config.badgeClasses}`}
            >
              {config.label}
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="mr-4">{config.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {reviewLog.pull_request_title}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>PR #{reviewLog.pull_request_id}</span>
                <span>•</span>
                <span>{formatReviewTime(reviewLog.created_at)}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <img
                    src={reviewLog.commit_author_avatar}
                    alt={reviewLog.commit_author_name}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs">{reviewLog.commit_author_name}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-xs text-gray-500">Review ID: {reviewLog.id}</p>
                {reviewLog.review_comment &&
                  parseReviewComments(reviewLog.review_comment).length > 0 && (
                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                      {parseReviewComments(reviewLog.review_comment).length} issue(s)
                    </span>
                  )}
                {reviewLog.status === ReviewCodeStatus.NoComment && (
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                    No issues
                  </span>
                )}
                {reviewLog.status === ReviewCodeStatus.Reviewing && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full animate-pulse">
                    In progress
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className={`text-xs h-8 px-3 ${config.buttonClasses}`}
            onClick={handleViewPR}
          >
            View PR
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="cursor-pointer group focus:bg-blue-50 dark:focus:bg-blue-950/50 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                onClick={handleViewPR}
              >
                <ExternalLink className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  View Pull Request
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer group focus:bg-green-50 dark:focus:bg-green-950/50 hover:bg-green-50 dark:hover:bg-green-950/50 transition-colors"
                onClick={handleItemClick}
              >
                <Eye className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
                <span className="text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300">
                  View Details
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence mode="sync">
        {showDetail && (
          <>
            {/* Background overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: showDetail ? 0 : 0.1 }}
              className="fixed inset-0 z-40 bg-black/10"
              onClick={handleCloseDetail}
            />

            {/* Service Detail Clone (appearing behind) */}
            <motion.div
              key="servicedetail-clone"
              initial="initial"
              animate="behind"
              exit="exit"
              variants={serviceDetailVariants}
              className="fixed right-0 top-0 bottom-0 w-2/3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-l-lg pointer-events-none"
              style={{ marginTop: '80px' }}
            />

            {/* Review Code Detail */}
            <ReviewCodeDetail
              key="review-detail"
              reviewLog={reviewLog}
              onClose={handleCloseDetail}
              renderSourceIcon={renderSourceIcon}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Main ReviewCodeSection Component
export default function ReviewCodeSection({ serviceId }: ReviewCodeSectionProps) {
  const { data, loading, error } = useReviewLogs(serviceId);

  const renderSourceIcon = () => (
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
      <GitBranch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
  );

  // Xử lý loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Code Reviews</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track your pull request code reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Code2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Loading code reviews...
          </h3>
        </div>
      </div>
    );
  }

  // Xử lý error state
  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Code Reviews</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track your pull request code reviews
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/30">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error loading code reviews
          </h3>
          <p className="text-red-600 dark:text-red-400 text-center max-w-md">{error.message}</p>
        </div>
      </div>
    );
  }

  // Lấy data từ response
  const reviewLogs =
    data?.getReviewLogs?.__typename === 'GetReviewLogsSuccessResult'
      ? data.getReviewLogs.reviewLogs
      : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Code Reviews</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track your pull request code reviews
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {reviewLogs.length} reviews
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {reviewLogs.map((reviewLog: ReviewCodeLog) => (
          <ReviewCodeItem
            key={reviewLog.id}
            reviewLog={reviewLog}
            renderSourceIcon={renderSourceIcon}
          />
        ))}
      </div>

      {reviewLogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Code2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No code reviews yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            Code reviews will appear here when pull requests are submitted for this service.
          </p>
        </div>
      )}
    </div>
  );
}
