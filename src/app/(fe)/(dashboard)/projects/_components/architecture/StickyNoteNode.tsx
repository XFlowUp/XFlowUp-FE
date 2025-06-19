'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/filebase';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Palette, Trash2 } from 'lucide-react';

export interface StickyNoteData {
  text?: string;
  color?: string;
}

export default function StickyNoteNode({ data, selected, id }: NodeProps) {
  const params = useParams();
  const projectSlug = typeof params.slug === 'string' ? params.slug : '';
  const nodeData = data as unknown as StickyNoteData;
  const [text, setText] = useState(nodeData?.text || '');
  const [color, setColor] = useState(nodeData?.color || 'yellow');
  const [isEditing, setIsEditing] = useState(!nodeData?.text);
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const deleteConfirmRef = useRef<HTMLDivElement>(null);

  // Load sticky note data from Firebase on mount
  useEffect(() => {
    const loadStickyNoteData = async () => {
      if (!projectSlug || !id) return;

      try {
        const stickyNoteRef = doc(db, 'sticky-notes', `${projectSlug}-${id}`);
        const docSnap = await getDoc(stickyNoteRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setText(data.text || '');
          setColor(data.color || 'yellow');
        }
      } catch (error) {
        console.error('Error loading sticky note:', error);
      }
    };

    loadStickyNoteData();
  }, [projectSlug, id]);

  useEffect(() => {
    setText(nodeData?.text || '');
    setColor(nodeData?.color || 'yellow');
  }, [nodeData?.text, nodeData?.color]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(event.target as Node)) {
        setShowDeleteConfirm(false);
      }
    };

    if (showColorPicker || showDeleteConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker, showDeleteConfirm]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Delete key to delete sticky note when selected
      if (selected && event.key === 'Delete' && !isEditing) {
        event.preventDefault();
        handleDeleteClick();
      }
    };

    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected, isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    await saveStickyNote();
  };

  const handleColorChange = async (newColor: string) => {
    setColor(newColor);
    setShowColorPicker(false);
    await saveStickyNote(newColor);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setShowColorPicker(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectSlug || !id || isDeleting) return;

    setIsDeleting(true);
    try {
      // Delete from Firebase
      const stickyNoteRef = doc(db, 'sticky-notes', `${projectSlug}-${id}`);
      await deleteDoc(stickyNoteRef);

      // Dispatch custom event to notify parent about the deletion
      window.dispatchEvent(
        new CustomEvent('stickyNoteDeleted', {
          detail: { projectSlug, nodeId: id },
        })
      );
    } catch (error) {
      console.error('Error deleting sticky note:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const saveStickyNote = async (newColor?: string) => {
    if (!projectSlug || !id || isSaving) return;

    setIsSaving(true);
    try {
      const stickyNoteRef = doc(db, 'sticky-notes', `${projectSlug}-${id}`);
      const stickyNoteData = {
        text,
        color: newColor || color,
        updatedAt: new Date().toISOString(),
        projectSlug,
        nodeId: id,
      };

      await setDoc(stickyNoteRef, stickyNoteData, { merge: true });

      // Dispatch custom event to notify parent about the update
      if (newColor) {
        window.dispatchEvent(
          new CustomEvent('stickyNoteUpdated', {
            detail: { projectSlug, nodeId: id, color: newColor },
          })
        );
      }
    } catch (error) {
      console.error('Error saving sticky note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const colors = {
    yellow: { bg: 'bg-yellow-200 dark:bg-yellow-300', name: 'Yellow' },
    pink: { bg: 'bg-pink-200 dark:bg-pink-300', name: 'Pink' },
    blue: { bg: 'bg-blue-200 dark:bg-blue-300', name: 'Blue' },
    green: { bg: 'bg-green-200 dark:bg-green-300', name: 'Green' },
    purple: { bg: 'bg-purple-200 dark:bg-purple-300', name: 'Purple' },
    orange: { bg: 'bg-orange-200 dark:bg-orange-300', name: 'Orange' },
    red: { bg: 'bg-red-200 dark:bg-red-300', name: 'Red' },
    gray: { bg: 'bg-gray-200 dark:bg-gray-300', name: 'Gray' },
  };

  const backgroundColor = colors[color as keyof typeof colors]?.bg || colors.yellow.bg;

  return (
    <div
      className={`relative w-64 h-64 ${backgroundColor} rounded-lg shadow-lg p-4 cursor-move ${
        selected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        transform: 'rotate(-1deg)',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

      {/* Control buttons */}
      <div
        className="absolute top-2 right-2 z-10 nodrag flex gap-1"
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Delete button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/50"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            handleDeleteClick();
          }}
          onMouseDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onPointerDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          title="Delete sticky note"
        >
          <Trash2 className="h-3 w-3 text-red-600 dark:text-red-400" />
        </Button>

        {/* Color picker button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-white/50 dark:hover:bg-gray-900/50"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setShowColorPicker(!showColorPicker);
          }}
          onMouseDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onPointerDown={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
          title="Change color"
        >
          <Palette className="h-3 w-3 text-gray-600 dark:text-gray-700" />
        </Button>

        {/* Color picker dropdown */}
        {showColorPicker && (
          <div
            ref={colorPickerRef}
            className="absolute top-8 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50 nodrag"
            style={{ minWidth: '120px', pointerEvents: 'auto' }}
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onPointerUp={e => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-1">
              {Object.entries(colors).map(([colorKey, colorInfo]) => (
                <button
                  key={colorKey}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleColorChange(colorKey);
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onPointerDown={e => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
                    colorKey === color
                      ? 'border-gray-800 dark:border-gray-200'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{
                    backgroundColor:
                      colorKey === 'yellow'
                        ? '#fde047'
                        : colorKey === 'pink'
                          ? '#fbb6ce'
                          : colorKey === 'blue'
                            ? '#93c5fd'
                            : colorKey === 'green'
                              ? '#86efac'
                              : colorKey === 'purple'
                                ? '#c4b5fd'
                                : colorKey === 'orange'
                                  ? '#fed7aa'
                                  : colorKey === 'red'
                                    ? '#fca5a5'
                                    : '#d1d5db',
                  }}
                  title={colorInfo.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Delete confirmation dialog */}
        {showDeleteConfirm && (
          <div
            ref={deleteConfirmRef}
            className="absolute top-8 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-50 nodrag"
            style={{ minWidth: '180px', pointerEvents: 'auto' }}
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onPointerUp={e => e.stopPropagation()}
          >
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Delete this sticky note?
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDeleteCancel();
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDeleteConfirm();
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="absolute inset-0 p-4 pt-8">
        {isEditing ? (
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={handleBlur}
            className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-gray-800 dark:text-gray-900 text-sm font-medium nodrag"
            placeholder="Enter your note..."
            autoFocus
          />
        ) : (
          <div className="w-full h-full overflow-hidden text-gray-800 dark:text-gray-900 text-sm font-medium whitespace-pre-wrap">
            {text || 'Double click to edit...'}
          </div>
        )}
      </div>

      {/* Tape effect */}
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gray-100/50 dark:bg-gray-200/50"
        style={{
          transform: 'translateX(-50%) rotate(3deg)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Loading indicator */}
      {isSaving && (
        <div className="absolute bottom-2 right-2">
          <div className="w-3 h-3 border border-gray-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
