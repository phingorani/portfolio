
'use client';

import React, { useEffect, useRef } from 'react';

const FireworksEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: Firework[] = [];
    const particles: Particle[] = [];

    class Firework {
      x: number;
      y: number;
      sx: number;
      sy: number;
      tx: number;
      ty: number;
      distanceToTarget: number;
      distanceTraveled: number;
      sparks: Spark[];

      constructor(sx: number, sy: number, tx: number, ty: number) {
        this.x = sx;
        this.y = sy;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
        this.distanceTraveled = 0;
        this.sparks = [];
      }

      update(index: number) {
        this.x += (this.tx - this.sx) / this.distanceToTarget * 5;
        this.y += (this.ty - this.sy) / this.distanceToTarget * 5;
        this.distanceTraveled = Math.sqrt(Math.pow(this.x - this.sx, 2) + Math.pow(this.y - this.sy, 2));

        if (this.distanceTraveled >= this.distanceToTarget) {
          fireworks.splice(index, 1);
          for (let i = 0; i < 30; i++) {
            particles.push(new Particle(this.tx, this.ty));
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 4);
        ctx.strokeStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        ctx.stroke();
      }
    }

    class Spark {
        //This can be used to create sparks for the fireworks
        //For now this is empty
    }

    class Particle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      friction: number;
      gravity: number;
      alpha: number;
      decay: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 10;
        this.friction = 0.95;
        this.gravity = 1;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
      }

      update(index: number) {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          particles.splice(index, 1);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const createFirework = () => {
        const sx = Math.random() * canvas.width;
        const sy = canvas.height;
        const tx = Math.random() * canvas.width;
        const ty = Math.random() * canvas.height / 2;
        fireworks.push(new Firework(sx, sy, tx, ty));
        }

    const animate = () => {
        requestAnimationFrame(animate);
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, i) => {
            firework.update(i);
            firework.draw();
        });

        particles.forEach((particle, i) => {
            particle.update(i);
            particle.draw();
        });
    }

    const interval = setInterval(createFirework, 2000);
    animate();

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }} />;
};

export default FireworksEffect;
