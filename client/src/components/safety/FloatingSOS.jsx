import React, { useEffect, useRef, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

const BUTTON_SIZE = 64;
const EDGE_MARGIN = 16;
const BOTTOM_SAFE_SPACE = 92;
const IDLE_DELAY = 5000;

export const FloatingSOS = ({ onOpenSOS }) => {
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [docked, setDocked] = useState(false);
  const dragStartRef = useRef(null);
  const movedRef = useRef(false);
  const idleTimerRef = useRef(null);
  const isLeftEdge = position.x !== null && position.x < window.innerWidth / 2;

  const clamp = (x, y) => ({
    x: Math.max(EDGE_MARGIN, Math.min(x, window.innerWidth - BUTTON_SIZE - EDGE_MARGIN)),
    y: Math.max(48, Math.min(y, window.innerHeight - BUTTON_SIZE - BOTTOM_SAFE_SPACE)),
  });

  const resetIdleTimer = () => {
    setDocked(false);
    window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => setDocked(true), IDLE_DELAY);
  };

  useEffect(() => {
    resetIdleTimer();
    return () => window.clearTimeout(idleTimerRef.current);
  }, []);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const startX = position.x ?? window.innerWidth - BUTTON_SIZE - EDGE_MARGIN;
    const startY = position.y ?? Math.round(window.innerHeight * 0.55);
    dragStartRef.current = { pointerX: event.clientX, pointerY: event.clientY, x: startX, y: startY };
    movedRef.current = false;
    setDragging(true);
    resetIdleTimer();
  };

  const handlePointerMove = (event) => {
    if (!dragStartRef.current) return;
    const deltaX = event.clientX - dragStartRef.current.pointerX;
    const deltaY = event.clientY - dragStartRef.current.pointerY;
    if (Math.hypot(deltaX, deltaY) > 8) movedRef.current = true;
    setPosition(clamp(dragStartRef.current.x + deltaX, dragStartRef.current.y + deltaY));
    resetIdleTimer();
  };

  const handlePointerUp = () => {
    if (!dragStartRef.current) return;
    if (movedRef.current) {
      const currentX = position.x ?? dragStartRef.current.x;
      const currentY = position.y ?? dragStartRef.current.y;
      const snapX = currentX + BUTTON_SIZE / 2 < window.innerWidth / 2 ? EDGE_MARGIN : window.innerWidth - BUTTON_SIZE - EDGE_MARGIN;
      setPosition(clamp(snapX, currentY));
    } else {
      onOpenSOS();
    }
    dragStartRef.current = null;
    setDragging(false);
    resetIdleTimer();
  };

  return <button type="button" aria-label="Emergency SOS" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} style={{ left: position.x === null ? 'auto' : position.x, right: position.x === null ? 'max(16px, env(safe-area-inset-right))' : 'auto', top: position.y === null ? '55vh' : position.y }} className={`floating-sos lg:hidden ${dragging ? 'is-dragging' : ''} ${docked ? 'is-docked' : ''} ${isLeftEdge ? 'is-left' : 'is-right'}`}><ShieldAlert className="h-6 w-6" /><span>SOS</span></button>;
};
