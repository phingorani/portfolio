
'use client';

import React, { useEffect, useRef } from 'react';

const HeartsEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts: Heart[] = [];

    class Heart {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.alpha = 1;
      }

      update() {
        this.y -= this.speed;
        this.alpha -= 0.01;
        if (canvas && (this.y < 0 || this.alpha <= 0)) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
          this.alpha = 1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x, this.y - this.size / 2, this.x - this.size, this.y - this.size / 2, this.x - this.size, this.y);
        ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 4, this.x, this.y + this.size, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x, this.y + this.size, this.x + this.size, this.y + this.size / 4, this.x + this.size, this.y);
        ctx.bezierCurveTo(this.x + this.size, this.y - this.size / 2, this.x, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
        ctx.closePath();
      }
    }

    for (let i = 0; i < 50; i++) {
      hearts.push(new Heart());
    }

    const animate = () => {
      requestAnimationFrame(animate);
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach(heart => {
        heart.update();
        heart.draw();
      });
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }} />;
};

export default HeartsEffect;
