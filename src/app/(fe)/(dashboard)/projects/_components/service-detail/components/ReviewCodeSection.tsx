import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  MoreVertical,
  RefreshCw,
  ExternalLink,
  Calendar,
  GitBranch,
  User,
  Clock,
  AlertTriangle,
  Code2,
  FileText,
  MessageSquare,
  GitPullRequest,
  Eye,
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

// Enums và types
export enum REVIEW_CODE_STATUS {
  REVIEWING = 'REVIEWING',
  NO_COMMENT = 'NO_COMMENT',
  HAS_ISSUES = 'HAS_ISSUES',
}

export interface ReviewCodeLog {
  id: string;
  serviceId: number;
  pull_request_id: string;
  pull_request_url: string;
  pull_request_title: string;
  status: REVIEW_CODE_STATUS;
  created_at: string | Date;
  updated_at: string | Date;
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

// Helper functions
const formatReviewTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

const formatDateTimeStandard = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

// Status configurations
const getStatusConfig = (status: REVIEW_CODE_STATUS) => {
  switch (status) {
    case REVIEW_CODE_STATUS.REVIEWING:
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
    case REVIEW_CODE_STATUS.NO_COMMENT:
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />,
        label: 'NO ISSUES',
        badgeClasses: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        backgroundClasses:
          'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800/30',
        buttonClasses:
          'border-green-200 text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-800 dark:border-green-800/50 dark:text-green-400 dark:bg-green-950/50 dark:hover:bg-green-900/50 dark:hover:text-green-300',
      };
    case REVIEW_CODE_STATUS.HAS_ISSUES:
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

// Review Code Detail Component
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
        className="absolute w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-l-lg"
        style={{ zIndex: 60 }}
      >
        {/* Header */}
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
                  reviewLog.status === REVIEW_CODE_STATUS.REVIEWING
                    ? 'bg-blue-500 animate-pulse'
                    : reviewLog.status === REVIEW_CODE_STATUS.NO_COMMENT
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

        {/* Content */}
        <div className="px-6 md:px-12 py-6 flex-grow overflow-auto">
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
                        {reviewLog.status === REVIEW_CODE_STATUS.REVIEWING
                          ? 'Under Review'
                          : reviewLog.status === REVIEW_CODE_STATUS.NO_COMMENT
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
                      <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Review ID
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {reviewLog.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Last Updated
                      </span>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {formatReviewTime(reviewLog.updated_at)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDateTimeStandard(reviewLog.updated_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
                      <ExternalLink className="h-6 w-6 text-green-600 dark:text-green-400" />
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

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Review Status Details
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {reviewLog.status === REVIEW_CODE_STATUS.REVIEWING &&
                      'This pull request is currently being reviewed by our automated code review system.'}
                    {reviewLog.status === REVIEW_CODE_STATUS.NO_COMMENT &&
                      'The code review has been completed successfully with no issues found.'}
                    {reviewLog.status === REVIEW_CODE_STATUS.HAS_ISSUES &&
                      'The code review has detected potential issues that require attention.'}
                  </p>
                </div>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PR #{reviewLog.pull_request_id} • {formatReviewTime(reviewLog.created_at)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Review ID: {reviewLog.id}</p>
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

// Sample data
const sampleReviewLogs: ReviewCodeLog[] = [
  {
    id: 'rc_001',
    serviceId: 1,
    pull_request_id: '123',
    pull_request_url: 'https://github.com/example/repo/pull/123',
    pull_request_title: 'Fix authentication bug in user login flow',
    status: REVIEW_CODE_STATUS.HAS_ISSUES,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 'rc_002',
    serviceId: 1,
    pull_request_id: '124',
    pull_request_url: 'https://github.com/example/repo/pull/124',
    pull_request_title: 'Add new feature for user profile management',
    status: REVIEW_CODE_STATUS.REVIEWING,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: 'rc_003',
    serviceId: 1,
    pull_request_id: '125',
    pull_request_url: 'https://github.com/example/repo/pull/125',
    pull_request_title: 'Update dependencies and fix security vulnerabilities',
    status: REVIEW_CODE_STATUS.NO_COMMENT,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 'rc_004',
    serviceId: 1,
    pull_request_id: '126',
    pull_request_url: 'https://github.com/example/repo/pull/126',
    pull_request_title: 'Implement caching mechanism for API responses',
    status: REVIEW_CODE_STATUS.REVIEWING,
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: 'rc_005',
    serviceId: 1,
    pull_request_id: '127',
    pull_request_url: 'https://github.com/example/repo/pull/127',
    pull_request_title: 'Refactor database connection pooling',
    status: REVIEW_CODE_STATUS.HAS_ISSUES,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
];

// Main ReviewCodeSection Component
export default function ReviewCodeSection() {
  const renderSourceIcon = () => (
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
      <GitBranch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
  );

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
            {sampleReviewLogs.length} reviews
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {sampleReviewLogs.map(reviewLog => (
          <ReviewCodeItem
            key={reviewLog.id}
            reviewLog={reviewLog}
            renderSourceIcon={renderSourceIcon}
          />
        ))}
      </div>

      {sampleReviewLogs.length === 0 && (
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
